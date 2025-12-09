import { useState } from 'react'
import { FiMinus, FiPlus, FiCheck } from 'react-icons/fi'
import './Products.css'

const Products = ({ addToCart }) => {
    const products = [
        {
            id: 5,
            name: 'PAIN CURE Oil',
            description: '60ml Roll On - Pain-Relief Oil for external use. Natural ingredients for effective pain management.',
            images: [
                '/products/pain-cure-3.jpg',  // Front view (Pain Cure packaging) - FIRST
                '/products/pain-cure-ingredients.png',  // Ingredients composition (White BG)
                '/products/pain-cure-2.jpg'   // Back view with details
            ],
            image: '/products/pain-cure-3.jpg', // Main image for cart
            benefits: ['Reducing Joint Pain', 'Arthritis Relief', 'Muscle Pain Relief', 'Roll On Application'],
            mrp: 110,
            sizes: [
                { size: '60ml Roll On', price: 100 }
            ]
        },
        {
            id: 4,
            name: '4 Way Action',
            description: '200ml - A Herbal Liver, Enzyme, Antacid & Alkalizer Syrup. Get relief from Gastrouble in just 10 min.',
            images: [
                '/products/4-way-action-3.jpg',  // Front view (4 Way Action) - FIRST
                '/products/4-way-action-details.png',  // Side view with details (White BG)
                '/products/4-way-action-2.jpg'   // Ingredients composition
            ],
            image: '/products/4-way-action-3.jpg', // Main image for cart
            benefits: ['Relief from Gastrouble in 10 min', 'Liver Support', 'Enzyme & Antacid', 'Alkalizer'],
            mrp: 160,
            sizes: [
                { size: '200ml Syrup', price: 150 }
            ]
        },
        {
            id: 3,
            name: 'Zero Piles',
            description: '30 tablets - High quality natural herbal supplement for piles, constipation, and digestive health.',
            images: [
                '/products/zero-piles-3.jpg',  // Front view (Zero Piles) - FIRST
                '/products/zero-piles-1.jpg',  // Back view with details
                '/products/zero-piles-2.jpg'   // Ingredients view
            ],
            image: '/products/zero-piles-3.jpg', // Main image for cart
            benefits: ['Constipation Relief', 'Stops Bleeding', 'Reduce Pain', 'Remove Lumps'],
            mrp: 349,
            sizes: [
                { size: '30 Tablets', price: 299 }
            ]
        },
        {
            id: 1,
            name: 'Arogya Sanjivini - Diabet Fit',
            description: '90 tablets - Natural herbal supplement for diabetes management and immunity support.',
            images: [
                '/products/diabet-fit-3.jpg',  // Front view (Arogya Sanjivini) - FIRST
                '/products/diabet-fit-1.jpg',  // Side view with details
                '/products/diabet-fit-2.jpg'   // Back view with ingredients
            ],
            image: '/products/diabet-fit-3.jpg', // Main image for cart
            benefits: ['Diabetic Control', 'Immunity Booster', 'Good HBA1C Results', 'Herbal Supplement'],
            mrp: 645,
            sizes: [
                { size: '90 Tablets', price: 499 }
            ]
        },
        {
            id: 2,
            name: 'Arogya Vardhini',
            description: '90 tablets - Natural herbal supplement for joint pain relief, arthritis, and obesity management.',
            images: [
                '/products/vardhini-3.jpg',  // Front view (Arogya Vardhini) - FIRST
                '/products/vardhini-1.jpg',  // Side view with details
                '/products/vardhini-2.jpg'   // Back view with ingredients
            ],
            image: '/products/vardhini-3.jpg', // Main image for cart
            benefits: ['Reducing Joint Pains', 'Arthritis Relief', 'Obesity Management', 'Herbal Supplement'],
            mrp: 645,
            sizes: [
                { size: '90 Tablets', price: 499 }
            ]
        },
        {
            id: 6,
            name: 'Arogya Vardhini/Pain cure oil',
            description: 'COMBO PACK - Arogya Vardhini (90 tablets) + PAIN CURE Oil (60ml Roll On). Complete solution for joint pain, arthritis, and muscle pain relief.',
            images: [
                '/products/vardhini-3.jpg',  // Arogya Vardhini
                '/products/pain-cure-3.jpg'  // PAIN CURE Oil
            ],
            image: '/products/vardhini-3.jpg', // Main image for cart
            benefits: ['Complete Joint Pain Solution', 'Internal + External Relief', 'Arthritis Management', 'Combo Savings - Save ₹50!'],
            mrp: 599,
            sizes: [
                { size: 'Combo Pack (2 items)', price: 549 }
            ],
            isCombo: true
        }
    ]

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
