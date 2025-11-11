import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { AlertTriangle, Download, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Team {
  id: string;
  name: string;
  score: number;
  users?: { id: string }[];
  isTest?: boolean;
}

// Message formats from the WebSocket API
interface TeamScore {
  teamId: string;
  teamName: string;
  score: number;
  questsCompleted?: number;
  rank?: number;
  lastUpdated?: string;
}

interface ScoreboardUpdateMessage {
  type: 'SCOREBOARD_UPDATE';
  data: TeamScore[];
  timestamp: string; // ISO 8601
}

const Backoffice: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [wsConnected, setWsConnected] = useState(false);
  const [showTestTeams, setShowTestTeams] = useState(false);
  const { token } = useAuth();
  const ws = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const reconnectTimerId = useRef<number | null>(null);

  // --- Helper: Fetch teams from REST API ---
  const fetchTeams = useCallback(async () => {
    try {
      if (!token) {
        setError('Not authenticated. Please provide an access token.');
        setLoading(false);
        return;
      }

      const response = await axios.get(`${process.env.REACT_APP_API_URL!}/teams`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setTeams(response.data);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError('Authentication failed when fetching teams');
        } else {
          setError(err.message);
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  // --- WebSocket Connection ---
  const connectWebSocket = useCallback(() => {
    const wsUrl = process.env.REACT_APP_WEBSOCKET_URL;

    if (!wsUrl) {
      console.error('[WS] Missing REACT_APP_WEBSOCKET_URL environment variable.');
      setError('WebSocket URL not configured. Set REACT_APP_WEBSOCKET_URL in your .env file.');
      setWsConnected(false);
      return;
    }

    try {
      const socket = new WebSocket(wsUrl);
      ws.current = socket;

      socket.onopen = () => {
        console.log('[WS] Connected to scoreboard endpoint');
        setWsConnected(true);
        setError(null);
        // Reset exponential backoff on successful connection
        reconnectAttempts.current = 0;
      };

      socket.onmessage = (event) => {
        const raw = event.data;

        // Backwards-compat: if backend ever sends a simple signal
        if (raw === 'update-dashboard') {
          console.log('[WS] Update signal received — refetching teams via REST...');
          fetchTeams();
          return;
        }

        try {
          const msg: unknown = JSON.parse(raw);

          // Handle documented message format
          const maybeScoreboard = msg as Partial<ScoreboardUpdateMessage>;
          if (maybeScoreboard && maybeScoreboard.type === 'SCOREBOARD_UPDATE' && Array.isArray(maybeScoreboard.data)) {
            const mapped: Team[] = maybeScoreboard.data.map((t) => ({
              id: t.teamId,
              name: t.teamName,
              score: t.score,
            }));
            setTeams(mapped);
            return;
          }

          // Legacy fallback: if server ever sends plain array of teams
          if (Array.isArray(msg)) {
            setTeams(msg as Team[]);
            return;
          }

          console.warn('[WS] Unrecognized message format:', msg);
        } catch (err) {
          console.error('[WS] Failed to parse message:', err);
        }
      };

      socket.onerror = (event) => {
        console.error('[WS] Error event:', event);
        setWsConnected(false);
        setError('WebSocket connection error. Retrying...');
      };

      socket.onclose = (e) => {
        setWsConnected(false);
        const code = e.code;
        const reason = e.reason || 'No reason provided';
        console.warn(`[WS] Closed: code=${code}, reason=${reason}`);

        // Clear any pending reconnect timer to avoid duplicates
        if (reconnectTimerId.current) {
          window.clearTimeout(reconnectTimerId.current);
          reconnectTimerId.current = null;
        }

        // Exponential backoff with cap 30s
        const baseDelay = 1000; // 1s
        const attempt = reconnectAttempts.current;
        const delay = Math.min(baseDelay * Math.pow(2, attempt), 30000);
        console.log(`[WS] Reconnecting in ${delay}ms (attempt ${attempt + 1})...`);

        reconnectTimerId.current = window.setTimeout(() => {
          reconnectAttempts.current = attempt + 1;
          connectWebSocket();
        }, delay);
      };
    } catch (err) {
      console.error('[WS] Connection setup error:', err);
      setWsConnected(false);
      setError('WebSocket initialization failed. Check the endpoint URL.');
    }
  }, [fetchTeams]);

  useEffect(() => {
    fetchTeams(); // Initial REST load
    connectWebSocket(); // Live updates

    return () => {
      if (ws.current) {
        ws.current.close();
      }
      if (reconnectTimerId.current) {
        window.clearTimeout(reconnectTimerId.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const downloadQRCode = () => {
    if (!selectedTeam) return;
    const qrElement = document.getElementById('qr-code');
    const canvas = qrElement?.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${selectedTeam.name}-qr.png`;
      link.click();
    }
  };

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTestFilter = showTestTeams || !team.isTest;
    return matchesSearch && matchesTestFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white flex items-center justify-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
        <div className="relative z-10 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-lg font-mono text-cyan-400 animate-pulse">Establishing uplink to command server...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white flex items-center justify-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
        <div className="relative z-10 bg-black/80 backdrop-blur-md border border-red-500/50 rounded-lg p-6 max-w-md">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h2 className="text-xl font-mono font-bold text-red-400">SYSTEM ERROR</h2>
          </div>
          <p className="text-red-300 font-mono text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white p-8">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 bg-black/60 backdrop-blur-md rounded-lg border border-cyan-500/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-mono font-bold text-cyan-400 mb-1">
                TEAM RECONNAISSANCE
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${wsConnected ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className="text-cyan-300 font-mono text-sm">
                    {wsConnected ? 'LIVE TRACKING' : 'POLLING MODE'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md mb-4">
            <input
              type="text"
              placeholder="SEARCH BY TEAM NAME OR ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-cyan-300 placeholder-cyan-600 font-mono text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          {/* Test Teams Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTestTeams(!showTestTeams)}
              className={`px-3 py-1 rounded-lg font-mono text-xs transition-all duration-200 border ${
                showTestTeams
                  ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300'
                  : 'bg-black/50 border-yellow-500/30 text-yellow-400 opacity-60'
              }`}
            >
              {showTestTeams ? '✓' : '○'} SHOW TEST TEAMS
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-black/70 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4">
            <p className="text-cyan-400 text-xs font-mono opacity-70 mb-1">TEAMS ACTIVE</p>
            <p className="text-3xl font-mono text-white font-bold">{teams.length}</p>
            <div className="mt-2 h-1 bg-gray-800 rounded">
              <div
                className="h-full bg-cyan-400 rounded animate-pulse"
                style={{ width: `${Math.min((teams.length / 25) * 100, 100)}%` }}
              />
            </div>
          </div>
          <div className="bg-black/70 backdrop-blur-md border border-green-500/30 rounded-lg p-4">
            <p className="text-green-400 text-xs font-mono opacity-70 mb-1">AVG SCORE</p>
            <p className="text-3xl font-mono text-white font-bold">
              {teams.length > 0 ? (teams.reduce((acc, t) => acc + t.score, 0) / teams.length).toFixed(0) : 0}
            </p>
            <div className="mt-2 h-1 bg-gray-800 rounded">
              <div className="h-full bg-green-400 rounded animate-pulse" style={{ width: "65%" }} />
            </div>
          </div>
          <div className="bg-black/70 backdrop-blur-md border border-orange-500/30 rounded-lg p-4">
            <p className="text-orange-400 text-xs font-mono opacity-70 mb-1">TOP SCORE</p>
            <p className="text-3xl font-mono text-white font-bold">
              {teams.length > 0 ? Math.max(...teams.map(t => t.score)) : 0}
            </p>
            <div className="mt-2 h-1 bg-gray-800 rounded">
              <div className="h-full bg-orange-400 rounded animate-pulse" style={{ width: "92%" }} />
            </div>
          </div>
        </div>

        {/* Results Counter */}
        {searchQuery && (
          <p className="text-cyan-400 text-xs font-mono mb-4 opacity-70">
            {filteredTeams.length} OF {teams.length} TEAMS MATCHED
          </p>
        )}

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team, index) => (
              <div
                key={team.id}
                className={`bg-black/70 backdrop-blur-md rounded-lg p-4 transition-all duration-300 group ${
                  team.isTest
                    ? 'border border-yellow-500/50 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-500/10'
                    : 'border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10'
                }`}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded border flex items-center justify-center font-mono text-sm font-bold ${
                      team.isTest
                        ? 'border-yellow-500/50 text-yellow-400'
                        : 'border-cyan-500/50 text-cyan-400'
                    }`}>
                      {index + 1}
                    </div>
                    <h3 className={`text-sm font-mono font-bold transition-colors ${
                      team.isTest
                        ? 'text-white group-hover:text-yellow-400'
                        : 'text-white group-hover:text-cyan-400'
                    }`}>
                      {team.name}
                    </h3>
                  </div>
                </div>

                {/* Score Section */}
                <div className="mb-4">
                  <p className="text-cyan-400 text-xs font-mono opacity-70 mb-1">SCORE</p>
                  <div className="bg-black/50 border border-green-500/30 rounded-lg p-3">
                    <p className="text-2xl font-mono text-green-400 font-bold">{team.score !== undefined ? team.score.toLocaleString() : '0'}</p>
                  </div>
                </div>

                {/* Team ID Section */}
                <div className="mb-4">
                  <p className="text-cyan-400 text-xs font-mono opacity-70 mb-1">TEAM ID</p>
                  <code className="text-xs bg-black/50 border border-cyan-500/30 rounded px-2 py-1 text-cyan-300 font-mono block overflow-hidden text-ellipsis whitespace-nowrap">
                    {team.id}
                  </code>
                </div>

                {/* View QR Button */}
                <button
                  onClick={() => setSelectedTeam(team)}
                  className="w-full bg-black/50 border border-cyan-500/50 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 font-mono text-sm py-2 px-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  VIEW QR CODE
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-cyan-400 font-mono text-sm opacity-70">NO TEAMS FOUND MATCHING "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>

      {/* QR Code Modal */}
      {selectedTeam && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTeam(null)}
        >
          <div
            className="bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-lg p-8 max-w-md w-full shadow-2xl shadow-cyan-500/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-mono font-bold text-cyan-400">{selectedTeam.name}</h2>
                <p className="text-cyan-300 font-mono text-xs opacity-70 mt-1">QR CODE PROTOCOL</p>
              </div>
              <button
                onClick={() => setSelectedTeam(null)}
                className="text-cyan-400 hover:text-cyan-300 transition-colors text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* QR Code */}
            <div className="bg-white rounded-lg p-4 flex justify-center mb-6">
              <div id="qr-code">
                <QRCodeCanvas value={selectedTeam.id} size={256} level="H" includeMargin={true} />
              </div>
            </div>

            {/* Team Info */}
            <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-4 mb-6">
              <p className="text-cyan-400 text-xs font-mono opacity-70 mb-2">TEAM IDENTIFIER</p>
              <p className="text-cyan-300 font-mono text-xs break-all">{selectedTeam.id}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={downloadQRCode}
                className="flex-1 bg-black/50 border border-green-500/50 hover:border-green-400 text-green-400 hover:text-green-300 font-mono text-sm py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                DOWNLOAD
              </button>
              <button
                onClick={() => setSelectedTeam(null)}
                className="flex-1 bg-black/50 border border-red-500/50 hover:border-red-400 text-red-400 hover:text-red-300 font-mono text-sm py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Backoffice;
