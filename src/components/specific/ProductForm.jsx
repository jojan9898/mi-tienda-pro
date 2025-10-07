import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ProductForm = ({ onSave, product, onClose }) => {
  const [formData, setFormData] = useState({ id: '', name: '', almacen: '1', stock: '', price: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({ id: product.id, name: product.name, almacen: product.almacen, stock: product.stock, price: product.price });
    } else {
      setFormData({ id: '', name: '', almacen: '1', stock: '', price: '' });
    }
  }, [product]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id || !formData.name || !formData.stock || !formData.price) {
      return toast.error("Por favor, completa todos los campos, incluyendo el ID.");
    }
    setLoading(true);
    await onSave(formData);
    setLoading(false);
    onClose();
  };

  return (
    // Aplicamos los estilos oscuros al formulario
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campo de ID */}
      <input 
        type="text" 
        name="id" 
        value={formData.id} 
        onChange={handleChange} 
        placeholder="ID del Producto (SKU)" 
        disabled={!!product} 
        className="w-full p-3 bg-card rounded-lg text-text-primary disabled:bg-gray-800" 
        required 
      />
      
      {/* Campo de Nombre */}
      <input 
        type="text" 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        placeholder="Nombre del producto" 
        className="w-full p-3 bg-card rounded-lg text-text-primary" 
        required 
        autoFocus 
      />
      
      {/* Selector de Almacén */}
      <div>
        <label className="text-sm font-medium text-text-secondary">Almacén</label>
        <div className="flex gap-2 mt-1">
          {['1', '2', '3', '4', '5'].map(num => (
            <button 
              type="button" 
              key={num} 
              onClick={() => setFormData(prev => ({ ...prev, almacen: num }))} 
              className={`w-full p-2 rounded-lg font-bold transition-colors ${formData.almacen === num ? 'bg-primary text-black' : 'bg-card text-text-primary hover:bg-card-hover'}`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Campos de Stock y Precio */}
      <div className="grid grid-cols-2 gap-4">
        <input 
          type="number" 
          name="stock" 
          value={formData.stock} 
          onChange={handleChange} 
          placeholder="Stock" 
          className="w-full p-3 bg-card rounded-lg text-text-primary" 
          required 
        />
        <input 
          type="number" 
          step="0.01" 
          name="price" 
          value={formData.price} 
          onChange={handleChange} 
          placeholder="Precio (S/.)" 
          className="w-full p-3 bg-card rounded-lg text-text-primary" 
          required 
        />
      </div>

      {/* Botones de Acción */}
      <div className="flex justify-end gap-4 pt-4">
        <button 
          type="button" 
          onClick={onClose} 
          className="px-6 py-2 bg-button hover:bg-button-hover text-text-primary font-bold rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          disabled={loading} 
          className="px-6 py-2 bg-primary-gradient hover:bg-primary-gradient-hover text-black font-bold rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar Producto'}
        </button>
      </div>
    </form>
  );
};
export default ProductForm;