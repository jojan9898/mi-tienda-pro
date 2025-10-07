import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import MainAppPage from './pages/App/MainAppPage'; // Importamos la nueva página

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="bg-background text-text-primary flex items-center justify-center min-h-screen">Cargando...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
      {/* Ahora la ruta principal carga el Dashboard completo */}
      <Route path="/" element={<ProtectedRoute><MainAppPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
export default App;