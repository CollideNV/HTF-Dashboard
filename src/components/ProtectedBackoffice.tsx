import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Backoffice from './Backoffice';

const TokenGate: React.FC = () => {
  const { isAuthenticated, isLoading, setManualAuth, clearAuth, token, claims, expiresAt, error, refreshIfPossible } = useAuth() as any;
  const [accessTokenInput, setAccessTokenInput] = useState('');
  const [refreshTokenInput, setRefreshTokenInput] = useState('');
  const [issuerInput, setIssuerInput] = useState('');
  const [clientIdInput, setClientIdInput] = useState('');
  const [clientSecretInput, setClientSecretInput] = useState('');
  const [endpointOverride, setEndpointOverride] = useState('');
  const [status, setStatus] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessTokenInput.trim()) {
      setStatus('Access token required');
      return;
    }
    setManualAuth({
      accessToken: accessTokenInput.trim(),
      refreshToken: refreshTokenInput.trim() || undefined,
      issuer: issuerInput.trim() || undefined,
      clientId: clientIdInput.trim() || undefined,
      clientSecret: clientSecretInput.trim() || undefined,
      tokenEndpointOverride: endpointOverride.trim() || undefined,
    });
    setStatus('Token applied');
  };

  const expRemaining = expiresAt ? expiresAt - Math.floor(Date.now() / 1000) : null;
  const expMinutes = expRemaining !== null ? Math.max(0, Math.floor(expRemaining / 60)) : null;

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-cyan-400 font-mono">Initializing...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-cyan-400 font-mono flex items-center justify-center p-6">
        <form onSubmit={onSubmit} className="w-full max-w-xl space-y-4 bg-black/70 border border-cyan-500/30 rounded-lg p-6">
          <h1 className="text-xl font-bold">Manual Token Entry</h1>
          <p className="text-xs text-cyan-300">Paste your access token (JWT) and optionally a refresh token plus config for automatic refresh.</p>
          <div>
            <label className="block text-xs mb-1">Access Token (JWT)</label>
            <textarea value={accessTokenInput} onChange={e => setAccessTokenInput(e.target.value)} className="w-full bg-black/50 border border-cyan-500/30 rounded p-2 text-xs h-32" placeholder="eyJhbGciOi..." />
          </div>
          <div>
            <label className="block text-xs mb-1">Refresh Token (optional)</label>
            <textarea value={refreshTokenInput} onChange={e => setRefreshTokenInput(e.target.value)} className="w-full bg-black/50 border border-cyan-500/30 rounded p-2 text-xs h-24" placeholder="eyJhbGciOi..." />
          </div>
          <details className="text-xs">
            <summary className="cursor-pointer mb-2">Advanced (issuer / client / endpoint)</summary>
            <div className="space-y-2 mt-2">
              <input value={issuerInput} onChange={e => setIssuerInput(e.target.value)} placeholder="Issuer (https://host/realms/realm)" className="w-full bg-black/50 border border-cyan-500/30 rounded p-2 text-xs" />
              <input value={clientIdInput} onChange={e => setClientIdInput(e.target.value)} placeholder="Client ID" className="w-full bg-black/50 border border-cyan-500/30 rounded p-2 text-xs" />
              <input value={clientSecretInput} onChange={e => setClientSecretInput(e.target.value)} placeholder="Client Secret (optional)" className="w-full bg-black/50 border border-cyan-500/30 rounded p-2 text-xs" />
              <input value={endpointOverride} onChange={e => setEndpointOverride(e.target.value)} placeholder="Token Endpoint Override" className="w-full bg-black/50 border border-cyan-500/30 rounded p-2 text-xs" />
            </div>
          </details>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          {status && <p className="text-green-400 text-xs">{status}</p>}
          <button type="submit" className="w-full bg-cyan-500 text-black font-bold py-2 rounded hover:bg-cyan-400 transition-colors">Apply Token</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono">
      <div className="p-4 flex flex-wrap gap-4 items-start">
        <div className="bg-black/70 border border-cyan-500/30 rounded p-4 text-xs space-y-2 max-w-xl">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Session Info</h2>
            <button onClick={clearAuth} className="text-red-400 hover:text-red-300">Clear</button>
          </div>
          <div>
            <span className="text-cyan-300">Expires At:</span>{' '}
            {expiresAt ? new Date(expiresAt * 1000).toLocaleString() : 'Unknown'}
            {expMinutes !== null && <span className="ml-2 text-cyan-500">(~{expMinutes}m)</span>}
          </div>
          {claims && (
            <div>
              <span className="text-cyan-300">Subject:</span> {claims.sub || 'n/a'}
            </div>
          )}
          <div className="flex gap-2">
            <button onClick={() => refreshIfPossible().then((ok: boolean) => setStatus(ok ? 'Refreshed' : 'Refresh failed'))} className="px-3 py-1 bg-cyan-600 rounded hover:bg-cyan-500">Refresh</button>
            <button onClick={() => navigator.clipboard.writeText(token || '')} className="px-3 py-1 bg-cyan-600 rounded hover:bg-cyan-500">Copy Token</button>
          </div>
          {error && <p className="text-red-400">{error}</p>}
        </div>
      </div>
      <Backoffice />
    </div>
  );
};

const ProtectedBackoffice: React.FC = () => (
  <AuthProvider>
    <TokenGate />
  </AuthProvider>
);

export default ProtectedBackoffice;
