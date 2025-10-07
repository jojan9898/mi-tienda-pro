// src/services/firestoreService.js
import { db, auth } from '../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  runTransaction,
  deleteDoc,
  getDoc,
  addDoc
} from 'firebase/firestore';
import toast from 'react-hot-toast';

const getProductsCollectionRef = () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuario no autenticado.");
  return collection(db, 'users', user.uid, 'products');
};

export const getUserProfile = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  const profileRef = doc(db, 'users', user.uid, 'settings', 'profile');
  const docSnap = await getDoc(profileRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const setStoreName = async (name) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuario no autenticado.");
  const profileRef = doc(db, 'users', user.uid, 'settings', 'profile');
  await setDoc(profileRef, { storeName: name }, { merge: true });
};

export const uploadStoreLogo = async (file) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuario no autenticado.");
  if (!file) throw new Error("No se ha seleccionado ningún archivo.");

  const storage = getStorage();
  const filePath = `users/${user.uid}/profile/logo_${Date.now()}`;
  const storageRef = ref(storage, filePath);

  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  const profileRef = doc(db, 'users', user.uid, 'settings', 'profile');
  await setDoc(profileRef, { logoUrl: downloadURL }, { merge: true });
  toast.success('¡Logo actualizado!');
  return downloadURL;
};

/**
 * Crea el producto usando el ID proporcionado desde el formulario.
 * productData debe contener: { id, name, almacen, stock, price }
 */
export const addProduct = async (productData) => {
  if (!productData?.id) {
    throw new Error("Falta el ID del producto en productData.id");
  }

  const productRef = doc(getProductsCollectionRef(), String(productData.id).trim());

  await setDoc(productRef, {
    name: String(productData.name || '').trim(),
    almacen: String(productData.almacen || '').trim(),
    stock: Number(productData.stock ?? 0),
    price: Number(productData.price ?? 0),
    createdAt: serverTimestamp(),
  }, { merge: false });

  // (Opcional) feedback al usuario
  toast.success('Producto agregado');
  return productRef.id;
};

export const updateProduct = async (productId, productData) => {
  const productRef = doc(getProductsCollectionRef(), productId);
  await updateDoc(productRef, {
    name: String(productData.name || '').trim(),
    almacen: String(productData.almacen || '').trim(),
    stock: Number(productData.stock ?? 0),
    price: Number(productData.price ?? 0),
  });
  toast.success('Producto actualizado');
};

export const deleteProduct = async (productId) => {
  const productRef = doc(getProductsCollectionRef(), productId);
  await deleteDoc(productRef);
  toast.success('Producto eliminado');
};

export const updateStockAfterSale = async (itemsInCart) => {
  const productsRef = getProductsCollectionRef();
  await runTransaction(db, async (transaction) => {
    for (const item of itemsInCart) {
      const productRef = doc(productsRef, item.id);
      const productDoc = await transaction.get(productRef);
      if (!productDoc.exists()) {
        throw new Error(`El producto ${item.name} no fue encontrado.`);
      }
      const currentStock = Number(productDoc.data().stock ?? 0);
      const newStock = currentStock - Number(item.quantity ?? 0);
      if (newStock < 0) {
        throw new Error(`Stock insuficiente para ${item.name}.`);
      }
      transaction.update(productRef, { stock: newStock });
    }
  });
};

export const recordSale = async (saleData) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuario no autenticado.");
  const salesCollectionRef = collection(db, 'users', user.uid, 'sales');
  await addDoc(salesCollectionRef, {
    ...saleData,
    createdAt: serverTimestamp(),
    userId: user.uid
  });
  toast.success('Venta registrada');
};
