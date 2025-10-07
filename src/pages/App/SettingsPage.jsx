import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import useUserStore from '../../store/userStore';
import toast from 'react-hot-toast';
import { uploadStoreLogo } from '../../services/firestoreService';
import { Upload } from 'lucide-react';

const SettingsPage = () => {
  const { storeName, setStoreName, logoUrl, fetchUserProfile } = useUserStore();
  const [currentName, setCurrentName] = useState(storeName || '');
  const [loadingName, setLoadingName] = useState(false);
  const [loadingLogo, setLoadingLogo] = useState(false);
  const [logoPreview, setLogoPreview] = useState(logoUrl);

  useEffect(() => {
    setCurrentName(storeName || '');
    setLogoPreview(logoUrl || null);
  }, [storeName, logoUrl]);

  const handleSaveName = async () => {
    if (!currentName.trim()) return toast.error("El nombre no puede estar vacío.");
    setLoadingName(true);
    try {
      await setStoreName(currentName);
      toast.success("¡Nombre actualizado!");
    } catch (error) { 
      toast.error("No se pudo actualizar."); 
    } finally { 
      setLoadingName(false); 
    }
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoadingLogo(true);
      try {
        setLogoPreview(URL.createObjectURL(file));
        await uploadStoreLogo(file);
        await fetchUserProfile();
      } catch (error) {
        setLogoPreview(logoUrl);
      } finally {
        setLoadingLogo(false);
      }
    }
  };

  return (
    <Layout>
      <h1 className="text-4xl font-display font-extrabold text-text-primary mb-8">
        Configuración
      </h1>
      <div className="space-y-8 max-w-2xl">
        <div className="bg-panel p-6 rounded-lg">
          <h2 className="text-xl font-bold text-text-primary mb-4">Nombre de la Tienda</h2>
          <div className="flex items-center gap-4">
            <input 
              type="text" 
              value={currentName} 
              onChange={(e) => setCurrentName(e.target.value)} 
              className="flex-grow p-3 bg-card rounded-lg text-text-primary" 
            />
            <button 
              onClick={handleSaveName} 
              disabled={loadingName || currentName === storeName} 
              className="bg-primary hover:bg-primary-dark text-black font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {loadingName ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </div>
        <div className="bg-panel p-6 rounded-lg">
          <h2 className="text-xl font-bold text-text-primary mb-4">Logo de la Tienda</h2>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center overflow-hidden">
              {loadingLogo ? <p className="text-xs text-text-secondary">Cargando...</p> : (logoPreview ? <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" /> : <p className="text-text-secondary">Sin logo</p>)}
            </div>
            <label htmlFor="logo-upload" className="cursor-pointer flex-grow bg-button hover:bg-button-hover text-text-primary font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Upload size={18} />
              {loadingLogo ? 'Subiendo...' : 'Cambiar Logo'}
            </label>
            <input id="logo-upload" type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleLogoChange} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;