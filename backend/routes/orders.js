import express from 'express'

const router = express.Router()

// In-memory orders storage (in a real app, use a database)
let orders = []
let orderIdCounter = 1

// GET all orders
router.get('/', (req, res) => {
    try {
        res.json({
            success: true,
            count: orders.length,
            data: orders
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

// GET single order by ID
router.get('/:id', (req, res) => {
    try {
        const order = orders.find(o => o.id === parseInt(req.params.id))

        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            })
        }

        res.json({
            success: true,
            data: order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

// POST create new order
router.post('/', (req, res) => {
    try {
        const { customerName, email, phone, address, items, totalAmount } = req.body

        // Validation
        if (!customerName || !phone || !items || items.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Please provide all required fields'
            })
        }

        const newOrder = {
            id: orderIdCounter++,
            customerName,
            email: email || '',
            phone,
            address: address || '',
            items,
            totalAmount,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        orders.push(newOrder)

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: newOrder
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

// PUT update order status
router.put('/:id/status', (req, res) => {
    try {
        const { status } = req.body
        const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id))

        if (orderIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            })
        }

        orders[orderIndex].status = status
        orders[orderIndex].updatedAt = new Date().toISOString()

        res.json({
            success: true,
            message: 'Order status updated',
            data: orders[orderIndex]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

// DELETE order
router.delete('/:id', (req, res) => {
    try {
        const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id))

        if (orderIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            })
        }

        orders.splice(orderIndex, 1)

        res.json({
            success: true,
            message: 'Order deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

export default router
