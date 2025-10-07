import React from 'react';
import useCartStore from '../../store/cartStore';

const CartPanel = ({ onCheckout }) => {
  const { items, clearCart } = useCartStore();
  const total = items.reduce((sum, item) => sum + Number(item.subtotal), 0);

  return (
    <div className="bg-panel rounded-lg p-6 flex flex-col h-full">
      <div className="flex-grow space-y-3 overflow-y-auto pr-2">
        {items.length === 0 ? (
          <p className="text-text-secondary text-center my-auto">El carrito está vacío.</p>
        ) : (
          <>
            <div className="grid grid-cols-12 gap-4 px-2 text-text-secondary font-semibold uppercase text-sm">
              <span className="col-span-3">ID</span>
              <span className="col-span-5">Nombre</span>
              <span className="col-span-2 text-center">Cant.</span>
              <span className="col-span-2 text-right">Subtotal</span>
            </div>
            {items.map(item => (
              <div key={item.id} className="grid grid-cols-12 gap-4 items-center text-text-primary px-2 py-3 bg-card-DEFAULT rounded-md">
                <span className="col-span-3 font-mono text-sm truncate">{item.id}</span>
                <span className="col-span-5 font-semibold truncate">{item.name}</span>
                <span className={`col-span-2 font-mono text-center font-bold ${item.quantity > 1 ? 'text-secondary' : ''}`}>
                  x{item.quantity}
                </span>
                <span className="col-span-2 font-mono text-right">S/ {item.subtotal.toFixed(2)}</span>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="border-t border-border pt-4 mt-auto">
        <div className="flex justify-between items-center text-2xl font-display font-bold text-text-primary mb-4">
          <span>Total:</span>
          <span className="font-mono">S/ {total.toFixed(2)}</span>
        </div>
        
        <button 
          onClick={onCheckout} 
          disabled={items.length === 0} 
          className="w-full bg-primary-gradient hover:bg-primary-gradient-hover text-black font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Emitir Comprobante
        </button>
        
        <button
          onClick={clearCart}
          disabled={items.length === 0}
          className="w-full mt-2 bg-button hover:bg-button-hover text-text-primary font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Limpiar Carrito
        </button>
      </div>
    </div>
  );
};

export default CartPanel;