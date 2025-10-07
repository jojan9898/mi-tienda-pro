import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Registrando...');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signOut(auth);
      toast.success("¡Registro exitoso! Por favor, inicia sesión.", { id: toastId });
      navigate('/login');
    } catch (error) {
      toast.error(error.code === 'auth/email-already-in-use' ? "Este correo ya está en uso." : "Ocurrió un error.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Toaster position="top-center" />
      <div className="w-full max-w-md p-8 space-y-8 bg-panel rounded-lg shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-display font-extrabold text-text-primary">Crea tu Cuenta</h2>
          <p className="mt-2 text-text-secondary">Únete para empezar a gestionar tu tienda.</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" required className="w-full p-3 bg-card rounded-lg text-text-primary" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required className="w-full p-3 bg-card rounded-lg text-text-primary" />
          <button type="submit" disabled={loading} className="w-full p-3 bg-primary-gradient hover:bg-primary-gradient-hover text-black font-bold rounded-lg transition-colors disabled:opacity-50">
            {loading ? 'Creando Cuenta...' : 'Crear Cuenta'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-text-secondary">¿Ya tienes una cuenta? <Link to="/login" className="font-semibold text-primary hover:text-primary-dark">Inicia sesión</Link></p>
      </div>
    </div>
  );
};
export default RegisterPage;