import React, { useState } from 'react';
import useCartStore from '../../store/cartStore';
import { updateStockAfterSale, recordSale } from '../../services/firestoreService';
import toast from 'react-hot-toast';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReceiptDocument from '../pdf/ReceiptDocument';

const ReceiptForm = ({ onClose }) => {
  const { items, clearCart } = useCartStore();
  const [docType, setDocType] = useState('boleta');
  const [customerId, setCustomerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [saleCompleted, setSaleCompleted] = useState(false);

  const handleProcessSale = async () => {
    // Validaciones
    if ((docType === 'boleta_dni' && customerId.length !== 8) || (docType === 'factura' && customerId.length !== 11)) {
      return toast.error(`El ${docType === 'factura' ? 'RUC' : 'DNI'} es incorrecto.`);
    }

    setLoading(true);
    const loadingToastId = toast.loading('Procesando venta...');

    try {
      // Actualizar el stock
      await updateStockAfterSale(items);

      // Preparar los datos y registrar la venta
      const total = items.reduce((sum, item) => sum + Number(item.subtotal), 0);
      const saleData = { docType, customerId, items, total };
      await recordSale(saleData);
      
      setSaleData(saleData); // Guardar datos para el PDF
      toast.success('Venta procesada. Descarga lista.', { id: loadingToastId });
      
      // Limpiar el carrito inmediatamente
      clearCart();
    } catch (error) {
      toast.error(`Error: ${error.message}`, { id: loadingToastId });
    } finally {
      setLoading(false);
    }
  };
  
  // Prepara los datos para el PDF, pero solo si la venta se ha completado
  const total = items.reduce((sum, item) => sum + Number(item.subtotal), 0);
  const receiptData = { docType, customerId, items, total };

  return (
    <div className="bg-panel p-6 rounded-lg space-y-4">
      {!saleCompleted ? (
        <>
          <select value={docType} onChange={(e) => setDocType(e.target.value)} className="w-full p-3 bg-card rounded-lg text-text-primary">
            <option value="boleta">Boleta</option>
            <option value="boleta_dni">Boleta con DNI</option>
            <option value="factura">Factura</option>
          </select>
          
          {(docType === 'boleta_dni' || docType === 'factura') && (
            <input 
              type="number" 
              value={customerId} 
              onInput={(e) => {
                 const maxLength = docType === 'factura' ? 11 : 8;
                 if (e.target.value.length > maxLength) e.target.value = e.target.value.slice(0, maxLength);
              }}
              onChange={(e) => setCustomerId(e.target.value)}
              placeholder={docType === 'factura' ? 'RUC (11 dígitos)' : 'DNI (8 dígitos)'}
              className="w-full p-3 bg-card rounded-lg text-text-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          )}

          <button onClick={handleProcessSale} disabled={loading} className="w-full p-3 bg-secondary hover:bg-blue-600 text-white font-bold rounded-lg transition-colors disabled:bg-gray-600">
            {loading ? 'Procesando...' : 'Generar Comprobante'}
          </button>
        </>
      ) : (
        <div>
          <p className="text-center text-text-secondary mb-4">La venta fue exitosa. El carrito ya se ha limpiado.</p>
          <PDFDownloadLink
            document={<ReceiptDocument data={receiptData} />}
            fileName={`${receiptData.docType}_${Date.now()}.pdf`}
            className="block w-full text-center p-3 bg-primary hover:bg-primary-dark text-black font-bold rounded-lg transition-colors"
          >
            {({ loading }) => loading ? 'Generando PDF...' : 'Descargar PDF'}
          </PDFDownloadLink>
          <button onClick={onClose} className="w-full mt-2 bg-button hover:bg-button-hover text-text-primary font-bold py-2 px-4 rounded-lg transition-colors">
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default ReceiptForm;