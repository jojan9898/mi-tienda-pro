import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ProductForm = ({ onSave, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    almacen: '1',
    stock: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name || '',
        almacen: product.almacen || '1',
        stock: product.stock || '',
        price: product.price || '',
      });
    } else {
      // Limpiamos el formulario para un nuevo producto
      setFormData({ name: '', almacen: '1', stock: '', price: '' });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validamos que los campos no estén vacíos antes de enviar
    if (!formData.name.trim() || !formData.stock || !formData.price) {
      return toast.error("Por favor, completa todos los campos.");
    }
    setLoading(true);
    await onSave(formData);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Mostramos el ID solo si estamos en modo de edición */}
      {product && (
        <div>
          <label className="text-sm font-medium text-text-secondary">ID del Producto</label>
          <input
            type="text"
            value={formData.id}
            disabled
            className="w-full p-3 mt-1 bg-card rounded-lg text-text-secondary cursor-not-allowed"
          />
        </div>
      )}
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
      {/* ¡El campo para ingresar un nuevo ID ha sido eliminado! */}
      <button
        type="submit"
        disabled={loading}
        className="w-full p-3 bg-primary-gradient hover:bg-primary-gradient-hover text-black font-bold rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? 'Guardando...' : 'Guardar Producto'}
      </button>
    </form>
  );
};

export default ProductForm;