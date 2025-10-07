// Ruta: src/hooks/useProducts.js

import { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useAuth } from './useAuth';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const productsCollectionRef = collection(db, 'users', user.uid, 'products');
    const q = query(productsCollectionRef, orderBy('createdAt', 'desc'));

    // onSnapshot nos da la lista en tiempo real. No necesitamos 'reloadProducts'.
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { products, loading };
};