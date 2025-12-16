import Products from '../components/Products'
import './ProductsPage.css'

const ProductsPage = ({ addToCart }) => {
    return (
        <div className="products-page">
            <div className="page-header">
                <div className="container">
                    <h1>Our Premium Products</h1>
                    <p>Discover our range of 100% organic herbal medicines</p>
                </div>
            </div>
            <Products addToCart={addToCart} />
        </div>
    )
}

export default ProductsPage
