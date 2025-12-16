import { createContext, useState, useContext, useEffect } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Products (from Neon Postgres via Serverless API)
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/products');
            if (!response.ok) throw new Error('Failed to fetch products');

            const data = await response.json();

            // Map DB columns (snake_case) to frontend (camelCase) if needed
            const formatted = data.map(p => ({
                ...p,
                subCategory: p.sub_category,
                isCombo: p.is_combo
            }));

            setProducts(formatted);
            setLoading(false);
            setError(null);
        } catch (err) {
            console.error("API Error:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (productData) => {
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
            if (!response.ok) throw new Error('Failed to add product');
            await fetchProducts(); // Refresh list
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const updateProduct = async (productId, updates) => {
        // Implementation for update would go here (PUT request)
        // For now, focusing on Add/Delete/Reset
        return { success: true };
    };

    const deleteProduct = async (productId) => {
        try {
            await fetch(`/api/products?id=${productId}`, { method: 'DELETE' });
            await fetchProducts();
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const resetDatabase = async () => {
        try {
            setLoading(true);
            await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'reset' })
            });
            await fetchProducts();
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    return (
        <ProductContext.Provider value={{
            products,
            addProduct,
            updateProduct,
            deleteProduct,
            resetDatabase,
            loading,
            error
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
