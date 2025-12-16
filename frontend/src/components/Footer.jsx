import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin, FiLock } from 'react-icons/fi'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-col">
                        <h3>New Wonder Herbals</h3>
                        <p>
                            Your trusted partner in natural wellness. We provide 100% organic
                            herbal products crafted from nature's finest ingredients.
                        </p>
                        <div className="social-links">
                            <a href="https://www.facebook.com/profile.php?id=61571986004432" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
                            <a href="https://www.instagram.com/new_wonder_herbals?igsh=MWZ5Y21zemJkaXN2dQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/policies">Policies</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Products</h4>
                        <ul>
                            <li><Link to="/products">Arogya Sanjivini - Diabet Fit</Link></li>
                            <li><Link to="/products">Arogya Vardhini</Link></li>
                            <li><Link to="/products">Zero Piles</Link></li>
                            <li><Link to="/products">4 Way Action</Link></li>
                            <li><Link to="/products">PAIN CURE Oil</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Contact Info</h4>
                        <ul className="contact-list">
                            <li>
                                <FiMapPin />
                                <span>5/120, Jamulamma Temple Street,<br />Dorasaniplli, Proddatur - 516360</span>
                            </li>
                            <li>
                                <FiPhone />
                                <a href="tel:+916301208219">+91 63012 08219</a>
                            </li>
                            <li>
                                <FiMail />
                                <a href="mailto:newwonderherbals@gmail.com">newwonderherbals@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        &copy; 2025 New Wonder Herbals. All rights reserved.
                    </p>
                    <p>Delivery: Within AP ₹100 | Outside AP ₹150</p>
                    <p><Link to="/admin" className="hidden-admin-letter">M</Link>ade with 💚 for your wellness</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
