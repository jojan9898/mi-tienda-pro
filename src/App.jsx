import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import useUserStore from './store/userStore';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import MainAppPage from './pages/App/MainAppPage';
import ReportsPage from './pages/App/ReportsPage';
import SettingsPage from './pages/App/SettingsPage';
import StoreSetupModal from './components/specific/StoreSetupModal';

function App() {
  const { user, loading: authLoading } = useAuth();
  const { isProfileLoaded, storeName, fetchUserProfile } = useUserStore();

  useEffect(() => {
    if (user && !isProfileLoaded) {
      fetchUserProfile();
    }
  }, [user, isProfileLoaded, fetchUserProfile]);

  const isLoading = authLoading || (user && !isProfileLoaded);

  if (isLoading) {
    return (
      <div className="bg-background text-text-primary flex items-center justify-center min-h-screen">
        <p className="text-xl animate-pulse">Cargando tu tienda...</p>
      </div>
    );
  }

  const needsSetup = user && isProfileLoaded && (storeName === 'Mi Tienda PRO');

  if (needsSetup) {
    return <StoreSetupModal isOpen={true} onClose={() => fetchUserProfile()} />;
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { background: '#2A2A2A', color: '#FFFFFF' } }} />
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
        <Route path="/" element={<ProtectedRoute><MainAppPage /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
export default App;