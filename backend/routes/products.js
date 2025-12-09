import express from 'express'

const router = express.Router()

// Products data (in a real app, this would be from a database)
const products = [
    {
        id: 1,
        name: 'Organic Moringa Powder',
        description: 'Pure moringa leaf powder packed with essential nutrients, vitamins, and antioxidants for overall wellness.',
        image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400&h=400&fit=crop',
        category: 'Superfoods',
        benefits: ['High in Vitamin C', 'Boosts Energy', 'Anti-inflammatory', 'Rich in Antioxidants'],
        sizes: [
            { size: '250g', price: 299, stock: 50 },
            { size: '500g', price: 549, stock: 30 }
        ],
        rating: 4.8,
        reviews: 124
    },
    {
        id: 2,
        name: 'Organic Beetroot Powder',
        description: 'Premium beetroot powder rich in iron, vitamins, and minerals to support heart health and stamina.',
        image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4baa?w=400&h=400&fit=crop',
        category: 'Vegetables',
        benefits: ['Improves Blood Flow', 'Increases Stamina', 'Rich in Iron', 'Supports Heart Health'],
        sizes: [
            { size: '250g', price: 249, stock: 60 },
            { size: '500g', price: 449, stock: 40 }
        ],
        rating: 4.7,
        reviews: 98
    },
    {
        id: 3,
        name: 'Organic Banana Powder',
        description: 'Natural banana powder loaded with potassium and dietary fiber for digestive health and energy.',
        image: 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=400&h=400&fit=crop',
        category: 'Fruits',
        benefits: ['High in Potassium', 'Aids Digestion', 'Natural Energy', 'Rich in Fiber'],
        sizes: [
            { size: '250g', price: 199, stock: 70 },
            { size: '500g', price: 349, stock: 50 }
        ],
        rating: 4.6,
        reviews: 87
    },
    {
        id: 4,
        name: 'Organic Turmeric Powder',
        description: 'Pure turmeric powder with curcumin to boost immunity and provide natural anti-inflammatory benefits.',
        image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=400&fit=crop',
        category: 'Spices',
        benefits: ['Anti-inflammatory', 'Boosts Immunity', 'Antioxidant Rich', 'Natural Healer'],
        sizes: [
            { size: '250g', price: 179, stock: 80 },
            { size: '500g', price: 319, stock: 60 }
        ],
        rating: 4.9,
        reviews: 156
    },
    {
        id: 5,
        name: 'Organic Amla Powder',
        description: 'Vitamin C rich amla powder to enhance immunity, promote hair growth, and improve skin health.',
        image: 'https://images.unsplash.com/photo-1571771022147-e48a29746c0f?w=400&h=400&fit=crop',
        category: 'Fruits',
        benefits: ['Rich in Vitamin C', 'Promotes Hair Growth', 'Improves Digestion', 'Enhances Immunity'],
        sizes: [
            { size: '250g', price: 229, stock: 55 },
            { size: '500g', price: 399, stock: 35 }
        ],
        rating: 4.7,
        reviews: 112
    },
    {
        id: 6,
        name: 'Organic Spirulina Powder',
        description: 'Nutrient-dense spirulina powder with complete protein profile and essential amino acids.',
        image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop',
        category: 'Superfoods',
        benefits: ['Complete Protein', 'Detoxifies Body', 'Boosts Energy', 'Rich in B Vitamins'],
        sizes: [
            { size: '250g', price: 399, stock: 45 },
            { size: '500g', price: 749, stock: 25 }
        ],
        rating: 4.8,
        reviews: 93
    }
]

// GET all products
router.get('/', (req, res) => {
    try {
        res.json({
            success: true,
            count: products.length,
            data: products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

// GET single product by ID
router.get('/:id', (req, res) => {
    try {
        const product = products.find(p => p.id === parseInt(req.params.id))

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            })
        }

        res.json({
            success: true,
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

// GET products by category
router.get('/category/:category', (req, res) => {
    try {
        const categoryProducts = products.filter(
            p => p.category.toLowerCase() === req.params.category.toLowerCase()
        )

        res.json({
            success: true,
            count: categoryProducts.length,
            data: categoryProducts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

export default router
