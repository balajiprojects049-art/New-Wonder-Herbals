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

            // Support multiple API shapes:
            // - Serverless `api/products` returns an array of rows
            // - Express backend returns { success,count,data }
            // - Postgres query may return { rows: [...] }
            const productsArray = Array.isArray(data)
                ? data
                : (data.data || data.rows || []);

            // Normalize snake_case/camelCase fields to frontend camelCase
            const formatted = productsArray.map(p => ({
                ...p,
                subCategory: p.subCategory ?? p.sub_category,
                isCombo: p.isCombo ?? p.is_combo
            }));

            setProducts(formatted || []);
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

    const updateProduct = async (productData) => {
        try {
            console.log("ProductContext: sending PUT request for", productData.id);
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

            const response = await fetch(`/api/products?id=${productData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("ProductContext: Update failed", errorText);
                throw new Error(errorText || 'Server error during update');
            }

            await fetchProducts();
            return { success: true };
        } catch (err) {
            console.error("ProductContext: Exception", err);
            return {
                success: false,
                error: err.name === 'AbortError' ? 'Request timed out (server took too long)' : err.message
            };
        }
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
