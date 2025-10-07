import { db, auth, storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc, updateDoc, serverTimestamp, runTransaction, deleteDoc, getDoc, addDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const getProductsCollectionRef = () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuario no autenticado.");
  return collection(db, 'users', user.uid, 'products');
};

export const getUserProfile = async () => { /* ... (código que ya tienes) ... */ };
export const setStoreName = async (name) => { /* ... (código que ya tienes) ... */ };
export const addProduct = async (productData) => { /* ... (código que ya tienes) ... */ };
export const updateProduct = async (productId, productData) => { /* ... (código que ya tienes) ... */ };
export const deleteProduct = async (productId) => { /* ... (código que ya tienes) ... */ };
export const updateStockAfterSale = async (itemsInCart) => { /* ... (código que ya tienes) ... */ };
export const recordSale = async (saleData) => { /* ... (código que ya tienes) ... */ };
export const uploadStoreLogo = async (file) => { /* ... (código que ya tienes) ... */ };