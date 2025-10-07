import React from 'react';

const ConfirmModal = ({ onClose, onConfirm, message }) => {
  return (
    <div>
      <div className="text-text-secondary mb-6">{message}</div>
      <div className="flex justify-end gap-4">
        <button onClick={onClose} className="px-4 py-2 bg-button hover:bg-button-hover text-text-primary font-semibold rounded-lg transition-colors">Cancelar</button>
        <button onClick={onConfirm} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors">Confirmar y Eliminar</button>
      </div>
    </div>
  );
};
export default ConfirmModal;