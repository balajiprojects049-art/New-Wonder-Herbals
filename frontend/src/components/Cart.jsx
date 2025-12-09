import { useState } from 'react'
import { FiX, FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import './Cart.css'

const Cart = ({ isOpen, onClose, cartItems, removeFromCart, updateQuantity, clearCart, totalPrice }) => {
    const [showCheckoutForm, setShowCheckoutForm] = useState(false)
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        phone: '',
        address: '',
        pincode: '',
        deliveryLocation: '' // 'AP' or 'OTHER'
    })
    const [formErrors, setFormErrors] = useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCustomerDetails(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const validateForm = () => {
        const errors = {}
        if (!customerDetails.name.trim()) {
            errors.name = 'Name is required'
        }
        if (!customerDetails.phone.trim()) {
            errors.phone = 'Phone number is required'
        } else if (!/^\d{10}$/.test(customerDetails.phone.trim())) {
            errors.phone = 'Please enter a valid 10-digit phone number'
        }
        if (!customerDetails.address.trim()) {
            errors.address = 'Address is required'
        }
        if (!customerDetails.pincode.trim()) {
            errors.pincode = 'Pincode is required'
        } else if (!/^\d{6}$/.test(customerDetails.pincode.trim())) {
            errors.pincode = 'Please enter a valid 6-digit pincode'
        }
        if (!customerDetails.deliveryLocation) {
            errors.deliveryLocation = 'Please select a delivery location'
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleFinalizeOrder = () => {
        if (cartItems.length === 0) return
        setShowCheckoutForm(true)
    }

    const handleConfirmAndSend = () => {
        if (!validateForm()) {
            return
        }

        const itemsList = cartItems.map(item => {
            const price = item.sizes.find(s => s.size === item.selectedSize)?.price || 0
            return `• ${item.name} (${item.selectedSize}) x ${item.quantity} = ₹${price * item.quantity}`
        }).join('\n')

        const shippingCharge = customerDetails.deliveryLocation === 'AP' ? 60 : 80
        const finalTotal = totalPrice + shippingCharge
        const deliveryText = customerDetails.deliveryLocation === 'AP' ? 'Andhra Pradesh (₹60)' : 'Other State (₹80)'

        const message = encodeURIComponent(
            `*New Order from Website*\n\n` +
            `*Customer Details:*\n` +
            `Name: ${customerDetails.name}\n` +
            `Phone: ${customerDetails.phone}\n` +
            `Address: ${customerDetails.address}\n` +
            `Pincode: ${customerDetails.pincode}\n\n` +
            `*Order Items:*\n${itemsList}\n\n` +
            `Subtotal: ₹${totalPrice}\n` +
            `Delivery Charges: ${deliveryText}\n` +
            `*Total Amount: ₹${finalTotal}*\n\n` +
            `Please confirm my order. Thank you!`
        )

        window.open(`https://wa.me/916301208219?text=${message}`, '_blank')

        // Reset form and close
        setShowCheckoutForm(false)
        setShowCheckoutForm(false)
        setCustomerDetails({ name: '', phone: '', address: '', pincode: '', deliveryLocation: '' })
        setFormErrors({})
        setFormErrors({})
    }

    const handleBackToCart = () => {
        setShowCheckoutForm(false)
        setFormErrors({})
    }

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
            <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>
                        <FiShoppingBag /> {showCheckoutForm ? 'Customer Details' : 'Shopping Cart'}
                    </h2>
                    <button className="close-btn" onClick={onClose}>
                        <FiX size={28} />
                    </button>
                </div>

                <div className="cart-body">
                    {!showCheckoutForm ? (
                        // Cart View
                        cartItems.length === 0 ? (
                            <div className="empty-cart">
                                <FiShoppingBag size={64} />
                                <h3>Your cart is empty</h3>
                                <p>Add some products to get started!</p>
                            </div>
                        ) : (
                            <>
                                <div className="cart-items">
                                    {cartItems.map((item, index) => {
                                        const price = item.sizes.find(s => s.size === item.selectedSize)?.price || 0
                                        return (
                                            <div key={index} className="cart-item">
                                                <img src={item.image} alt={item.name} />
                                                <div className="cart-item-details">
                                                    <h4>{item.name}</h4>
                                                    <p className="cart-item-size">Size: {item.selectedSize}</p>
                                                    <p className="cart-item-price">₹{price} each</p>

                                                    <div className="cart-item-quantity">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                                                            className="qty-btn"
                                                        >
                                                            <FiMinus />
                                                        </button>
                                                        <span>{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                                                            className="qty-btn"
                                                        >
                                                            <FiPlus />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="cart-item-actions">
                                                    <p className="cart-item-total">₹{price * item.quantity}</p>
                                                    <button
                                                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                                                        className="remove-btn"
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="cart-footer">
                                    <button className="clear-cart-btn" onClick={clearCart}>
                                        <FiTrash2 /> Clear Cart
                                    </button>

                                    <div className="cart-total">
                                        <span>Total:</span>
                                        <span className="total-amount">₹{totalPrice}</span>
                                    </div>

                                    <button className="checkout-btn" onClick={handleFinalizeOrder}>
                                        <FaWhatsapp size={24} />
                                        Finalize Order via WhatsApp
                                    </button>
                                </div>
                            </>
                        )
                    ) : (
                        // Checkout Form View
                        <div className="checkout-form">
                            <p className="form-description">
                                Please provide your details to complete the order
                            </p>

                            <div className="form-group">
                                <label htmlFor="name">
                                    Full Name <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={customerDetails.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className={formErrors.name ? 'error' : ''}
                                />
                                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">
                                    Phone Number <span className="required">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={customerDetails.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter 10-digit phone number"
                                    maxLength="10"
                                    className={formErrors.phone ? 'error' : ''}
                                />
                                {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">
                                    Full Address <span className="required">*</span>
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={customerDetails.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter your complete delivery address"
                                    rows="3"
                                    className={formErrors.address ? 'error' : ''}
                                />
                                {formErrors.address && <span className="error-message">{formErrors.address}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="pincode">
                                    Pincode <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="pincode"
                                    name="pincode"
                                    value={customerDetails.pincode}
                                    onChange={handleInputChange}
                                    placeholder="Enter 6-digit pincode"
                                    maxLength="6"
                                    className={formErrors.pincode ? 'error' : ''}
                                />
                                {formErrors.pincode && <span className="error-message">{formErrors.pincode}</span>}
                            </div>

                            <div className="form-group">
                                <label>
                                    Delivery Location <span className="required">*</span>
                                </label>
                                <div className="radio-group">
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="deliveryLocation"
                                            value="AP"
                                            checked={customerDetails.deliveryLocation === 'AP'}
                                            onChange={handleInputChange}
                                        />
                                        Andhra Pradesh (₹60)
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="deliveryLocation"
                                            value="OTHER"
                                            checked={customerDetails.deliveryLocation === 'OTHER'}
                                            onChange={handleInputChange}
                                        />
                                        Other State (₹80)
                                    </label>
                                </div>
                                {formErrors.deliveryLocation && <span className="error-message">{formErrors.deliveryLocation}</span>}
                            </div>

                            <div className="order-summary">
                                <h4>Order Summary</h4>
                                <div className="summary-items">
                                    {cartItems.map((item, index) => {
                                        const price = item.sizes.find(s => s.size === item.selectedSize)?.price || 0
                                        return (
                                            <div key={index} className="summary-item">
                                                <span>{item.name} ({item.selectedSize}) x {item.quantity}</span>
                                                <span>₹{price * item.quantity}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="summary-total">
                                    <div className="summary-row">
                                        <span>Subtotal:</span>
                                        <span>₹{totalPrice}</span>
                                    </div>
                                    {customerDetails.deliveryLocation && (
                                        <div className="summary-row delivery-charge">
                                            <span>Delivery ({customerDetails.deliveryLocation === 'AP' ? 'AP' : 'Other'}):</span>
                                            <span>₹{customerDetails.deliveryLocation === 'AP' ? 60 : 80}</span>
                                        </div>
                                    )}
                                    <div className="summary-row final-total">
                                        <span>Total Amount:</span>
                                        <span>
                                            ₹{totalPrice + (customerDetails.deliveryLocation === 'AP' ? 60 : (customerDetails.deliveryLocation === 'OTHER' ? 80 : 0))}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button className="btn-back" onClick={handleBackToCart}>
                                    Back to Cart
                                </button>
                                <button className="btn-confirm" onClick={handleConfirmAndSend}>
                                    <FaWhatsapp size={20} />
                                    Confirm & Send to WhatsApp
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Cart
