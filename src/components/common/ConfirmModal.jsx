import React from 'react';

const ConfirmModal = ({ onClose, onConfirm, message }) => {
  return (
    // No necesita un div contenedor extra, el Modal padre ya lo proporciona.
    <>
      <p className="text-text-secondary mb-6">
        {message}
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-button hover:bg-button-hover text-text-primary font-bold rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
        >
          Confirmar y Eliminar
        </button>
      </div>
    </>
  );
};

export default ConfirmModal;