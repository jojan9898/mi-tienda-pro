const KEY = "mi_tienda_products";

function readLocal() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeLocal(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function useProducts() {
  const listProducts = async () => {
    return readLocal();
  };

  const addProduct = async (product) => {
    const curr = readLocal();
    curr.push(product);
    writeLocal(curr);
    return true; // ✅ importante: devolver una promesa resuelta
  };

  return {
    listProducts,
    addProduct,
  };
}
