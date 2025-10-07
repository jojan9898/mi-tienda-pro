import { create } from 'zustand';
import toast from 'react-hot-toast';

const useCartStore = create((set, get) => ({
  items: [],
  
  addToCart: (product) => {
    const { items } = get();
    const existingItem = items.find(item => item.id === product.id);
    const currentQuantityInCart = existingItem ? existingItem.quantity : 0;

    if (currentQuantityInCart >= product.stock) {
      toast.error(`No hay más stock para "${product.name}"`);
      return;
    }

    set((state) => {
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === product.id 
            ? { ...item, 
                quantity: item.quantity + 1, 
                subtotal: (item.quantity + 1) * item.price 
              } 
            : item
        );
        return { items: updatedItems };
      } else {
        const newItem = {
          id: product.id,
          name: product.name,
          quantity: 1,
          price: product.price,
          subtotal: product.price,
          stock: product.stock,
        };
        return { items: [...state.items, newItem] };
      }
    });
  },

  clearCart: () => set({ items: [] }),
}));

export default useCartStore;