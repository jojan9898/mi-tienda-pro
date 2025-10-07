import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";

export default function ProductForm({ onClose, onSaved }) {
  const { addProduct } = useProducts();
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    sku: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();                // ✅ evita submit nativo/recarga
    setError("");

    if (!form.nombre || !form.precio) {
      setError("Completa al menos nombre y precio.");
      return;
    }

    try {
      setSaving(true);
      await addProduct({
        ...form,
        precio: Number(form.precio),
        stock: Number(form.stock || 0),
        createdAt: Date.now(),
      });
      onSaved?.();                     // refresca lista en el padre
      onClose?.();                     // cierra modal
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al guardar el producto.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm">Nombre</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm">Precio</label>
          <input
            name="precio"
            type="number"
            step="0.01"
            value={form.precio}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm">Stock</label>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm">SKU</label>
        <input
          name="sku"
          value={form.sku}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded border">
          Cancelar
        </button>
        <button
          type="submit"                 // ✅ submit
          disabled={saving}
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Agrego producto"}
        </button>
      </div>
    </form>
  );
}
