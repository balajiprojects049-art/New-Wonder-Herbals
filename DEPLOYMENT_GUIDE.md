# 🚀 DEPLOYMENT GUIDE - New Wonder Herbals

## 📋 Prerequisites Checklist
- ✅ GitHub Account (Done - balujiprojects049-art)
- ✅ Vercel Account (Done)
- ⚠️ Need: Git installed on your computer
- ⚠️ Need: GitHub Desktop (easier) OR Git command line

---

## OPTION 1: Deploy Using GitHub Desktop (EASIEST) ⭐

### Step 1: Install GitHub Desktop
1. Go to: https://desktop.github.com/
2. Download and install GitHub Desktop
3. Sign in with your GitHub account (balujiprojects049-art)

### Step 2: Upload Your Project
1. Open GitHub Desktop
2. Click **File** → **Add Local Repository**
3. Browse to: `C:\Users\hp\OneDrive\Desktop\staffarc\new wonder herbal`
4. Click **"Create a repository"** if prompted
5. Click **"Publish repository"**
6. **Uncheck** "Keep this code private" (or keep checked if you want it private)
7. Click **"Publish Repository"**

### Step 3: Deploy to Vercel
1. Go to: https://vercel.com/
2. Sign in to your Vercel account
3. Click **"Add New"** → **"Project"**
4. Click **"Import Git Repository"**
5. Select **"New-Wonder-Herbals"** from the list
6. **IMPORTANT:** Configure the project:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
7. Click **"Deploy"**
8. Wait 2-3 minutes for deployment
9. You'll get a live URL like: `new-wonder-herbals.vercel.app`

---

## OPTION 2: Deploy Using Vercel CLI (ALTERNATIVE)

### Step 1: Install Vercel CLI
Open PowerShell in your project folder and run:
```powershell
npm install -g vercel
```

### Step 2: Login to Vercel
```powershell
vercel login
```
Follow the prompts to login with your Vercel account.

### Step 3: Deploy Frontend
```powershell
cd "c:\Users\hp\OneDrive\Desktop\staffarc\new wonder herbal\frontend"
vercel
```

Follow the prompts:
- Link to existing project? **N** (No)
- Project name: **new-wonder-herbals**
- Directory: **./** (default)
- Want to modify settings? **N** (No)

### Step 4: Production Deployment
```powershell
vercel --prod
```

---

## OPTION 3: Manual Upload to GitHub (Without Git)

### Step 1: Prepare Files
1. Go to your project folder
2. Create a ZIP file of these folders:
   - `frontend` folder
   - `backend` folder
   - `README.md`
   - `.gitignore`

### Step 2: Upload to GitHub
1. Go to: https://github.com/balujiprojects049-art/New-Wonder-Herbals
2. Click **"Add file"** → **"Upload files"**
3. Drag and drop your ZIP or select files
4. Click **"Commit changes"**

### Step 3: Deploy to Vercel
(Same as Option 1, Step 3)

---

## 🔧 IMPORTANT: Vercel Configuration

When deploying to Vercel, make sure to set:

### Build Settings:
```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Environment Variables (if needed):
```
VITE_API_URL=your-backend-url (later)
```

---

## 📱 After Deployment

### Your Live URLs:
- **Frontend:** `https://new-wonder-herbals.vercel.app`
- **Custom Domain:** Can add later (e.g., newwonderherbals.com)

### Test Your Site:
1. ✅ Homepage loads
2. ✅ Products page shows all 6 products
3. ✅ Cart works
4. ✅ WhatsApp integration works
5. ✅ All pages accessible

---

## ⚠️ BACKEND DEPLOYMENT (Separate - Later)

Your backend needs to be deployed separately. Options:
1. **Vercel** (can deploy backend too)
2. **Render** (free tier)
3. **Railway** (free tier)
4. **Heroku** (paid)

For now, frontend will work without backend as products are hardcoded.

---

## 🐛 TROUBLESHOOTING

### Issue: Build fails on Vercel
**Solution:** 
- Check if `package.json` exists in frontend folder
- Ensure all dependencies are listed
- Check build logs for errors

### Issue: Images not showing
**Solution:**
- Make sure images are in `frontend/public/products/`
- Check image paths in Products.jsx

### Issue: 404 errors
**Solution:**
- Ensure `index.html` exists in frontend folder
- Check Vercel output directory is set to `dist`

---

## 📞 NEED HELP?

1. **GitHub Desktop Issues:** https://docs.github.com/en/desktop
2. **Vercel Deployment:** https://vercel.com/docs
3. **Contact Support:** Your developer can help!

---

## ✅ QUICK DEPLOYMENT CHECKLIST

- [ ] Install GitHub Desktop
- [ ] Upload code to GitHub repository
- [ ] Connect Vercel to GitHub
- [ ] Configure Vercel project (framework: Vite, root: frontend)
- [ ] Deploy and get live URL
- [ ] Test website live
- [ ] (Optional) Add custom domain

---

**Recommended: Use OPTION 1 (GitHub Desktop) - It's the easiest!**

Last Updated: December 2025
