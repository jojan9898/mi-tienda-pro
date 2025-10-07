import React from 'react';
import { NavLink } from 'react-router-dom'; 
import { LayoutDashboard, Package, Settings, LogOut, UserCircle } from 'lucide-react';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import useUserStore from '../../store/userStore';

const Sidebar = () => {
  const { user } = useAuth();
  const { storeName, logoUrl } = useUserStore();
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Reportes', icon: Package, path: '/reports' },
    { name: 'Configuración', icon: Settings, path: '/settings' },
  ];
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Has cerrado sesión.');
    } catch (error) { toast.error('Error al cerrar sesión.'); }
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-panel text-text-secondary p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-card rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden">
            {logoUrl ? <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" /> : (storeName && <span className="text-xl font-bold text-primary">{storeName.charAt(0)}</span>)}
          </div>
          <div className="text-white text-2xl font-display font-extrabold truncate">{storeName || 'Cargando...'}</div>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-2">
                <NavLink 
                  to={item.path} end={item.path === '/'} 
                  className={({ isActive }) => `w-full group flex items-center p-3 rounded-lg transition-colors duration-200 ease-in-out hover:bg-primary ${isActive ? 'bg-primary' : ''}`}
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className={`w-6 h-6 mr-4 transition-colors duration-200 ${isActive ? 'text-black' : 'text-primary group-hover:text-black'}`} />
                      <span className={`text-lg font-semibold transition-colors duration-200 ${isActive ? 'text-black' : 'text-text-primary group-hover:text-black'}`}>{item.name}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border pt-6">
        {user && <div className="flex items-center text-sm mb-4"><UserCircle className="w-6 h-6 mr-3 text-primary" /><span className="truncate">{user.email}</span></div>}
        <button onClick={handleLogout} className="w-full text-left flex items-center p-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors duration-200 ease-in-out">
          <LogOut className="w-5 h-5 mr-3" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;