import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi'
import './Header.css'

const Header = ({ cartCount, onCartClick }) => {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const closeMobileMenu = () => {
        setMobileMenuOpen(false)
    }

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container header-content">
                <NavLink to="/" className="logo" onClick={closeMobileMenu}>
                    <img src="/logo.jpeg" alt="New Wonder Herbals Logo" />
                    <span className="logo-text">
                        <span className="logo-main">NEW WONDER</span>
                        <span className="logo-sub">HERBALS</span>
                    </span>
                </NavLink>

                <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
                    <NavLink to="/" className="nav-link" onClick={closeMobileMenu}>Home</NavLink>
                    <NavLink to="/about" className="nav-link" onClick={closeMobileMenu}>About Us</NavLink>
                    <NavLink to="/products" className="nav-link" onClick={closeMobileMenu}>Products</NavLink>
                    <NavLink to="/contact" className="nav-link" onClick={closeMobileMenu}>Contact</NavLink>
                    <NavLink to="/policies" className="nav-link" onClick={closeMobileMenu}>Policies</NavLink>
                </nav>

                <div className="header-actions">
                    <button className="cart-btn" onClick={onCartClick}>
                        <FiShoppingCart size={24} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </button>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
