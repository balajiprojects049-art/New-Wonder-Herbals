import { createContext, useState, useContext, useEffect } from 'react';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { initialProducts } from '../data/initialProducts';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const productsCollectionRef = collection(db, 'products');

    // Real-time listener for products from Firestore
    useEffect(() => {
        setLoading(true);

        // Set a timeout to fallback if Firebase takes too long (not configured)
        const loadingTimeout = setTimeout(() => {
            console.warn('⚠️ Firebase not configured - loading initial products');
            setProducts(initialProducts);
            setLoading(false);
            setError('Firebase not configured. Using initial products. Please setup Firebase.');
        }, 10000); // 10 second timeout

        const q = query(productsCollectionRef, orderBy('id', 'asc'));

        // Subscribe to real-time updates
        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                clearTimeout(loadingTimeout); // Clear timeout if Firebase responds

                const productsData = snapshot.docs.map(doc => ({
                    firestoreId: doc.id, // Keep Firestore document ID
                    ...doc.data()
                }));

                // If database is empty, initialize with initial products
                if (productsData.length === 0) {
                    console.log('📦 Database empty - seeding initial products...');
                    initializeProducts();
                } else {
                    console.log(`✅ Loaded ${productsData.length} products from Firebase`);
                    setProducts(productsData);
                }

                setLoading(false);
                setError(null);
            },
            (err) => {
                clearTimeout(loadingTimeout); // Clear timeout on error
                console.error("❌ Firebase error:", err);
                setError(err.message);

                // Fallback to initial products if Firebase fails
                console.warn('⚠️ Firebase error - using initial products');
                setProducts(initialProducts);
                setLoading(false);
            }
        );

        // Cleanup subscription on unmount
        return () => {
            unsubscribe();
            clearTimeout(loadingTimeout);
        };
    }, []);

    // Initialize database with initial products
    const initializeProducts = async () => {
        try {
            for (const product of initialProducts) {
                await addDoc(productsCollectionRef, {
                    ...product,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            }
            console.log("✅ Database initialized with initial products");
            // Products will be loaded by the real-time listener automatically
        } catch (err) {
            console.error("❌ Error initializing products:", err);
            setError(err.message);
            // Fallback to initial products in state
            setProducts(initialProducts);
        }
    };

    const addProduct = async (newProduct) => {
        try {
            // Calculate next ID
            const maxId = products.reduce((max, p) => Math.max(max, p.id || 0), 0);

            const productWithDefaults = {
                ...newProduct,
                id: maxId + 1,
                benefits: newProduct.benefits || [],
                sizes: newProduct.sizes || [{ size: 'Standard', price: 0 }],
                images: newProduct.images || [newProduct.image],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            // Add to Firestore (will trigger real-time update)
            await addDoc(productsCollectionRef, productWithDefaults);

            console.log(`✅ Product added to Firebase: ${newProduct.name}`);
            return { success: true };
        } catch (err) {
            console.error("❌ Error adding product:", err);
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    const updateProduct = async (updatedProduct) => {
        try {
            if (!updatedProduct.firestoreId) {
                throw new Error("Product Firestore ID is missing");
            }

            const productDoc = doc(db, 'products', updatedProduct.firestoreId);

            // Remove firestoreId from the update data
            const { firestoreId, ...updateData } = updatedProduct;

            await updateDoc(productDoc, {
                ...updateData,
                updatedAt: new Date().toISOString()
            });

            console.log(`✅ Product updated in Firebase: ${updatedProduct.name}`);
            return { success: true };
        } catch (err) {
            console.error("❌ Error updating product:", err);
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    const deleteProduct = async (productId) => {
        try {
            // Find product by ID to get Firestore document ID
            const product = products.find(p => p.id === productId);

            if (!product || !product.firestoreId) {
                throw new Error("Product not found");
            }

            const productDoc = doc(db, 'products', product.firestoreId);
            await deleteDoc(productDoc);

            console.log(`✅ Product deleted from Firebase: ${product.name}`);
            return { success: true };
        } catch (err) {
            console.error("❌ Error deleting product:", err);
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    return (
        <ProductContext.Provider value={{
            products,
            addProduct,
            updateProduct,
            deleteProduct,
            loading,
            error
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};
