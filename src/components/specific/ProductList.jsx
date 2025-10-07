import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import ProductForm from "./ProductForm";
import { useProducts } from "../../hooks/useProducts";

export default function ProductList() {
  const { listProducts } = useProducts();
  const [products, setProducts] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const reloadProducts = async () => {
    const data = await listProducts();
    setProducts(data);
  };

  useEffect(() => {
    reloadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Productos</h1>
        <button
          type="button"
          className="px-4 py-2 rounded bg-black text-white"
          onClick={() => setIsAddOpen(true)}
        >
          + Añadir
        </button>
      </div>

      {/* Tabla súper simple */}
      <div className="border rounded">
        <div className="grid grid-cols-4 font-medium bg-gray-50 p-2">
          <div>Nombre</div>
          <div>Precio</div>
          <div>Stock</div>
          <div>SKU</div>
        </div>
        {products.map((p, idx) => (
          <div key={idx} className="grid grid-cols-4 p-2 border-t">
            <div>{p.nombre}</div>
            <div>S/ {Number(p.precio).toFixed(2)}</div>
            <div>{p.stock ?? 0}</div>
            <div>{p.sku || "-"}</div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="p-3 text-sm text-gray-500">Sin productos</div>
        )}
      </div>

      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="+ Añadir producto"
      >
        <ProductForm
          onClose={() => setIsAddOpen(false)}
          onSaved={reloadProducts}
        />
      </Modal>
    </div>
  );
}
