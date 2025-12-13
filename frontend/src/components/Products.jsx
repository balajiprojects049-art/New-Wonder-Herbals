import { useProducts } from '../context/ProductContext'
import { useState } from 'react'
import { FiMinus, FiPlus, FiCheck } from 'react-icons/fi'
import './Products.css'

const Products = ({ addToCart }) => {
    const { products } = useProducts()

    const ProductCard = ({ product }) => {
        const [selectedSize, setSelectedSize] = useState(product.sizes[0].size)
        const [quantity, setQuantity] = useState(1)
        const [added, setAdded] = useState(false)
        const [currentImageIndex, setCurrentImageIndex] = useState(0)

        const handleAddToCart = () => {
            addToCart({
                ...product,
                selectedSize,
                quantity
            })
            setAdded(true)
            setTimeout(() => setAdded(false), 2000)
        }

        const currentPrice = product.sizes.find(s => s.size === selectedSize)?.price || 0

        const productImages = product.images || [product.image]

        const nextImage = () => {
            setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
        }

        const prevImage = () => {
            setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
        }

        return (
            <div className="product-card card">
                <div className="product-image">
                    <img src={productImages[currentImageIndex]} alt={product.name} />
                    {productImages.length > 1 && (
                        <>
                            <button className="image-nav prev" onClick={prevImage}>‹</button>
                            <button className="image-nav next" onClick={nextImage}>›</button>
                            <div className="image-dots">
                                {productImages.map((_, index) => (
                                    <span
                                        key={index}
                                        className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                    <div className="product-badge">100% Organic</div>
                </div>

                <div className="product-content">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>

                    <div className="product-benefits">
                        <h4>Key Benefits:</h4>
                        <ul>
                            {product.benefits.map((benefit, index) => (
                                <li key={index}>
                                    <FiCheck className="check-icon" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="product-options">
                        <div className="size-selector">
                            <label>Select Size:</label>
                            <div className="size-buttons">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size.size}
                                        className={`size-btn ${selectedSize === size.size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size.size)}
                                    >
                                        <span className="size">{size.size}</span>
                                        <div className="price-container">
                                            {product.mrp && (
                                                <span className="mrp">₹{product.mrp}</span>
                                            )}
                                            <span className="price">₹{size.price}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="quantity-selector">
                            <label>Quantity:</label>
                            <div className="quantity-controls">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="qty-btn"
                                >
                                    <FiMinus />
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    min="1"
                                    className="qty-input"
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="qty-btn"
                                >
                                    <FiPlus />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="product-footer">
                        <div className="product-total">
                            <span className="total-label">Total:</span>
                            <span className="total-price">₹{currentPrice * quantity}</span>
                        </div>
                        <button
                            className={`btn btn-primary add-to-cart-btn ${added ? 'added' : ''}`}
                            onClick={handleAddToCart}
                        >
                            {added ? (
                                <>
                                    <FiCheck /> Added!
                                </>
                            ) : (
                                'Add to Cart'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section id="products" className="products section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="fade-in">Our Premium Products</h2>
                    <p className="fade-in">Handpicked organic herbal powders for your wellness journey</p>
                </div>

                <div className="products-grid">
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Products
