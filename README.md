# New Wonder Herbals - E-commerce Website

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://react.dev/)
[![Node](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-brightgreen.svg)](https://expressjs.com/)
[![Firebase](https://img.shields.io/badge/Firebase-10+-orange.svg)](https://firebase.google.com/)

A premium full-stack e-commerce website for New Wonder Herbals, featuring organic herbal products with a modern, responsive design built using React.js, Node.js, and Firebase Firestore.

---

## 🔥 **IMPORTANT: Admin Panel Upgraded to Cloud Database!**

**Latest Update (Dec 16, 2025):** The admin panel has been upgraded from localStorage to **Firebase Firestore** cloud database!

### **What This Means:**
- ✅ **Real-time sync** - Changes appear instantly across all devices
- ✅ **Cloud storage** - Products saved permanently, never lost
- ✅ **Multi-device support** - Edit from laptop, phone, or tablet
- ✅ **Production-ready** - Professional database system
- ✅ **100% FREE** - Generous Firebase free tier

### **Setup Required:**
- 📖 **Read:** [`FIREBASE_SETUP.md`](FIREBASE_SETUP.md) - Complete 15-minute setup guide
- 📊 **Summary:** [`CLIENT_SUMMARY.md`](CLIENT_SUMMARY.md) - Overview of changes
- ⚡ **Quick Start:** [`QUICKSTART_FIREBASE.md`](QUICKSTART_FIREBASE.md) - Get started fast

**Note:** System works with localStorage fallback until Firebase is configured.

---

## Admin Panel Features
- ✅ **Hidden Admin Access** - Password-protected dashboard  
- ✅ **Cloud Database** - Firebase Firestore integration
- ✅ **Real-time Sync** - Changes appear instantly across devices
- ✅ **Full CRUD** - Add, edit, delete products with images
- ✅ **Image Handling** - Multiple images per product, auto-compression
- ✅ **Rich Product Data** - Benefits, sizes, pricing, MRP
- ✅ **Loading States** - Professional UX with spinners and error handling
- ✅ **Toast Notifications** - Success/error feedback

## 🌿 Features

### Frontend
- ✅ **Modern React SPA** - Built with Vite for blazing-fast development
- ✅ **Responsive Design** - Mobile-first approach with beautiful UI
- ✅ **Shopping Cart** - Full cart functionality with localStorage persistence
- ✅ **Product Catalog** - Dynamic product listings with size & quantity selection
- ✅ **WhatsApp Integration** - Direct checkout via WhatsApp
- ✅ **Smooth Animations** - CSS animations and transitions throughout
- ✅ **SEO Optimized** - Meta tags and semantic HTML

### Backend
- ✅ **RESTful API** - Express.js backend with organized routes
- ✅ **Products API** - GET endpoints for products and categories
- ✅ **Orders API** - Full CRUD operations for order management
- ✅ **CORS Enabled** - Cross-origin resource sharing configured
- ✅ **Error Handling** - Comprehensive error handling middleware

## 🎨 Design

The website features a premium design with:
- **Primary Colors**: Forest Green (#2d7a1f) and Black (#000000) from the logo
- **Modern Typography**: Playfair Display for headings, Inter for body text
- **Glassmorphism Effects**: Modern UI elements with backdrop blur
- **Smooth Animations**: Fade-ins, slides, and hover effects
- **Micro-interactions**: Enhanced user engagement

## 📦 Project Structure

```
new wonder herbal/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Benefits.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Policies.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── WhatsAppButton.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/               # Node.js/Express backend
    ├── routes/
    │   ├── products.js   # Products API routes
    │   └── orders.js     # Orders API routes
    ├── server.js         # Express server
    ├── .env              # Environment variables
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm installed
- PowerShell execution policy configured (for Windows)

### Installation

#### 1. Frontend Setup

```powershell
# Navigate to frontend directory
cd "c:\Users\hp\OneDrive\Desktop\staffarc\new wonder herbal\frontend"

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on **http://localhost:3000**

#### 2. Backend Setup

```powershell
# Open a new terminal and navigate to backend directory
cd "c:\Users\hp\OneDrive\Desktop\staffarc\new wonder herbal\backend"

# Install dependencies
npm install

# Start backend server
npm run dev
```

The backend API will run on **http://localhost:5000**

## 🔧 Configuration

### Frontend Configuration
- **Vite Dev Server**: Port 3000
- **API Proxy**: Configured to proxy `/api` requests to backend (http://localhost:5000)

### Backend Configuration
- **Port**: 5000 (configurable in `.env`)
- **CORS**: Enabled for frontend origin

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order

### Health Check
- `GET /api/health` - Check API status

## 🛒 E-commerce Features

### Shopping Cart
- Add products with size and quantity selection
- Update quantities in cart
- Remove items from cart
- Persistent cart using localStorage
- Real-time total calculation

### Checkout
- WhatsApp integration for order placement
- Pre-formatted order message
- Direct communication with business

## 📱 WhatsApp Integration

The website includes WhatsApp integration in multiple places:
1. **Floating WhatsApp Button** - Always accessible for customer support
2. **Contact Section** - Direct chat button
3. **Cart Checkout** - Order placement via WhatsApp

**WhatsApp Number**: +91 98765 43210 (Update this in the code as needed)

## 🎯 Pages & Sections

1. **Home/Hero** - Eye-catching hero section with CTA buttons
2. **Benefits** - Key product benefits with icon cards
3. **Products** - Full product catalog with e-commerce functionality
4. **About** - Company story and values
5. **Contact** - Contact information and WhatsApp integration
6. **Policies** - Privacy policy, terms, shipping, and return policies
7. **Footer** - Links, contact info, and social media

## 🎨 Customization

### Update Colors
Edit `frontend/src/index.css` and modify CSS variables:
```css
:root {
  --primary-green: #2d7a1f;
  --primary-green-dark: #1f5a15;
  /* ... other colors */
}
```

### Update Products
Edit `frontend/src/components/Products.jsx` or connect to backend API

### Update Contact Info
Search for contact information in:
- `Contact.jsx`
- `WhatsAppButton.jsx`
- `Cart.jsx`
- `Footer.jsx`

## 📦 Build for Production

### Frontend
```powershell
cd frontend
npm run build
```
Build output will be in `frontend/dist/`

### Backend
The backend is production-ready. Use a process manager like PM2:
```powershell
npm install -g pm2
pm2 start backend/server.js --name wonder-herbals-api
```

## 🌐 Deployment

### Frontend Options
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Backend Options
- Heroku
- Railway
- DigitalOcean
- AWS EC2

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
```

## 🔒 Security Notes

For production:
1. Add authentication for admin routes
2. Implement rate limiting
3. Add input validation and sanitization
4. Use HTTPS
5. Set up proper CORS origins
6. Use environment variables for sensitive data

## 🤝 Contributing

This is a custom project for New Wonder Herbals. For modifications or improvements, contact the development team.

## 📄 License

Proprietary - All rights reserved by New Wonder Herbals

## 📞 Support

For technical support or inquiries:
- Email: info@newwonderherbals.com
- Phone: +91 98765 43210
- WhatsApp: +91 98765 43210

---

**Built with 💚 for New Wonder Herbals**
