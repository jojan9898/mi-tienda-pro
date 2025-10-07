import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import ProductList from '../../components/specific/ProductList';
import CartPanel from '../../components/specific/CartPanel';
import Modal from '../../components/common/Modal';
import ConfirmModal from '../../components/common/ConfirmModal';
import ProductForm from '../../components/specific/ProductForm';
import ReceiptForm from '../../components/specific/ReceiptForm';
import { addProduct, updateProduct, deleteProduct } from '../../services/firestoreService';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const MainAppPage = () => {
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isReceiptModalOpen, setReceiptModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOpenAddModal = () => { setEditingProduct(null); setProductModalOpen(true); };
  const handleOpenEditModal = (product) => { setEditingProduct(product); setProductModalOpen(true); };
  const handleOpenDeleteModal = (product) => { setProductToDelete(product); setConfirmModalOpen(true); };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    const toastId = toast.loading('Eliminando...');
    try {
      await deleteProduct(productToDelete.id);
      toast.success(`"${productToDelete.name}" eliminado.`, { id: toastId });
    } catch (error) {
      toast.error("No se pudo eliminar.", { id: toastId });
    } finally {
      setConfirmModalOpen(false);
      setProductToDelete(null);
    }
  };
  
  const handleSaveProduct = async (productData) => {
    setLoading(true);
    const toastId = toast.loading(editingProduct ? 'Actualizando...' : 'Guardando...');
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        toast.success('Producto actualizado', { id: toastId });
      } else {
        await addProduct(productData);
        toast.success('Producto añadido', { id: toastId });
      }
      setProductModalOpen(false);
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setLoading(false);
    }
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
              className="w-auto flex items-center gap-2 bg-primary hover:bg-primary-dark text-black font-bold py-2 px-5 rounded-lg transition-colors"
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

      {isProductModalOpen && (
        <Modal isOpen={isProductModalOpen} onClose={() => setProductModalOpen(false)} title={editingProduct ? 'Editar Producto' : 'Añadir Producto'}>
          <ProductForm onSave={handleSaveProduct} product={editingProduct} loading={loading} />
        </Modal>
      )}
      {isReceiptModalOpen && (
        <Modal isOpen={isReceiptModalOpen} onClose={() => setReceiptModalOpen(false)} title="Emitir Comprobante">
          <ReceiptForm />
        </Modal>
      )}
      {isConfirmModalOpen && (
        <Modal isOpen={isConfirmModalOpen} onClose={() => setConfirmModalOpen(false)} title="Confirmar Eliminación">
          <ConfirmModal onConfirm={handleConfirmDelete} message={`¿Estás seguro de que quieres eliminar "${productToDelete?.name}"?`} />
        </Modal>
      )}
    </Layout>
  );
};
export default MainAppPage;