import 'dotenv/config'
import express from 'express'
import { Pool } from 'pg'

const router = express.Router()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
})

// Initial products used for seeding
const initialProducts = [
    { id: 1, name: 'Arogya Sanjivini - Diabet Fit', category: 'Health', subCategory: 'Diabetes', description: '90 tablets - Natural herbal supplement for diabetes management and immunity support.', images: ['/products/diabet-fit-3.jpg', '/products/diabet-fit-2.jpg', '/products/diabet-fit-1.jpg'], image: '/products/diabet-fit-3.jpg', benefits: ['Diabetic Control', 'Immunity Booster', 'Good HBA1C Results', 'Herbal Supplement'], mrp: 645, sizes: [{ size: '90 Tablets', price: 499 }] },
    { id: 2, name: 'Arogya Vardhini', category: 'Health', subCategory: 'Joint Pain', description: '90 tablets - Natural herbal supplement for joint pain relief, arthritis, and obesity management.', images: ['/products/vardhini-3.jpg', '/products/vardhini-2.jpg', '/products/vardhini-1.jpg'], image: '/products/vardhini-3.jpg', benefits: ['Reducing Joint Pains', 'Arthritis Relief', 'Obesity Management', 'Herbal Supplement'], mrp: 645, sizes: [{ size: '90 Tablets', price: 499 }] },
    { id: 3, name: 'Zero Piles', category: 'Health', subCategory: 'Digestive', description: '30 tablets - High quality natural herbal supplement for piles, constipation, and digestive health.', images: ['/products/zero-piles-3.jpg', '/products/zero-piles-2.jpg', '/products/zero-piles-1.jpg'], image: '/products/zero-piles-3.jpg', benefits: ['Constipation Relief', 'Stops Bleeding', 'Reduce Pain', 'Remove Lumps'], mrp: 349, sizes: [{ size: '30 Tablets', price: 299 }] },
    { id: 4, name: '4 Way Action', category: 'Health', subCategory: 'Digestive', description: '200ml - A Herbal Liver, Enzyme, Antacid & Alkalizer Syrup. Get relief from Gastrouble in just 10 min.', images: ['/products/4-way-action-3.jpg', '/products/4-way-action-2.jpg', '/products/4-way-action-details.png'], image: '/products/4-way-action-3.jpg', benefits: ['Relief from Gastrouble in 10 min', 'Liver Support', 'Enzyme & Antacid', 'Alkalizer'], mrp: 160, sizes: [{ size: '200ml Syrup', price: 150 }] },
    { id: 5, name: 'PAIN CURE Oil', category: 'Pain Relief', subCategory: 'External', description: '60ml Roll On - Pain-Relief Oil for external use.', images: ['/products/pain-cure-3.jpg', '/products/pain-cure-ingredients.png', '/products/pain-cure-2.jpg'], image: '/products/pain-cure-3.jpg', benefits: ['Reducing Joint Pain', 'Arthritis Relief', 'Muscle Pain Relief', 'Roll On Application'], mrp: 110, sizes: [{ size: '60ml Roll On', price: 100 }] },
    { id: 6, name: 'Arogya Vardhini/Pain cure oil', category: 'Combos', subCategory: 'Pain Relief', description: 'COMBO PACK - Arogya Vardhini (90 tablets) + PAIN CURE Oil (60ml Roll On).', images: ['/products/vardhini-3.jpg', '/products/pain-cure-3.jpg'], image: '/products/vardhini-3.jpg', benefits: ['Complete Joint Pain Solution', 'Internal + External Relief', 'Arthritis Management', 'Combo Savings - Save ₹50!'], mrp: 599, sizes: [{ size: 'Combo Pack (2 items)', price: 549 }], isCombo: true }
]

// GET all products (returns plain array to match serverless API)
router.get('/', async (req, res) => {
    try {
        const client = await pool.connect()
        await client.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                category TEXT,
                sub_category TEXT,
                description TEXT,
                image TEXT,
                images TEXT[],
                benefits TEXT[],
                mrp NUMERIC,
                sizes JSONB,
                is_combo BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `)

        const result = await client.query('SELECT * FROM products ORDER BY id ASC')

        // If no rows, seed initialProducts
        if (result.rows.length === 0) {
            for (const p of initialProducts) {
                await client.query(
                    `INSERT INTO products (name, category, sub_category, description, image, images, benefits, mrp, sizes, is_combo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
                    [p.name, p.category, p.subCategory || p.sub_category, p.description, p.image, p.images, p.benefits, p.mrp, JSON.stringify(p.sizes), p.isCombo || false]
                )
            }
            const seeded = await client.query('SELECT * FROM products ORDER BY id ASC')
            client.release()
            return res.status(200).json(seeded.rows)
        }

        client.release()
        return res.status(200).json(result.rows)
    } catch (error) {
        console.error('Products GET Error:', error)
        return res.status(500).json({ error: error.message })
    }
})

// GET single product by ID
router.get('/:id', async (req, res) => {
    try {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM products WHERE id = $1', [req.params.id])
        client.release()

        if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' })
        return res.json(result.rows[0])
    } catch (error) {
        console.error('Products GET /:id Error:', error)
        return res.status(500).json({ error: error.message })
    }
})

// GET products by category
router.get('/category/:category', async (req, res) => {
    try {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM products WHERE LOWER(category) = LOWER($1) ORDER BY id ASC', [req.params.category])
        client.release()
        return res.json(result.rows)
    } catch (error) {
        console.error('Products category Error:', error)
        return res.status(500).json({ error: error.message })
    }
})

// POST - create product or perform actions like reset
router.post('/', async (req, res) => {
    try {
        const client = await pool.connect()
        const { action } = req.body || {}
        if (action === 'reset') {
            await client.query('TRUNCATE TABLE products RESTART IDENTITY')
            for (const p of initialProducts) {
                await client.query(
                    `INSERT INTO products (name, category, sub_category, description, image, images, benefits, mrp, sizes, is_combo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
                    [p.name, p.category, p.subCategory || p.sub_category, p.description, p.image, p.images, p.benefits, p.mrp, JSON.stringify(p.sizes), p.isCombo || false]
                )
            }
            client.release()
            return res.status(200).json({ success: true, message: 'Database reset' })
        }

        const { name, category, subCategory, description, image, images, benefits, mrp, sizes, isCombo } = req.body
        const result = await client.query(
            `INSERT INTO products (name, category, sub_category, description, image, images, benefits, mrp, sizes, is_combo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
            [name, category, subCategory, description, image, images, benefits, mrp, JSON.stringify(sizes), isCombo]
        )
        client.release()
        return res.status(201).json(result.rows[0])
    } catch (error) {
        console.error('Products POST Error:', error)
        return res.status(500).json({ error: error.message })
    }
})

// PUT - update product
router.put('/', async (req, res) => {
    try {
        const { id } = req.query
        if (!id) return res.status(400).json({ error: 'Missing id param' })

        const { name, category, subCategory, description, image, images, benefits, mrp, sizes, isCombo } = req.body

        const client = await pool.connect()
        const result = await client.query(
            `UPDATE products 
             SET name=$1, category=$2, sub_category=$3, description=$4, image=$5, images=$6, benefits=$7, mrp=$8, sizes=$9, is_combo=$10 
             WHERE id=$11 RETURNING *`,
            [name, category, subCategory || req.body.sub_category, description, image, images, benefits, mrp, JSON.stringify(sizes), isCombo, id]
        )
        client.release()

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' })
        }

        return res.json(result.rows[0])
    } catch (error) {
        console.error('Products PUT Error:', error)
        return res.status(500).json({ error: error.message })
    }
})

// DELETE - delete product by id (query param `id`)
router.delete('/', async (req, res) => {
    try {
        const { id } = req.query
        if (!id) return res.status(400).json({ error: 'Missing id' })
        const client = await pool.connect()
        await client.query('DELETE FROM products WHERE id = $1', [id])
        client.release()
        return res.json({ success: true })
    } catch (error) {
        console.error('Products DELETE Error:', error)
        return res.status(500).json({ error: error.message })
    }
})

export default router
