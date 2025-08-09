# 🚨 Quick Fix: Database Connection Issue

## Problem
You're getting "failed to update fees" error from the admin page because your Neon database was deleted and you created a new one called `wild-moon-63956341`.

## ✅ Solution (3 Steps)

### Step 1: Get Your Database Connection String
1. Go to https://console.neon.tech
2. Select your project (wild-moon-63956341)
3. Click "Connection Details"
4. Copy the connection string (looks like: `postgresql://user:pass@host/wild-moon-63956341?sslmode=require`)

### Step 2: Update Netlify Environment Variables
1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add/update:
   - `DATABASE_URL` = `your_connection_string_here`
   - `NEXT_PUBLIC_ADMIN_PASSWORD` = `unbagged2024`

### Step 3: Test
1. Wait 2-3 minutes for deployment
2. Go to `https://your-site.netlify.app/admin`
3. Login with password: `unbagged2024`
4. Try updating fees amount

## 🔍 If Still Not Working

### Check Netlify Logs:
1. Go to Netlify dashboard
2. Select your site
3. Go to **Functions** → **View function logs**
4. Look for database connection errors

### Test Locally:
```bash
# Set your database URL
export DATABASE_URL="your_connection_string_here"

# Test connection
node test-db.js

# Start dev server
npm run dev
# Then test at http://localhost:3000/admin
```

## 🎯 Success Indicators
- ✅ Admin panel loads without errors
- ✅ Can update fees amount
- ✅ Main page shows updated fees
- ✅ No "Database not available" errors

## 📞 Need Help?
- Check the full guide: `DATABASE_SETUP.md`
- Test script: `test-db.js`
- Error logs: Netlify dashboard → Functions → Logs 