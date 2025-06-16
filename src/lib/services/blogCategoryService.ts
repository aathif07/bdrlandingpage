import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  getDoc, 
  updateDoc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface BlogCategory {
  id: string;
  name: string;
  description?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

const COLLECTION_NAME = 'blogCategories';

export const createBlogCategory = async (categoryData: Omit<BlogCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...categoryData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating blog category:', error);
    throw error;
  }
};

export const getBlogCategories = async (): Promise<BlogCategory[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('name', 'asc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as BlogCategory[];
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    throw error;
  }
};

export const getBlogCategory = async (id: string): Promise<BlogCategory | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as BlogCategory;
  } catch (error) {
    console.error('Error fetching blog category:', error);
    throw error;
  }
};

export const updateBlogCategory = async (id: string, categoryData: Partial<Omit<BlogCategory, 'id' | 'createdAt'>>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...categoryData,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating blog category:', error);
    throw error;
  }
};

export const deleteBlogCategory = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Error deleting blog category:', error);
    throw error;
  }
};