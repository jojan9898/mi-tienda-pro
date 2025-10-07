import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="bg-background text-text-primary flex items-center justify-center min-h-screen">
        Verificando sesión...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};
export default ProtectedRoute;