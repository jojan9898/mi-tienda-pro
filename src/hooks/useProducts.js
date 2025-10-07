import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useAuth } from './useAuth'; // Importamos nuestro hook de autenticación

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Usamos el hook como la fuente de verdad del usuario

  useEffect(() => {
    // Si no hay usuario (o se está cargando), la lista está vacía.
    if (!user) {
      setProducts([]);
      setLoading(false);
      return;
    }

    // Si hay usuario, nos suscribimos a su colección de productos
    const productsCollectionRef = collection(db, 'users', user.uid, 'products');
    const q = query(productsCollectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
      setLoading(false);
    });

    // Limpiamos la suscripción al desmontar el componente
    return () => unsubscribe();
  }, [user]); // Este efecto se re-ejecuta cada vez que el usuario cambia

  return { products, loading };
};