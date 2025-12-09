import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Cart from './components/Cart'
import WhatsAppButton from './components/WhatsAppButton'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PoliciesPage from './pages/PoliciesPage'
import './App.css'

function App() {
    const [cartItems, setCartItems] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            setCartItems(JSON.parse(savedCart))
        }
    }, [])

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (product) => {
        const existingItem = cartItems.find(
            item => item.id === product.id && item.selectedSize === product.selectedSize
        )

        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === product.id && item.selectedSize === product.selectedSize
                    ? { ...item, quantity: item.quantity + product.quantity }
                    : item
            ))
        } else {
            setCartItems([...cartItems, product])
        }
    }

    const removeFromCart = (productId, size) => {
        setCartItems(cartItems.filter(
            item => !(item.id === productId && item.selectedSize === size)
        ))
    }

    const updateQuantity = (productId, size, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId, size)
            return
        }
        setCartItems(cartItems.map(item =>
            item.id === productId && item.selectedSize === size
                ? { ...item, quantity: newQuantity }
                : item
        ))
    }

    const clearCart = () => {
        setCartItems([])
    }

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0)
    }

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const price = item.sizes.find(s => s.size === item.selectedSize)?.price || 0
            return total + (price * item.quantity)
        }, 0)
    }

    return (
        <Router>
            <div className="app">
                <Header
                    cartCount={getTotalItems()}
                    onCartClick={() => setIsCartOpen(true)}
                />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/products" element={<ProductsPage addToCart={addToCart} />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/policies" element={<PoliciesPage />} />
                    </Routes>
                </main>
                <Footer />
                <Cart
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    cartItems={cartItems}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                    clearCart={clearCart}
                    totalPrice={getTotalPrice()}
                />
                <WhatsAppButton />
            </div>
        </Router>
    )
}

export default App
