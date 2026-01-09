# Deployment Guide - Founders Factory Dashboard

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd ff-dashboard
vercel
```

3. Follow prompts:
   - Sign in with GitHub/GitLab/Email
   - Set project name: `founders-factory-dashboard`
   - Accept defaults
   - Get instant URL like: `https://founders-factory-dashboard.vercel.app`

**Advantages:**
- Instant deployment (< 2 minutes)
- Free tier available
- Auto HTTPS
- Can add password protection
- Custom domain support

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build and deploy:
```bash
cd ff-dashboard
npm run build
netlify deploy --prod
```

3. Get URL like: `https://founders-factory-dashboard.netlify.app`

### Option 3: GitHub Pages

1. Add to `package.json`:
```json
"homepage": "https://[your-org].github.io/ff-dashboard"
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add deploy scripts to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

4. Deploy:
```bash
npm run deploy
```

### Option 4: AWS Amplify / Azure / Google Cloud

See their respective deployment guides for static React apps.

---

## Adding Password Protection

### Vercel Password Protection:

1. Go to vercel.com dashboard
2. Select your project
3. Settings → Deployment Protection
4. Enable "Password Protection"
5. Set password for your organization

### Netlify Password Protection:

Requires paid plan or use Netlify Identity.

---

## Custom Domain Setup

### For Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `dashboard.foundersfactory.com`)
3. Update DNS records as instructed

### For Netlify:
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records

---

## Environment Variables (For Future Real Data)

When connecting to real APIs, add environment variables:

```bash
# Vercel
vercel env add

# Netlify
netlify env:set VARIABLE_NAME value
```

---

## Running Locally for Testing

```bash
cd ff-dashboard
npm install
npm run dev
```

Open `http://localhost:5173`

---

## Building for Production

```bash
npm run build
```

This creates optimized files in the `dist` folder.

---

## Recommended: Vercel Deployment

**Step-by-step:**

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Sign in
3. Click "Add New Project"
4. Import your Git repository OR upload the `ff-dashboard` folder
5. Vercel auto-detects Vite config
6. Click "Deploy"
7. Get your URL in ~60 seconds!

**Share the URL with your organization.**

---

## Need Help?

Contact your IT team or reach out to:
- Vercel Support: vercel.com/support
- Netlify Support: netlify.com/support
