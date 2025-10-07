import { create } from 'zustand';
import { getUserProfile, setStoreName as setStoreNameInDb } from '../services/firestoreService';

const useUserStore = create((set) => ({
  storeName: null,
  logoUrl: null,
  isProfileLoaded: false,
  
  fetchUserProfile: async () => {
    try {
      const profile = await getUserProfile();
      if (profile && profile.storeName) {
        set({ 
          storeName: profile.storeName, 
          logoUrl: profile.logoUrl || null,
          isProfileLoaded: true 
        });
      } else {
        set({ storeName: 'Mi Tienda PRO', isProfileLoaded: true });
      }
    } catch (error) {
      console.error("Error al cargar perfil:", error);
      set({ isProfileLoaded: true });
    }
  },

  setStoreName: async (name) => {
    try {
      await setStoreNameInDb(name);
      set({ storeName: name });
    } catch (error) {
      console.error("Error al guardar nombre:", error);
      throw error;
    }
  },
}));

export default useUserStore;