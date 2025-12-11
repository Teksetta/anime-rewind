# 🚀 Deployment Guide

Deploy Anime Rewind to the internet in minutes!

## Option 1: Vercel (Recommended)

Vercel is the platform built by the creators of Next.js and works perfectly with React projects.

### Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Push your anime-rewind code to the repo
3. Make note of your repository URL

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click "New Project"
4. Select your anime-rewind repository
5. Vercel auto-detects React settings ✅
6. Click "Deploy"

**That's it!** Your site is now live. You get a URL like `anime-rewind.vercel.app`

### Step 3: Custom Domain (Optional)

1. In Vercel project settings
2. Go to "Domains"
3. Add your custom domain
4. Update DNS records following Vercel's instructions

### Automatic Deployments

Every time you push to GitHub, Vercel automatically redeploys your site. No manual steps needed!

---

## Option 2: Netlify

Netlify is another excellent hosting platform with great DX.

### Step 1: Push to GitHub

Same as Vercel - get your code on GitHub.

### Step 2: Connect to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up / log in with GitHub
3. Click "Add new site"
4. Select "Import an existing project"
5. Choose your repository
6. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
7. Click "Deploy site"

Your site is live! Netlify generates a URL for you.

### Step 3: Custom Domain (Optional)

1. In Netlify Site Settings
2. Go to "Domain Management"
3. Add your custom domain
4. Follow DNS setup instructions

---

## Environment Variables (If Needed)

If you add API keys or secrets later, both platforms support environment variables:

### Vercel
1. Project Settings → Environment Variables
2. Add variables like: `VITE_API_KEY=your_key`
3. Redeploy to apply

### Netlify
1. Site Settings → Build & Deploy → Environment
2. Add variables
3. Rebuild to apply

---

## Troubleshooting

### Build fails on deployment?

Check these common issues:

1. **Node version mismatch**
   - Specify Node version in `package.json`:
   ```json
   "engines": {
     "node": "18.x"
   }
   ```

2. **Missing dependencies**
   - Run `npm install` locally
   - Commit `package-lock.json` to GitHub

3. **Environment variables**
   - If you're using env vars, add them in platform settings

### Site loads but looks broken?

- Clear browser cache
- Check console for errors (F12)
- Verify all assets loaded properly
- Try incognito window

### API calls returning 404?

- CORS proxy might be rate limited
- Try refreshing
- Wait a moment and retry
- Error handling falls back to default anime

---

## Monitoring & Maintenance

### Vercel
- Dashboard shows deployment history
- Automatic error tracking
- Analytics available
- Performance metrics

### Netlify
- Build logs available
- Deployment history
- Basic analytics
- Form submissions (if using)

---

## Custom Domain Setup

Both platforms support custom domains:

1. Register domain (GoDaddy, Namecheap, etc.)
2. Point to platform DNS
3. Set up SSL (automatic)
4. Done!

---

## Keeping Your Site Fresh

### Deploying Updates

```bash
# Make changes locally
git add .
git commit -m "Updated recommendation algorithm"
git push origin main
```

Automatic deployment triggers! No manual steps.

### Rollback to Previous Version

Both Vercel and Netlify let you redeploy previous versions:
- Click deployment in history
- Select "Redeploy"
- Done!

---

## Performance Tips

### Image Optimization
- Images are already optimized
- Both platforms handle caching
- No additional config needed

### Build Optimization
- Vite handles tree-shaking
- Only necessary code shipped
- Minified by default

### Caching Headers
- Vercel: Automatic
- Netlify: Can be configured

---

## Analytics & Monitoring

### Basic Stats
- Deployment success/failure
- Build times
- Traffic overview

### Advanced (Optional)
- Vercel Analytics
- Netlify Analytics
- Third-party tools (Google Analytics, etc.)

---

## Support

### Vercel Issues
- [Vercel Docs](https://vercel.com/docs)
- [Status Page](https://www.vercel-status.com/)

### Netlify Issues
- [Netlify Docs](https://docs.netlify.com/)
- [Status Page](https://www.netlifystatus.com/)

---

## Summary

| Feature | Vercel | Netlify |
|---------|--------|---------|
| Speed | ⚡ Fastest | ⚡ Fast |
| Setup | 1 minute | 1 minute |
| Free Tier | Generous | Generous |
| Automatic Deploys | ✅ Yes | ✅ Yes |
| Custom Domain | ✅ Yes | ✅ Yes |
| Best For | React | Static/React |

**Recommendation**: Both are excellent. Vercel has a slight edge for React projects.

---

**Next Steps**:
1. Choose a platform
2. Push to GitHub
3. Connect repository
4. Deploy! 🎉

Your anime recommendation engine is now live for the world to see!
