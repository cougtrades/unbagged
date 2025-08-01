# 🚀 Netlify Deployment Guide

## Quick Deploy to Netlify

This guide will help you deploy your Unbagged Tracker to Netlify in just a few minutes.

## 📋 Prerequisites

1. **GitHub Account** - Your code needs to be on GitHub
2. **Netlify Account** - Sign up at [netlify.com](https://netlify.com)
3. **Node.js 18+** - For local testing (optional)

## 🚀 Step-by-Step Deployment

### Step 1: Push to GitHub

First, make sure your code is on GitHub:

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/unbagged-tracker.git
git push -u origin main
```

### Step 2: Deploy to Netlify

1. **Go to Netlify**: Visit [netlify.com](https://netlify.com) and sign in
2. **Create New Site**: Click "New site from Git"
3. **Connect to GitHub**: Choose GitHub as your Git provider
4. **Select Repository**: Choose your `unbagged-tracker` repository
5. **Configure Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: `18` (or leave default)

### Step 3: Environment Variables (Optional)

If you want to use a dedicated Solana RPC endpoint:

1. Go to **Site settings** → **Environment variables**
2. Add: `NEXT_PUBLIC_SOLANA_RPC_URL` = `https://your-rpc-endpoint.com`

### Step 4: Deploy!

Click **Deploy site** and wait 2-3 minutes. Your site will be live at:
`https://your-site-name.netlify.app`

## 🔧 Configuration Files

The project includes these configuration files:

- **`netlify.toml`** - Build settings and redirects
- **`next.config.js`** - Static export configuration
- **`package.json`** - Dependencies and scripts

## 📊 What You Get

Your live site will feature:
- ✅ **Real-time transaction monitoring**
- ✅ **Live bag counting from actual fees**
- ✅ **Ocean cleanup donation tracking**
- ✅ **Beautiful ocean-themed UI**
- ✅ **Mobile-responsive design**
- ✅ **Automatic updates every 10 seconds**

## 🎯 Live Features

### Real-Time Data:
- **Token Supply**: Direct from Solana blockchain
- **Transaction Fees**: Extracted from actual transactions
- **Price Data**: Real-time from Jupiter API
- **Bag Count**: Calculated from real fees

### Automatic Updates:
- **Every 10 seconds**: Checks for new transactions
- **Instant updates**: When new transactions are detected
- **Live indicators**: Shows connection status

## 🛠️ Troubleshooting

### Build Errors:
- **Node version**: Make sure Node 18+ is selected
- **Dependencies**: Run `npm install` locally first
- **Build command**: Should be `npm run build`

### Runtime Issues:
- **CORS errors**: Check Solana RPC connection
- **No data**: Verify token address is correct
- **Slow loading**: Consider using dedicated RPC

### Common Solutions:
1. **Clear cache**: Redeploy with "Clear cache and deploy"
2. **Check logs**: View build logs in Netlify dashboard
3. **Test locally**: Run `npm run build` locally first

## 🔗 Your Live Site

Once deployed, your site will be available at:
`https://your-site-name.netlify.app`

The site will automatically:
- Monitor the unbagged token
- Track real transaction fees
- Calculate bags removed from ocean
- Show live donation amounts

## 🎉 Success!

Your Unbagged Tracker is now live and tracking real ocean cleanup impact! 🌊♻️

**The Great Unbagging Begins** 🚀 