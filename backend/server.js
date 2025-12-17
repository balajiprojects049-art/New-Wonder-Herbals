import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import productsRouter from './routes/products.js'
import ordersRouter from './routes/orders.js'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/products', productsRouter)
app.use('/api/orders', ordersRouter)

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'New Wonder Herbals API is running',
        timestamp: new Date().toISOString()
    })
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    })
})

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, () => {
    console.log(`🌿 New Wonder Herbals Backend running on port ${PORT}`)
    console.log(`📡 API available at http://localhost:${PORT}/api`)
})