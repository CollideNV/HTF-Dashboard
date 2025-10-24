import { useKeycloak } from '@react-keycloak/web';
import React, { useEffect } from 'react';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { keycloak, initialized } = useKeycloak();
  
  useEffect(() => {
    console.log("PrivateRoute - keycloak:", keycloak);
    console.log("PrivateRoute - initialized:", initialized);
  }, [keycloak, initialized]);

  useEffect(() => {
    // call login as a side-effect after keycloak is initialized
    if (initialized && keycloak && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak]);

  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="text-center">
          <div className="text-cyan-400 text-2xl font-mono animate-pulse mb-4">
            Loading...
          </div>
          <div className="text-cyan-300/60 text-sm">
            Initializing authentication...
          </div>
        </div>
      </div>
    );
  }

  if (!keycloak?.authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="text-center">
          <div className="text-cyan-400 text-2xl font-mono">
            Redirecting to login...
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
