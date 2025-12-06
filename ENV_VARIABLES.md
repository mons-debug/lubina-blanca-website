# Environment Variables

## Required for Deployment

Copy these environment variables to your deployment platform (Vercel, Netlify, etc.)

### 1. JWT_SECRET (REQUIRED)
```
JWT_SECRET=6tqA9R9O45AeqDJD99SmZmSi9vMazjLQiFELwn3x5BQ=
```

**Generated secure secret for you!** This is used to encrypt admin session tokens.

### 2. BLOB_READ_WRITE_TOKEN (OPTIONAL)
```
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here
```

Only needed if using Vercel Blob Storage for images. If not set, images will be stored locally.

**To get this token:**
1. Go to Vercel Dashboard
2. Settings → Storage → Blob
3. Create a new Blob store (if needed)
4. Copy the token

---

## For Local Development

Create a `.env.local` file in the root directory:

```env
JWT_SECRET=6tqA9R9O45AeqDJD99SmZmSi9vMazjLQiFELwn3x5BQ=
BLOB_READ_WRITE_TOKEN=
```

## Important Notes

- **Never commit `.env.local` to git** (already in .gitignore)
- **Change the JWT_SECRET** if you want a different one (generate: `openssl rand -base64 32`)
- **For production:** Always use strong, unique secrets

