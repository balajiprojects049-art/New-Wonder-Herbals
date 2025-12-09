# 🌿 NEW WONDER HERBALS - Quick Start Guide

## ⚡ Quick Start (3 Steps)

### Step 1: Install Dependencies
Run this command in the project root:
```powershell
.\setup.ps1
```

OR manually install:
```powershell
# Install Frontend dependencies
cd frontend
npm install

# Install Backend dependencies  
cd ../backend
npm install
```

### Step 2: Start Backend Server
Open a PowerShell terminal and run:
```powershell
.\start-backend.ps1
```
Backend will start at: **http://localhost:5000**

### Step 3: Start Frontend Server
Open another PowerShell terminal and run:
```powershell
.\start-frontend.ps1
```
Frontend will start at: **http://localhost:3000**

## 🎯 What You Get

Your website includes:

### ✅ Frontend Features
- **Hero Section** - Eye-catching landing with your logo colors
- **Benefits Section** - 6 key product benefits with icons
- **Products Catalog** - 6 herbal products with full e-commerce features
  - Size selection (250g / 500g)
  - Quantity controls
  - Add to cart
  - Real-time pricing
- **Shopping Cart** - Slide-in cart drawer with:
  - Item management
  - Quantity updates
  - Remove items
  - WhatsApp checkout
- **About Section** - Company story and values
- **Contact Section** - Contact info with WhatsApp integration
- **Policies** - Privacy, Terms, Shipping, Returns
- **Footer** - Links, contact info, social media
- **Floating WhatsApp Button** - Always accessible support

### ✅ Backend Features
- **Products API** - GET all products, by ID, by category
- **Orders API** - Full CRUD operations
- **CORS Enabled** - Frontend/backend communication
- **Error Handling** - Comprehensive error middleware

## 🎨 Customization

### Update Your Contact Information
Search and replace in these files:
- `frontend/src/components/Contact.jsx`
- `frontend/src/components/Cart.jsx`
- `frontend/src/components/WhatsAppButton.jsx`
- `frontend/src/components/Footer.jsx`

**Current Placeholder**: +91 98765 43210
**Replace with**: Your actual WhatsApp business number

### Update Products
Edit: `frontend/src/components/Products.jsx`
Or connect to backend API: `backend/routes/products.js`

### Change Colors
Edit: `frontend/src/index.css` (CSS variables section)
Current colors match your logo:
- Primary Green: #2d7a1f
- Black: #000000

### Add Your Logo
Already done! Your logo is in: `frontend/public/logo.png`

## 📱 Testing WhatsApp Integration

The WhatsApp button will open with pre-filled messages:
1. **Contact Button** - "Hello! I have a question about your products."
2. **Checkout** - Includes full order details with items & total

**Note**: Update the phone number from `919876543210` to your actual number!

## 🚀 Production Build

### Build Frontend
```powershell
cd frontend
npm run build
```
Output folder: `frontend/dist/`

### Deploy Frontend
Upload the `dist/` folder to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- AWS S3

### Deploy Backend
Use services like:
- Railway.app (easiest)
- Heroku
- DigitalOcean
- AWS EC2

## 🔧 Troubleshooting

### PowerShell Script Errors
If you get "cannot be loaded because running scripts is disabled":
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Port Already in Use
If port 3000 or 5000 is busy:
- Frontend: Edit `vite.config.js` (change server.port)
- Backend: Edit `.env` (change PORT value)

### Dependencies Installation Failed
Make sure you have Node.js 18+ installed:
```powershell
node --version
npm --version
```

## 📞 Need Help?

If you encounter any issues:
1. Check the full README.md for detailed documentation
2. Verify Node.js is installed correctly
3. Make sure both servers are running
4. Check browser console for frontend errors
5. Check terminal for backend errors

## ✨ Features Highlight

### Premium Design
- ✅ Green & Black color scheme from logo
- ✅ Modern glassmorphism effects
- ✅ Smooth animations throughout
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ SEO optimized

### E-commerce Ready
- ✅ Product catalog
- ✅ Shopping cart
- ✅ Size & quantity selection
- ✅ WhatsApp checkout
- ✅ Order management API

### Customer Experience
- ✅ Fast loading (Vite)
- ✅ Smooth scrolling
- ✅ Intuitive navigation
- ✅ Floating WhatsApp support
- ✅ Mobile-friendly

## 🎉 You're All Set!

Your premium e-commerce website for New Wonder Herbals is ready!

**Next Steps**:
1. ✅ Install dependencies (Step 1)
2. ✅ Start both servers (Steps 2 & 3)
3. ✅ Open http://localhost:3000 in your browser
4. ✅ Update contact information with your real details
5. ✅ Test all features
6. ✅ Deploy to production

---

**Built with 💚 for Natural Wellness**
