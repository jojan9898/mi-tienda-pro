// Ruta: src/components/specific/ProductList.jsx

import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import useCartStore from '../../store/cartStore';
import { Edit, Trash2, Search, PackageX } from 'lucide-react';
import Modal from '../common/Modal'; // Necesitaremos el Modal
import ProductForm from './ProductForm'; // Y el formulario

// Mapeo de colores por almacén
const almacenColors = {
  '1': 'bg-almacen-1', '2': 'bg-almacen-2', '3': 'bg-almacen-3',
  '4': 'bg-almacen-4', '5': 'bg-almacen-5',
};

const ProductList = ({ onSave, onEdit, onDelete }) => {
  const { products, loading } = useProducts();
  const { items: cartItems, addToCart } = useCartStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-text-secondary text-center pt-10">Cargando inventario...</p>;

  return (
    <div className="flex flex-col h-full">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre o ID..."
          className="w-full bg-background p-3 pl-10 rounded-lg text-text-primary"
        />
      </div>
      <div className="flex-grow overflow-y-auto pr-2 space-y-3">
        {/* Encabezados de la Tabla (sin fondo blanco) */}
        <div className="grid grid-cols-12 gap-4 px-4 text-text-secondary font-semibold uppercase text-sm sticky top-0 bg-panel py-2">
          <span className="col-span-2">ID</span>
          <span className="col-span-4">Nombre</span>
          <span className="col-span-1 text-center">Almacén</span>
          <span className="col-span-2 text-right">Stock</span>
          <span className="col-span-1 text-right">Precio</span>
          <span className="col-span-2 text-right">Acciones</span>
        </div>
        
        {products.length === 0 && !loading && <p className="text-text-secondary text-center pt-10">Tu inventario está vacío.</p>}

        {filteredProducts.map((product) => {
          const itemInCart = cartItems.find(item => item.id === product.id);
          const quantityInCart = itemInCart ? itemInCart.quantity : 0;
          const displayStock = product.stock - quantityInCart;
          const isOutOfStock = displayStock <= 0;
          const bgColor = almacenColors[product.almacen] || 'bg-card-DEFAULT';
          
          return (
            <div 
              key={product.id} 
              className={`${bgColor} rounded-lg p-4 grid grid-cols-12 gap-4 items-center transition-colors duration-200 ease-in-out ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'hover:bg-card-hover cursor-pointer'}`}
              onClick={() => !isOutOfStock && addToCart(product)}
            >
              <span className="col-span-2 truncate font-mono text-sm">{product.id}</span>
              <span className="col-span-4 font-semibold text-text-primary truncate">{product.name}</span>
              <span className="col-span-1 text-text-secondary text-center font-bold">{product.almacen}</span>
              <span className={`col-span-2 text-right font-semibold ${isOutOfStock ? 'text-red-500' : ''}`}>{isOutOfStock ? <PackageX size={18} className="inline-block ml-auto"/> : displayStock}</span>
              <span className="col-span-1 text-right font-mono text-sm text-text-secondary">S/ {product.price.toFixed(2)}</span>
              <div className="col-span-2 flex justify-end gap-2">
                <button onClick={(e) => { e.stopPropagation(); onEdit(product); }} className="p-2 hover:bg-button-hover rounded-full" title="Editar"><Edit size={18} className="text-text-secondary" /></button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(product); }} className="p-2 hover:bg-red-500/20 rounded-full" title="Eliminar"><Trash2 size={18} className="text-red-500" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProductList;
