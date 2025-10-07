import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import ProductList from '../../components/specific/ProductList';
import CartPanel from '../../components/specific/CartPanel';
import Modal from '../../components/common/Modal';
import ConfirmModal from '../../components/common/ConfirmModal';
import ProductForm from '../../components/specific/ProductForm';
import StoreSetupModal from '../../components/specific/StoreSetupModal';
import ReceiptForm from '../../components/specific/ReceiptForm';
import toast from 'react-hot-toast';
import { addProduct, updateProduct, deleteProduct } from '../../services/firestoreService';
import { Plus } from 'lucide-react';
import useUserStore from '../../store/userStore';

const MainAppPage = () => {
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isReceiptModalOpen, setReceiptModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const { isProfileLoaded, storeName } = useUserStore();
  const [isSetupModalOpen, setSetupModalOpen] = useState(false);

  useEffect(() => {
    if (isProfileLoaded && (storeName === 'Mi Tienda PRO')) {
      setSetupModalOpen(true);
    }
  }, [isProfileLoaded, storeName]);

  const handleOpenAddModal = () => { setEditingProduct(null); setProductModalOpen(true); };
  const handleOpenEditModal = (product) => { setEditingProduct(product); setProductModalOpen(true); };
  const handleOpenDeleteModal = (product) => { setProductToDelete(product); setConfirmModalOpen(true); };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    const promise = deleteProduct(productToDelete.id);
    toast.promise(promise, {
      loading: 'Eliminando...',
      success: `"${productToDelete.name}" eliminado.`,
      error: 'No se pudo eliminar.',
    });
    setConfirmModalOpen(false);
    setProductToDelete(null);
  };
  
  const handleSaveProduct = (productData) => {
    const promise = editingProduct
      ? updateProduct(editingProduct.id, productData)
      : addProduct(productData);

    toast.promise(promise, {
      loading: editingProduct ? 'Actualizando...' : 'Añadiendo...',
      success: () => {
        setProductModalOpen(false);
        return editingProduct ? 'Producto actualizado.' : 'Producto añadido.';
      },
      error: 'Ocurrió un error al guardar.',
    });
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-6rem)]">
        <div className="flex flex-col">
          <h2 className="text-3xl font-display font-extrabold text-text-primary mb-4">Inventario</h2>
          <div className="flex-grow bg-panel rounded-lg p-4 overflow-y-auto">
            <ProductList onEdit={handleOpenEditModal} onDelete={handleOpenDeleteModal} />
          </div>
          <div className="pt-4 flex justify-end">
            <button 
              onClick={handleOpenAddModal} 
              className="w-auto flex items-center gap-2 bg-primary-gradient hover:bg-primary-gradient-hover text-black font-bold py-2 px-5 rounded-lg transition-colors"
            >
              <Plus size={20} />
              Añadir
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-3xl font-display font-extrabold text-text-primary mb-4">Carrito</h2>
          <div className="flex-grow">
            <CartPanel onCheckout={() => setReceiptModalOpen(true)} />
          </div>
        </div>
      </div>

      <StoreSetupModal isOpen={isSetupModalOpen} onClose={() => setSetupModalOpen(false)} />
      
      <Modal 
        isOpen={isProductModalOpen} 
        onClose={() => setProductModalOpen(false)} 
        title={editingProduct ? 'Editar Producto' : 'Añadir Producto'}
      >
        <ProductForm 
          onSave={handleSaveProduct} 
          product={editingProduct} 
        />
      </Modal>
      
      <Modal isOpen={isReceiptModalOpen} onClose={() => setReceiptModalOpen(false)} title="Emitir Comprobante">
        <ReceiptForm onClose={() => setReceiptModalOpen(false)} />
      </Modal>
      
      <Modal isOpen={isConfirmModalOpen} onClose={() => setConfirmModalOpen(false)} title="Confirmar Eliminación">
        <ConfirmModal 
          onConfirm={handleConfirmDelete} 
          onClose={() => setConfirmModalOpen(false)}
          message={`¿Estás seguro de que quieres eliminar "${productToDelete?.name}"?`}
        />
      </Modal>
    </Layout>
  );
};
export default MainAppPage;