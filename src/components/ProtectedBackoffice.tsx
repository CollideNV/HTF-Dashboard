import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Backoffice from './Backoffice';

const RequireAuth: React.FC = () => {
  const { isAuthenticated, isLoading, login, error } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      login();
    }
  }, [isLoading, isAuthenticated, login]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-cyan-400 font-mono">
        Initializing secure session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-cyan-400 font-mono">
        Redirecting to login{error ? `: ${error}` : '...'}
      </div>
    );
  }

  return <Backoffice />;
};

const ProtectedBackoffice: React.FC = () => {
  return (
    <AuthProvider>
      <RequireAuth />
    </AuthProvider>
  );
};

export default ProtectedBackoffice;
