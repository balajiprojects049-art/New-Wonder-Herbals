import { Link } from 'react-router-dom'
import { FiArrowDown } from 'react-icons/fi'
import './Hero.css'

const Hero = () => {
    const scrollToNextSection = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        })
    }

    return (
        <section id="home" className="hero">
            <div className="hero-background"></div>
            <div className="container hero-content">
                <div className="hero-text fade-in">
                    <h1 className="hero-title">
                        Nourish Your Body with
                        <span className="text-gradient"> Pure Nature</span>
                    </h1>
                    <h2 className="hero-subtitle-large">Nature's Gift for your Wellness</h2>
                    <div className="hero-buttons">
                        <Link to="/products" className="btn btn-primary">
                            Explore Products
                        </Link>
                        <Link to="/about" className="btn btn-outline">
                            Learn More
                        </Link>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <h3>100%</h3>
                            <p>Natural & Organic</p>
                        </div>
                        <div className="stat-item">
                            <h3>500+</h3>
                            <p>Happy Customers</p>
                        </div>
                        <div className="stat-item">
                            <h3>6</h3>
                            <p>Premium Products</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="scroll-indicator" onClick={scrollToNextSection}>
                <FiArrowDown className="scroll-icon" />
            </div>
        </section>
    )
}

export default Hero
