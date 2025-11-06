import { useState, useEffect, useRef } from "react";
import axios from "axios";

interface AppliedEffect {
  effectType: string;
  totalValue: number;
}

interface Mission {
  name: string;
  objective: string;
  parameters: string;
  difficulty: number;
  remainingAttempts: string;
  solved: boolean;
  effect: string;
}

interface Problem {
  name: string;
  description: string;
  solved: boolean;
  score: number;
  badgeUrl: string;
  isClosed: boolean;
  mission: Mission[];
}

interface ApiTeam {
  teamId?: string;
  name: string;
  score: number;
  appliedEffects: AppliedEffect[];
  problems: Problem[];
}

export interface Team {
  id: number;
  name: string;
  score: number;
  members: number;
  problems: Problem[];
  activeMission: {
    name: string;
    difficulty: number;
    remainingAttempts: string;
  } | null;
  appliedEffects: AppliedEffect[];
}

interface Aggregate {
  totalTeams: number;
  activeQuests: number;
  globalEffects: AppliedEffect[];
}

interface ScoreboardUpdateMessage {
  type: "SCOREBOARD_UPDATE";
  teams: ApiTeam[];
  aggregate?: Aggregate;
  timestamp: string;
}

export interface UseTeamsReturn {
  teams: Team[];
  aggregate: Aggregate | null;
  apiError: string | null;
  isLoading: boolean;
}

const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [aggregate, setAggregate] = useState<Aggregate | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const ws = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);

  // --- Helper: Transform API data into Team[] ---
  const transformTeams = (data: ApiTeam[]): Team[] =>
    data
      .map((team, index) => {
        // Filter out problems that are both unsolved and closed
        const openProblems = team.problems.filter(
          (p) => !(p.solved === false && p.isClosed === true)
        );

        const activeMission = openProblems
          ?.flatMap((p) => p.mission)
          .find((m) => m.solved === false);

        return {
          id: index + 1,
          name: team.name,
          score: team.score,
          members: 2 + Math.floor(Math.random() * 3),
          problems: openProblems,
          activeMission: activeMission
            ? {
                name: activeMission.name,
                difficulty: activeMission.difficulty,
                remainingAttempts: activeMission.remainingAttempts,
              }
            : null,
          appliedEffects: team.appliedEffects,
        };
      })
      .filter((team) => team.problems.length > 0);

  // --- Helper: Fetch teams from REST API ---
  const fetchTeams = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL!}/dashboard`
      );
      const data: ApiTeam[] = response.data.teams;
      const aggregateData: Aggregate = response.data.aggregate;
      setTeams(transformTeams(data));
      setAggregate(aggregateData);
      setApiError(null);
    } catch (error) {
      console.error("Error fetching teams:", error);
      setApiError(
        "CRITICAL ERROR: Submarine OS connection to surface command lost. Retrying..."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // --- WebSocket Connection ---
  const connectWebSocket = () => {
    const endpoint = process.env.REACT_APP_WEBSOCKET_URL!;
    const socket = new WebSocket(endpoint);
    ws.current = socket;

    socket.onopen = () => {
      console.log("[WS] Connected to scoreboard");
      setApiError(null);
      reconnectAttempts.current = 0; // Reset reconnection attempts
    };

    socket.onmessage = (event) => {
      try {
        const message: ScoreboardUpdateMessage = JSON.parse(event.data);

        if (
          message.type === "SCOREBOARD_UPDATE" &&
          Array.isArray(message.teams)
        ) {
          console.log("[WS] Received SCOREBOARD_UPDATE");
          console.log("[WS] Teams count:", message.teams.length);
          console.log("[WS] Aggregate data:", message.aggregate);
          
          setTeams(transformTeams(message.teams));
          
          if (message.aggregate) {
            console.log("[WS] Setting aggregate:", message.aggregate);
            setAggregate(message.aggregate);
          }
        } else {
          console.warn("[WS] Unknown message type:", message);
        }
      } catch (err) {
        console.warn("[WS] Non-JSON message ignored:", event.data);
      }
    };

    socket.onerror = (error) => {
      console.error("[WS] Error:", error);
      setApiError("WebSocket connection error. Attempting to reconnect...");
    };

    socket.onclose = (event) => {
      console.warn(
        `[WS] Closed (code: ${event.code}, reason: ${event.reason || "none"})`
      );
      ws.current = null;

      // Exponential backoff reconnection
      const attempt = reconnectAttempts.current++;
      const delay = Math.min(1000 * Math.pow(2, attempt), 30000); // up to 30s

      console.log(`[WS] Reconnecting in ${delay}ms (attempt ${attempt + 1})`);
      setTimeout(connectWebSocket, delay);
    };
  };

  useEffect(() => {
    fetchTeams(); // Initial REST load
    connectWebSocket(); // Live updates

    return () => {
      if (ws.current) {
        console.log("[WS] Cleaning up connection...");
        ws.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { teams, aggregate, apiError, isLoading };
};

export default useTeams;
