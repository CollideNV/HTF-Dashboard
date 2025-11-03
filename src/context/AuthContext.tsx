import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import Keycloak from "keycloak-js";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  error: string | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Keycloak configuration
const KEYCLOAK_URL =
  process.env.REACT_APP_KEYCLOAK_URL || "https://security.bewire.services:8082";
const REALM = process.env.REACT_APP_KEYCLOAK_REALM || "collide-production";
const CLIENT_ID =
  process.env.REACT_APP_KEYCLOAK_CLIENT_ID || "collide-hack-the-future";

// Create a single Keycloak instance (avoid re-instantiation across renders)
const keycloak = new Keycloak({ url: KEYCLOAK_URL, realm: REALM, clientId: CLIENT_ID });

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const refreshTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const silentUri = `${window.location.origin}/silent-check-sso.html`;
        // Initialize keycloak using PKCE and silent SSO if possible
        const authenticated = await keycloak.init({
          onLoad: "check-sso",
          pkceMethod: "S256",
          silentCheckSsoRedirectUri: silentUri,
          checkLoginIframe: false,
        });

        if (authenticated) {
          setIsAuthenticated(true);
          setToken(keycloak.token ?? null);
          setError(null);

          // Proactively refresh token before expiry
          const setupRefresh = () => {
            // Clear any previous timer
            if (refreshTimerRef.current) {
              window.clearInterval(refreshTimerRef.current);
              refreshTimerRef.current = null;
            }

            const intervalId = window.setInterval(async () => {
              try {
                // Refresh if token expires in < 60s
                const refreshed = await keycloak.updateToken(60);
                if (refreshed) {
                  setToken(keycloak.token ?? null);
                  // console.debug("[Keycloak] Token refreshed");
                }
              } catch (err) {
                console.error("[Keycloak] Token refresh failed:", err);
                setError("Session expired. Please login again.");
                setIsAuthenticated(false);
                setToken(null);
              }
            }, 30 * 1000); // check every 30s

            refreshTimerRef.current = intervalId;
          };

          setupRefresh();

          // Also handle explicit expiry callback
          keycloak.onTokenExpired = async () => {
            try {
              await keycloak.updateToken(30);
              setToken(keycloak.token ?? null);
            } catch (err) {
              console.error("[Keycloak] Token expired and refresh failed:", err);
              setIsAuthenticated(false);
              setToken(null);
            }
          };
        } else {
          // Not logged in (no existing SSO) — consumer can call login()
          setIsAuthenticated(false);
          setToken(null);
        }
      } catch (err) {
        console.error("[Keycloak] Initialization error:", err);
        setIsAuthenticated(false);
        setToken(null);
        setError(err instanceof Error ? err.message : "Authentication failed");
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    return () => {
      if (refreshTimerRef.current) {
        window.clearInterval(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
    };
  }, []);

  const login = () => {
    keycloak.login({ redirectUri: `${window.location.origin}/#/backoffice` });
  };

  const logout = async () => {
    try {
      await keycloak.logout({ redirectUri: window.location.origin });
    } catch (err) {
      console.error("[Keycloak] Logout error:", err);
    } finally {
      setIsAuthenticated(false);
      setToken(null);
      setError(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, token, error, login, logout }}
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
