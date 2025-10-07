import React, { useState } from 'react';
import useUserStore from '../../store/userStore';
import toast from 'react-hot-toast';
import Modal from '../common/Modal';

const StoreSetupModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const setStoreName = useUserStore(state => state.setStoreName);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('Por favor, ingresa un nombre para tu tienda.');
    setLoading(true);
    try {
      await setStoreName(name);
      toast.success('¡Tu tienda ha sido configurada!');
      onClose();
    } catch (error) {
      toast.error('No se pudo guardar el nombre.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="¡Bienvenido a tu Tienda PRO!">
      <p className="text-text-secondary mb-4">Antes de empezar, dale un nombre a tu tienda.</p>
      <form onSubmit={handleSave}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Bodega JUA" className="w-full p-3 bg-card rounded-lg text-text-primary mb-4" autoFocus />
        <button type="submit" disabled={loading} className="w-full p-3 bg-primary hover:bg-primary-dark text-black font-bold rounded-lg transition-colors">{loading ? 'Guardando...' : 'Guardar y Continuar'}</button>
      </form>
    </Modal>
  );
};
export default StoreSetupModal;