import { createContext, useState, useContext, useEffect } from 'react';
import { initialProducts } from '../data/initialProducts';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('website_products');
        return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    });

    useEffect(() => {
        localStorage.setItem('website_products', JSON.stringify(products));
    }, [products]);

    const addProduct = (newProduct) => {
        setProducts(prev => {
            const maxId = prev.reduce((max, p) => Math.max(max, p.id), 0);
            const productWithDefaults = {
                ...newProduct,
                id: maxId + 1,
                // Ensure compatibility with existing components if not provided
                benefits: newProduct.benefits || [],
                sizes: newProduct.sizes || [{ size: 'Standard', price: newProduct.price === 'Custom' ? 0 : 0 }],
                images: newProduct.images || [newProduct.image]
            };
            return [...prev, productWithDefaults];
        });
    };

    const updateProduct = (updatedProduct) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p));
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
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
