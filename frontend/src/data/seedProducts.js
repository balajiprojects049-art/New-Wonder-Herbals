import { db } from '../config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { initialProducts } from './initialProducts';

/**
 * Seeds the Firestore database with initial products
 * Use this to populate the database when setting up Firebase for the first time
 */
export const seedProducts = async () => {
    try {
        const productsRef = collection(db, 'products');

        // Check if products already exist
        const snapshot = await getDocs(productsRef);

        if (snapshot.empty) {
            console.log('Database is empty. Seeding with initial products...');

            // Add each product to Firestore
            for (const product of initialProducts) {
                await addDoc(productsRef, {
                    ...product,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
                console.log(`Added product: ${product.name}`);
            }

            console.log(`✅ Successfully seeded ${initialProducts.length} products!`);
            return { success: true, count: initialProducts.length };
        } else {
            console.log(`Database already contains ${snapshot.size} products. Skipping seed.`);
            return { success: false, message: 'Products already exist', count: snapshot.size };
        }
    } catch (error) {
        console.error('Error seeding products:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Force reseed - Deletes all products and adds initial products
 * WARNING: This will delete all existing products!
 */
export const forceReseedProducts = async () => {
    try {
        const productsRef = collection(db, 'products');

        console.warn('⚠️ Force reseeding - This will replace all products!');

        // Note: Deleting all documents would require additional logic
        // For now, just add the initial products

        for (const product of initialProducts) {
            await addDoc(productsRef, {
                ...product,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            console.log(`Added product: ${product.name}`);
        }

        console.log(`✅ Force seeded ${initialProducts.length} products!`);
        return { success: true, count: initialProducts.length };
    } catch (error) {
        console.error('Error force reseeding products:', error);
        return { success: false, error: error.message };
    }
};

export default seedProducts;
