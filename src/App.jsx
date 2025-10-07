import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

// Componente temporal simple para la página principal
const HomePage = () => {
  return (
    <div className="bg-background text-text-primary flex items-center justify-center min-h-screen">
      <h1 className="text-4xl font-display">¡Bienvenido a tu Tienda!</h1>
    </div>
  );
};

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="bg-background text-text-primary flex items-center justify-center min-h-screen">Cargando...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
export default App;