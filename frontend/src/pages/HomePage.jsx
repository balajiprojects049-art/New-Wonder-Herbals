import Hero from '../components/Hero'
import Benefits from '../components/Benefits'
import './HomePage.css'

const HomePage = () => {
    return (
        <div className="home-page">
            <Hero />
            <Benefits />

            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Discover Our Premium Herbal Products</h2>
                        <p>Explore our range of 100% organic, pure herbal powders crafted for your wellness</p>
                        <a href="/products" className="btn btn-primary">View All Products</a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage
