# 🚀 Netlify Deployment Guide

Complete guide to deploy Orchid Malaysia E-commerce to Netlify.

## 📋 Prerequisites

- GitHub account (already set up ✅)
- Netlify account ([Sign up free](https://app.netlify.com/signup))
- Repository: `https://github.com/Orchid12721/orchid-malaysia-ecommerce`

## 🌐 Deploy via Netlify UI (Recommended)

### Step 1: Connect to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click **"Add new site"** button
3. Select **"Import an existing project"**
4. Choose **"Deploy with GitHub"**

### Step 2: Authorize GitHub

1. Click **"Connect to GitHub"**
2. Authorize Netlify to access your repositories
3. Search for `orchid-malaysia-ecommerce`
4. Click on the repository to select it

### Step 3: Configure Build Settings

Netlify will auto-detect the settings from `netlify.toml`, but verify:

**Build settings:**
- **Base directory:** (leave empty)
- **Build command:** `pnpm install && pnpm build`
- **Publish directory:** `dist/public`
- **Functions directory:** (leave empty)

**Advanced build settings:**
- **Node version:** `22` (auto-detected from netlify.toml)

### Step 4: Environment Variables (Optional)

If you need database or API integration:

1. Click **"Show advanced"**
2. Click **"New variable"**
3. Add these variables:

```
DATABASE_URL = your_database_connection_string
JWT_SECRET = your_secret_key_here
VITE_APP_TITLE = Orchid Malaysia
VITE_APP_LOGO = /logo.png
```

**Note:** For static deployment, the site will work without database (using mock data).

### Step 5: Deploy!

1. Click **"Deploy site"**
2. Wait 2-3 minutes for build to complete
3. Your site will be live at: `https://random-name-123456.netlify.app`

### Step 6: Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `orchidmalaysia.com`)
4. Follow DNS configuration instructions
5. SSL certificate will be auto-provisioned

## 🔧 Deploy via Netlify CLI

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify

```bash
netlify login
```

This will open a browser for authentication.

### Step 3: Initialize Site

```bash
cd orchid-malaysia-ecommerce
netlify init
```

Follow the prompts:
- Create & configure a new site
- Choose your team
- Enter site name (or leave blank for random)
- Build command: `pnpm install && pnpm build`
- Publish directory: `dist/public`

### Step 4: Deploy

```bash
# Deploy to production
netlify deploy --prod

# Or deploy to draft URL first
netlify deploy
```

## 🎯 Post-Deployment Checklist

### ✅ Verify Deployment

- [ ] Site loads correctly
- [ ] All pages are accessible
- [ ] Images and assets load
- [ ] Mobile responsive design works
- [ ] Navigation works properly

### ✅ Configure Site Settings

1. **Site name**
   - Go to Site settings → General
   - Change site name to something memorable
   - URL will become: `https://your-name.netlify.app`

2. **Build settings**
   - Verify build command: `pnpm install && pnpm build`
   - Verify publish directory: `dist/public`

3. **Deploy notifications**
   - Set up email/Slack notifications for deploys
   - Go to Site settings → Build & deploy → Deploy notifications

### ✅ Enable Continuous Deployment

Continuous deployment is enabled by default. Every push to `main` branch will:
1. Trigger automatic build
2. Deploy to production
3. Send notification on completion

**To deploy updates:**
```bash
git add .
git commit -m "Update website"
git push origin main
```

## 🔍 Troubleshooting

### Build Fails

**Error:** `Command failed with exit code 1`

**Solution:**
1. Check build logs in Netlify dashboard
2. Verify `package.json` scripts are correct
3. Ensure all dependencies are listed
4. Check Node version compatibility

### Site Shows 404

**Error:** Page not found on refresh

**Solution:**
The `_redirects` file should handle this, but verify:
1. Check `dist/public/_redirects` exists
2. Content should be: `/*    /index.html   200`
3. Redeploy if needed

### Assets Not Loading

**Error:** Images or CSS not loading

**Solution:**
1. Check asset paths are relative (start with `/`)
2. Verify files are in `dist/public/` after build
3. Check browser console for 404 errors
4. Clear Netlify cache and redeploy

### Environment Variables Not Working

**Solution:**
1. Go to Site settings → Environment variables
2. Add variables with exact names
3. Redeploy the site (variables only apply on new builds)

## 📊 Monitoring & Analytics

### Enable Netlify Analytics

1. Go to Site settings → Analytics
2. Enable Netlify Analytics ($9/month)
3. View traffic, performance, and errors

### Add Google Analytics (Free)

1. Get GA4 tracking ID
2. Add to `client/index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` to GitHub
   - Use Netlify environment variables for secrets
   - Rotate JWT secrets regularly

2. **HTTPS**
   - Netlify provides free SSL (auto-enabled)
   - Force HTTPS in Site settings

3. **Headers**
   - Add security headers in `netlify.toml`
   - Enable HSTS, CSP, etc.

## 🚀 Performance Optimization

### Enable Asset Optimization

1. Go to Site settings → Build & deploy → Post processing
2. Enable:
   - **Bundle CSS** ✅
   - **Minify CSS** ✅
   - **Minify JS** ✅
   - **Compress images** ✅
   - **Pretty URLs** ✅

### Enable Netlify Edge

For faster global delivery:
1. Sites are automatically on Netlify CDN
2. Assets cached globally
3. No additional configuration needed

## 📱 Preview Deployments

Every pull request gets a preview URL:
1. Create a new branch
2. Make changes
3. Push and create PR
4. Netlify auto-deploys preview
5. Share preview URL with team
6. Merge when approved

## 🎉 Success!

Your Orchid Malaysia E-commerce site is now live on Netlify!

**Next Steps:**
1. Share your site URL
2. Add products via admin panel
3. Configure payment gateway
4. Set up custom domain
5. Monitor analytics

## 📞 Support

- **Netlify Docs:** https://docs.netlify.com
- **Community Forum:** https://answers.netlify.com
- **GitHub Issues:** https://github.com/Orchid12721/orchid-malaysia-ecommerce/issues

---

**Happy Deploying! 🚀**
