import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';

export default function ProtectedRoute({ children, requireAgent = false }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await getCurrentUser();
      if (response.success) {
        setUser(response.user);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // User not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Route requires agent role but user is not agent
  if (requireAgent && user.role !== 'agent') {
    return <Navigate to="/" replace />;
  }

  return children;
}
