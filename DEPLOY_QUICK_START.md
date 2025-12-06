# 🚀 Quick Deployment Guide

## Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create main branch
git branch -M main

# Add your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

## Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com) and sign in**

2. **Click "Add New Project"**

3. **Import your GitHub repository**
   - Select the repository you just pushed
   - Click "Import"

4. **Configure Environment Variables**
   - Click "Environment Variables" before deploying
   - Add these two variables:

   ```
   JWT_SECRET = 6tqA9R9O45AeqDJD99SmZmSi9vMazjLQiFELwn3x5BQ=
   ```

   (BLOB_READ_WRITE_TOKEN is optional - only if you want Vercel Blob storage for images)

5. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live! 🎉

## Step 3: After Deployment

### Test Your Site
- ✅ Visit your live URL
- ✅ Go to `/admin/login`
- ✅ Login with:
   - Username: `admin`
   - Password: `lubinablanca2024`

### Important Security Steps
1. **Change Admin Password** (CRITICAL!)
   - The default password is `lubinablanca2024`
   - Follow instructions in DEPLOYMENT.md to change it

2. **Test All Features**
   - Upload images in admin panel
   - Edit menu items
   - Update hero slides
   - Check mobile view

## Environment Variables Summary

| Variable | Required | Value |
|----------|----------|-------|
| `JWT_SECRET` | ✅ Yes | `6tqA9R9O45AeqDJD99SmZmSi9vMazjLQiFELwn3x5BQ=` |
| `BLOB_READ_WRITE_TOKEN` | ❌ No | (Get from Vercel Dashboard if needed) |

## Troubleshooting

**Build fails?**
- Check that Node.js 18+ is selected in Vercel settings
- Verify all environment variables are set

**Can't login?**
- Verify `JWT_SECRET` is set correctly
- Clear browser cookies and try again

**Images not uploading?**
- If using Vercel Blob: Add `BLOB_READ_WRITE_TOKEN`
- Otherwise, images will be stored locally (works fine for most cases)

---

**Need more details?** Check [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive instructions.

