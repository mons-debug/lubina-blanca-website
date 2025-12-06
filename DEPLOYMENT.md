# 🚀 Deployment Guide

## Prerequisites

Before deploying, make sure you have:
1. A GitHub account (for easy deployment)
2. A Vercel account (free tier works great) - [Sign up here](https://vercel.com/signup)

## Environment Variables Needed

You'll need to set these environment variables in your deployment platform:

### Required:
- **`JWT_SECRET`** - A secure random string for encrypting admin session tokens
  - Generate one: `openssl rand -base64 32`
  - Or use: [random.org](https://www.random.org/strings/)

### Optional (but recommended for production):
- **`BLOB_READ_WRITE_TOKEN`** - Vercel Blob Storage token (for image uploads)
  - Get it from: Vercel Dashboard → Settings → Storage → Blob
  - If not set, images will be stored locally (works but not ideal for serverless)

## Deployment Steps

### Option 1: Deploy to Vercel (Recommended) ⭐

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Set Environment Variables:**
   - In the Vercel project settings, go to "Environment Variables"
   - Add these variables:
     ```
     JWT_SECRET=your-generated-secret-here
     BLOB_READ_WRITE_TOKEN=your-blob-token (optional)
     ```
   - Make sure to set them for: Production, Preview, and Development

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your site will be live! 🎉

### Option 2: Deploy to Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Push to GitHub** (same as step 1 above)

3. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repo
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`

4. **Set Environment Variables:**
   - Site settings → Environment variables
   - Add `JWT_SECRET` and `BLOB_READ_WRITE_TOKEN`

5. **Deploy!**

## Post-Deployment Checklist

- [ ] Test the homepage loads correctly
- [ ] Test admin login at `/admin/login`
  - Username: `admin`
  - Password: `lubinablanca2024`
- [ ] Test image uploads in admin panel
- [ ] Verify all sections work (Menu, Gallery, About, Contact)
- [ ] Test on mobile devices
- [ ] **IMPORTANT:** Change admin password in production (see below)

## Security Recommendations

### 1. Change Admin Password (CRITICAL!)

The default password is `lubinablanca2024`. **You must change this in production!**

To change it:
1. Generate a new password hash:
   ```bash
   node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YOUR_NEW_PASSWORD', 10).then(hash => console.log(hash));"
   ```

2. Update `/lib/auth.ts`:
   - Replace the `passwordHash` in the `ADMIN_USERS` array
   - Commit and redeploy

### 2. Strong JWT Secret

Make sure your `JWT_SECRET` is:
- At least 32 characters long
- Random and unique
- Never committed to git (already in .gitignore)

### 3. Enable HTTPS

Both Vercel and Netlify automatically provide HTTPS - no action needed!

## Image Storage Options

### Option A: Vercel Blob Storage (Recommended)
- Set `BLOB_READ_WRITE_TOKEN` environment variable
- Images stored in Vercel's CDN
- Fast, reliable, auto-optimized
- Free tier: 100 GB bandwidth/month

### Option B: Local Storage (Fallback)
- Works without any configuration
- Images stored in `/public/uploads/`
- **Note:** On Vercel, filesystem is read-only except at build time
- Better for Netlify or self-hosted solutions

### Option C: External Storage
You can modify the upload route to use:
- AWS S3
- Cloudinary
- ImageKit
- Or any other storage service

## Custom Domain Setup

### Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. SSL certificate is automatic

### Netlify:
1. Site settings → Domain management
2. Add custom domain
3. Configure DNS as instructed
4. SSL is automatic

## Troubleshooting

### Build Fails
- Check Node.js version (needs 18+)
- Ensure all dependencies are in `package.json`
- Check build logs for specific errors

### Images Not Loading
- If using Vercel Blob: Check `BLOB_READ_WRITE_TOKEN` is set
- If using local storage: Images must be committed to git or uploaded via admin

### Admin Login Not Working
- Verify `JWT_SECRET` is set
- Check cookies are enabled in browser
- Try clearing browser cache/cookies
- Check browser console for errors

### API Routes Not Working
- Verify environment variables are set
- Check function logs in Vercel/Netlify dashboard
- Ensure routes are in `/app/api/` directory

## Support

If you encounter issues:
1. Check the build logs in your deployment platform
2. Review browser console for client-side errors
3. Check server function logs
4. Verify all environment variables are set correctly

---

**Need help?** Check the main [README.md](README.md) and [ADMIN_GUIDE.md](ADMIN_GUIDE.md) for more information.

