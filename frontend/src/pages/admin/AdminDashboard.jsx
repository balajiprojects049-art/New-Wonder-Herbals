import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../../context/ProductContext'
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiCheck, FiAlertTriangle, FiLogOut, FiDatabase } from 'react-icons/fi'
import './Admin.css'

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000)
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div className={`toast ${type}`}>
            <span className="toast-icon">
                {type === 'success' ? <FiCheck /> : <FiAlertTriangle />}
            </span>
            <span className="toast-message">{message}</span>
        </div>
    )
}

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null
    return (
        <div className="modal-overlay">
            <div className="modal-content confirm-content fade-in">
                <div className="confirm-icon">
                    <FiTrash2 />
                </div>
                <h3 className="modal-title mb-2">{title}</h3>
                <p className="confirm-message">{message}</p>
                <div className="confirm-actions">
                    <button className="btn-cancel" onClick={onCancel}>Cancel</button>
                    <button className="btn-danger" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    )
}

const AdminDashboard = () => {
    const { products, addProduct, updateProduct, deleteProduct, resetDatabase, loading, error } = useProducts()
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [toasts, setToasts] = useState([])
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, productId: null, productName: '' })

    // Auth Check
    useEffect(() => {
        const session = localStorage.getItem('admin_session')
        if (!session) navigate('/admin')
    }, [navigate])

    const showToast = (message, type = 'success') => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])
    }

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }

    const handleLogout = () => {
        localStorage.removeItem('admin_session')
        navigate('/admin')
    }

    const handleResetDatabase = async () => {
        if (window.confirm('⚠️ WARNING: This will DELETE ALL PRODUCTS and restore the original 6 products. Are you sure?')) {
            showToast('Resetting database...', 'info');
            const result = await resetDatabase();
            if (result.success) {
                showToast('Database reset successfully! All 6 products restored.', 'success');
            } else {
                showToast(result.error || 'Failed to reset database', 'error');
            }
        }
    }

    // Image Handling
    const processImage = (file) => {
        return new Promise((resolve, reject) => {
            if (!file) return resolve(null)

            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (event) => {
                const img = new Image()
                img.src = event.target.result
                img.onload = () => {
                    const canvas = document.createElement('canvas')
                    let width = img.width
                    let height = img.height

                    if (width > 800) {
                        height = height * (800 / width)
                        width = 800
                    }

                    canvas.width = width
                    canvas.height = height
                    const ctx = canvas.getContext('2d')
                    ctx.drawImage(img, 0, 0, width, height)

                    resolve(canvas.toDataURL('image/jpeg', 0.7))
                }
            }
            reader.onerror = error => reject(error)
        })
    }

    // Add Product Form State
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: 'Health',
        subCategory: '',
        description: '',
        images: [],  // Changed from single image to array
        benefits: '', // New field
        size: '',     // New field
        price: '',    // New field
        mrp: ''       // New field
    })

    const handleAddSubmit = async (e) => {
        e.preventDefault()
        if (!newProduct.name || !newProduct.description || newProduct.images.length === 0) {
            showToast('Please fill all required fields', 'error')
            return
        }

        try {
            const processedImages = await Promise.all(
                Array.from(newProduct.images).map(file => processImage(file))
            )

            const benefitsArray = newProduct.benefits.split('\n').filter(b => b.trim() !== '')
            const sizesArray = newProduct.size && newProduct.price ? [{
                size: newProduct.size,
                price: parseFloat(newProduct.price)
            }] : []

            const result = await addProduct({
                ...newProduct,
                images: processedImages,
                image: processedImages[0], // Primary image
                benefits: benefitsArray,
                sizes: sizesArray,
                mrp: newProduct.mrp ? parseFloat(newProduct.mrp) : null
            })

            if (result.success) {
                setIsAddModalOpen(false)
                setNewProduct({
                    name: '', category: 'Health', subCategory: '', description: '',
                    images: [], benefits: '', size: '', price: '', mrp: ''
                })
                showToast('Product added successfully to cloud database!')
            } else {
                showToast('Error adding product: ' + (result.error || 'Unknown error'), 'error')
            }
        } catch (error) {
            console.error(error)
            showToast('Error processing product: ' + error.message, 'error')
        }
    }

    // Edit Logic
    const [editForm, setEditForm] = useState({})

    const startEditing = (product) => {
        setEditingId(product.id)
        // Flatten complex structures for form editing
        setEditForm({
            ...product,
            newImageFiles: [],
            benefitsStr: product.benefits ? product.benefits.join('\n') : '',
            editSize: product.sizes?.[0]?.size || '',
            editPrice: product.sizes?.[0]?.price || '',
            editMrp: product.mrp || ''
        })
    }

    const handleEditSave = async () => {
        try {
            let imagesToSave = editForm.images || [editForm.image]

            if (editForm.newImageFiles && editForm.newImageFiles.length > 0) {
                const processedNewImages = await Promise.all(
                    Array.from(editForm.newImageFiles).map(file => processImage(file))
                )
                imagesToSave = [...imagesToSave, ...processedNewImages]
            }

            const benefitsArray = editForm.benefitsStr.split('\n').filter(b => b.trim() !== '')
            const sizesArray = editForm.editSize && editForm.editPrice ? [{
                size: editForm.editSize,
                price: parseFloat(editForm.editPrice)
            }] : []

            const result = await updateProduct({
                ...editForm,
                images: imagesToSave,
                image: imagesToSave[0],
                benefits: benefitsArray,
                sizes: sizesArray,
                mrp: editForm.editMrp ? parseFloat(editForm.editMrp) : null
            })

            if (result.success) {
                setEditingId(null)
                showToast('Product updated successfully in cloud database!')
            } else {
                showToast('Error updating product: ' + (result.error || 'Unknown error'), 'error')
            }
        } catch (error) {
            console.error(error)
            showToast('Error updating product: ' + error.message, 'error')
        }
    }

    // Filtered Products
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toString().includes(searchTerm)
    )

    // Dynamic Subcategories
    const getSubcategories = (category) => {
        const subs = {
            'Health': ['Diabetes', 'Joint Pain', 'Digestive', 'Immunity'],
            'Pain Relief': ['External', 'Internal'],
            'Combos': ['Pain Relief', 'General Health']
        }
        return subs[category] || []
    }

    return (
        <div className="admin-container fade-in">
            {/* Loading State */}
            {loading && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    zIndex: 9999
                }}>
                    <div style={{
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #10b981',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto'
                    }}></div>
                    <p style={{ marginTop: '1rem', color: '#666' }}>Loading products from cloud...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div style={{
                    background: '#fee',
                    color: '#c33',
                    padding: '1rem',
                    borderRadius: '8px',
                    margin: '1rem',
                    border: '1px solid #fcc'
                }}>
                    <strong>Error:</strong> {error}
                    <p style={{ fontSize: '0.9em', marginTop: '0.5rem' }}>
                        Falling back to local storage. Please check your Firebase configuration.
                    </p>
                </div>
            )}

            {/* Toasts */}
            <div className="toast-container">
                {toasts.map(toast => (
                    <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
                ))}
            </div>

            {/* Header */}
            <div className="admin-header">
                <h1 className="admin-title">Product Dashboard</h1>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button onClick={handleLogout} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FiLogOut /> Logout
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="dashboard-controls">
                <div className="search-bar">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="add-btn" style={{ background: '#ef4444' }} onClick={handleResetDatabase}>
                        <FiDatabase style={{ marginRight: '5px' }} /> Reset DB
                    </button>
                    <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>
                        <FiPlus /> Add New Product
                    </button>
                </div>
            </div>

            {/* Product Grid */}
            <div className="product-grid">
                {filteredProducts.map(product => (
                    <div key={product.id} className="admin-product-card">
                        {editingId === product.id ? (
                            <div className="card-content edit-form">
                                {/* Edit Mode */}
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        className="form-input"
                                        value={editForm.name}
                                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <select
                                        className="form-select"
                                        value={editForm.category}
                                        onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                                    >
                                        <option value="Health">Health</option>
                                        <option value="Pain Relief">Pain Relief</option>
                                        <option value="Combos">Combos</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Subcategory</label>
                                    <select
                                        className="form-select"
                                        value={editForm.subCategory}
                                        onChange={e => setEditForm({ ...editForm, subCategory: e.target.value })}
                                    >
                                        <option value="">Select Subcategory</option>
                                        {getSubcategories(editForm.category).map(sub => (
                                            <option key={sub} value={sub}>{sub}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <label>Size</label>
                                        <input className="form-input" value={editForm.editSize} onChange={e => setEditForm({ ...editForm, editSize: e.target.value })} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label>Price (₹)</label>
                                        <input type="number" className="form-input" value={editForm.editPrice} onChange={e => setEditForm({ ...editForm, editPrice: e.target.value })} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label>MRP (₹)</label>
                                        <input type="number" className="form-input" value={editForm.editMrp} onChange={e => setEditForm({ ...editForm, editMrp: e.target.value })} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Benefits (One per line)</label>
                                    <textarea
                                        className="form-textarea"
                                        style={{ height: '100px' }}
                                        value={editForm.benefitsStr}
                                        onChange={e => setEditForm({ ...editForm, benefitsStr: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Add More Images (Optional)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="file-input"
                                        onChange={e => setEditForm({ ...editForm, newImageFiles: e.target.files })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        className="form-textarea"
                                        value={editForm.description}
                                        onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                    />
                                </div>
                                <div className="edit-actions">
                                    <button className="btn-cancel" onClick={() => setEditingId(null)}>Cancel</button>
                                    <button className="btn-save" onClick={handleEditSave}><FiSave /> Save</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* View Mode */}
                                <img src={product.image} alt={product.name} className="card-image" />
                                <div className="card-content">
                                    <div className="card-header">
                                        <h3 className="card-title">{product.name}</h3>
                                        <span className="card-badge">{product.category}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-2">{product.subCategory}</p>
                                    <p className="card-desc mb-2"><strong>Price:</strong> ₹{product.sizes?.[0]?.price} {product.mrp && <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.9em' }}>₹{product.mrp}</span>}</p>
                                    <p className="card-desc">{product.description}</p>
                                    <div className="card-actions">
                                        <button className="btn-edit" onClick={() => startEditing(product)}>
                                            <FiEdit2 /> Edit
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => setDeleteModal({ isOpen: true, productId: product.id, productName: product.name })}
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content fade-in">
                        <div className="modal-header">
                            <h2 className="modal-title">Add New Product</h2>
                            <button className="close-btn" onClick={() => setIsAddModalOpen(false)}><FiX /></button>
                        </div>
                        <form onSubmit={handleAddSubmit} className="edit-form">
                            <div className="form-group">
                                <label>Product Name <span className="text-red-500">*</span></label>
                                <input
                                    required
                                    className="form-input"
                                    value={newProduct.name}
                                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    className="form-select"
                                    value={newProduct.category}
                                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                                >
                                    <option value="Health">Health</option>
                                    <option value="Pain Relief">Pain Relief</option>
                                    <option value="Combos">Combos</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Subcategory</label>
                                <select
                                    className="form-select"
                                    value={newProduct.subCategory}
                                    onChange={e => setNewProduct({ ...newProduct, subCategory: e.target.value })}
                                >
                                    <option value="">Select Subcategory</option>
                                    {getSubcategories(newProduct.category).map(sub => (
                                        <option key={sub} value={sub}>{sub}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label>Size (e.g., 90 Digits)</label>
                                    <input
                                        required
                                        className="form-input"
                                        value={newProduct.size}
                                        onChange={e => setNewProduct({ ...newProduct, size: e.target.value })}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label>Price (₹) <span className="text-red-500">*</span></label>
                                    <input
                                        required
                                        type="number"
                                        className="form-input"
                                        value={newProduct.price}
                                        onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label>MRP (₹)</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={newProduct.mrp}
                                        onChange={e => setNewProduct({ ...newProduct, mrp: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Benefits (One per line)</label>
                                <textarea
                                    className="form-textarea"
                                    placeholder="e.g.&#10;Immunity Booster&#10;Digestive Health"
                                    style={{ height: '80px' }}
                                    value={newProduct.benefits}
                                    onChange={e => setNewProduct({ ...newProduct, benefits: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Product Images (Select 3-4 items) <span className="text-red-500">*</span></label>
                                <input
                                    required
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="file-input"
                                    onChange={e => setNewProduct({ ...newProduct, images: e.target.files })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description <span className="text-red-500">*</span></label>
                                <textarea
                                    required
                                    className="form-textarea"
                                    value={newProduct.description}
                                    onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                                />
                            </div>
                            <div className="edit-actions">
                                <button type="button" className="btn-cancel" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-save">Add Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            <ConfirmModal
                isOpen={deleteModal.isOpen}
                title="Delete Product"
                message={`Are you sure you want to delete '${deleteModal.productName}'? This action cannot be undone.`}
                onCancel={() => setDeleteModal({ isOpen: false, productId: null, productName: '' })}
                onConfirm={async () => {
                    const result = await deleteProduct(deleteModal.productId)
                    setDeleteModal({ isOpen: false, productId: null, productName: '' })

                    if (result.success) {
                        showToast('Product deleted successfully from cloud database!')
                    } else {
                        showToast('Error deleting product: ' + (result.error || 'Unknown error'), 'error')
                    }
                }}
            />
        </div>
    )
}

export default AdminDashboard
