import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";

type ManualAuthInput = {
  accessToken: string;
  refreshToken?: string;
  issuer?: string; // e.g. https://host/realms/<realm>
  clientId?: string; // needed for refresh on some IdPs
  clientSecret?: string; // optional
  tokenEndpointOverride?: string; // if not provided, we try `${issuer}/protocol/openid-connect/token`
};

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  error: string | null;
  claims: Record<string, any> | null;
  expiresAt: number | null; // epoch seconds
  setManualAuth: (input: ManualAuthInput) => void;
  clearAuth: () => void;
  refreshIfPossible: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

function decodeJwt(token: string): Record<string, any> | null {
  try {
    const [, payload] = token.split(".");
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch {
    return null;
  }
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [claims, setClaims] = useState<Record<string, any> | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const refreshTimerRef = useRef<number | null>(null);
  const refreshConfigRef = useRef<Omit<ManualAuthInput, "accessToken"> | null>(null);

  useEffect(() => {
    // Bootstrap from localStorage if present
    const stored = localStorage.getItem("htf_manual_auth");
    if (stored) {
      try {
        const parsed: { token: string; refreshToken?: string; config?: Omit<ManualAuthInput, "accessToken"> } = JSON.parse(stored);
        if (parsed.token) {
          applyToken(parsed.token);
          refreshConfigRef.current = parsed.config ?? null;
          setIsAuthenticated(true);
          setError(null);
        }
      } catch {
        // ignore
      }
    }
    setIsLoading(false);

    return () => {
      if (refreshTimerRef.current) {
        window.clearInterval(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
    };
  }, []);

  const scheduleRefresh = () => {
    if (refreshTimerRef.current) {
      window.clearInterval(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
    refreshTimerRef.current = window.setInterval(() => {
      // Attempt refresh if expiry within 60s
      if (expiresAt && expiresAt - Math.floor(Date.now() / 1000) < 60) {
        refreshIfPossible();
      }
    }, 30_000);
  };

  function applyToken(access: string) {
    setToken(access);
    const c = decodeJwt(access);
    setClaims(c);
    const exp = c?.exp ?? null;
    setExpiresAt(typeof exp === 'number' ? exp : null);
  }

  const setManualAuth = (input: ManualAuthInput) => {
    setError(null);
    applyToken(input.accessToken);
    setIsAuthenticated(true);
    // store minimal config for refresh
    const cfg: Omit<ManualAuthInput, "accessToken"> = {
      refreshToken: input.refreshToken,
      issuer: input.issuer,
      clientId: input.clientId,
      clientSecret: input.clientSecret,
      tokenEndpointOverride: input.tokenEndpointOverride,
    };
    refreshConfigRef.current = cfg;
    localStorage.setItem("htf_manual_auth", JSON.stringify({ token: input.accessToken, config: cfg }));
    scheduleRefresh();
  };

  const clearAuth = () => {
    setIsAuthenticated(false);
    setToken(null);
    setClaims(null);
    setExpiresAt(null);
    setError(null);
    refreshConfigRef.current = null;
    if (refreshTimerRef.current) {
      window.clearInterval(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
    localStorage.removeItem("htf_manual_auth");
  };

  const refreshIfPossible = async (): Promise<boolean> => {
    const cfg = refreshConfigRef.current;
    if (!cfg?.refreshToken) return false;

    try {
      // Build token endpoint
      let tokenEndpoint = cfg.tokenEndpointOverride;
      if (!tokenEndpoint && cfg.issuer) {
        tokenEndpoint = `${cfg.issuer.replace(/\/$/, '')}/protocol/openid-connect/token`;
      }
      if (!tokenEndpoint) return false;

      const body = new URLSearchParams();
      body.set('grant_type', 'refresh_token');
      body.set('refresh_token', cfg.refreshToken);
      if (cfg.clientId) body.set('client_id', cfg.clientId);
      if (cfg.clientSecret) body.set('client_secret', cfg.clientSecret);

      const resp = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!resp.ok) throw new Error(`Refresh failed: ${resp.status}`);
      const data = await resp.json();
      if (!data.access_token) throw new Error('No access_token in refresh response');

      // Update tokens
      applyToken(data.access_token);
      refreshConfigRef.current = { ...cfg, refreshToken: data.refresh_token ?? cfg.refreshToken };
      localStorage.setItem("htf_manual_auth", JSON.stringify({ token: data.access_token, config: refreshConfigRef.current }));
      return true;
    } catch (e) {
      console.error('[Auth] Refresh error', e);
      setError('Token refresh failed; please provide a new token.');
      setIsAuthenticated(false);
      return false;
    }
  };

  // Removed legacy login/logout (manual entry now); left intentionally unused.

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, token, error, claims, expiresAt, setManualAuth, clearAuth, refreshIfPossible }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
