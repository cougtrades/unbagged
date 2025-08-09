# 🗄️ Database Setup Guide

## Issue: Database Connection Failed

Your Neon database was deleted and you need to set up a new one with the name `wild-moon-63956341`.

## 🔧 Step-by-Step Fix

### 1. Get Your New Database Connection String

1. **Go to Neon Console**: https://console.neon.tech
2. **Select your project** (should be named something like `wild-moon-63956341`)
3. **Click on "Connection Details"**
4. **Copy the connection string** - it should look like:
   ```
   postgresql://username:password@host/wild-moon-63956341?sslmode=require
   ```

### 2. Update Environment Variables

#### Option A: Netlify Dashboard (Recommended)
1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add/update these variables:
   - `DATABASE_URL` = `your_neon_connection_string_here`
   - `NEXT_PUBLIC_ADMIN_PASSWORD` = `unbagged2024` (or your preferred password)

#### Option B: Local Development
1. Create a `.env.local` file in your project root:
   ```env
   DATABASE_URL=your_neon_connection_string_here
   NEXT_PUBLIC_ADMIN_PASSWORD=unbagged2024
   ```

### 3. Test Database Connection

Run the test script to verify your connection:

```bash
# Set your database URL (replace with your actual connection string)
export DATABASE_URL="postgresql://username:password@host/wild-moon-63956341?sslmode=require"

# Run the test
node test-db.js
```

**Expected output:**
```
🔗 Testing database connection...
✅ Database connection successful!
Current time from database: 2024-01-15T10:30:00.000Z
⚠️ fees_data table does not exist, will be created on first use
```

### 4. Deploy and Test

1. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Fix database connection for new Neon database"
   git push
   ```

2. **Wait for Netlify deployment** (usually 2-3 minutes)

3. **Test the admin panel**:
   - Go to: `https://your-site.netlify.app/admin`
   - Login with password: `unbagged2024`
   - Try updating the fees amount

## 🚨 Troubleshooting

### Issue: "Database not available" Error

**Check:**
1. ✅ Database URL is correct
2. ✅ Database is active in Neon console
3. ✅ No IP restrictions blocking your connection
4. ✅ Environment variables are set in Netlify

### Issue: "Table does not exist" Error

**This is normal!** The table will be created automatically on first use.

### Issue: Connection Timeout

**Try:**
1. Check if your Neon database is paused (free tier)
2. Verify the connection string format
3. Test with the `test-db.js` script

## 📊 Database Schema

The application will automatically create this table:

```sql
CREATE TABLE fees_data (
  id SERIAL PRIMARY KEY,
  total_fees DECIMAL(10,2) NOT NULL DEFAULT 137.31,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔍 Verification Steps

1. **Test API endpoint**: `GET /api/fees`
   - Should return fees data
   - Check console for "✅ Database connection established"

2. **Test admin panel**: `POST /api/fees`
   - Should update fees successfully
   - Check console for "✅ Fees updated successfully"

3. **Check data persistence**:
   - Update fees via admin panel
   - Refresh main page
   - Verify new fees amount is displayed

## 🎯 Success Indicators

- ✅ Database connection established
- ✅ fees_data table created automatically
- ✅ Admin panel can update fees
- ✅ Main page displays updated fees
- ✅ No "Database not available" errors

## 📞 Need Help?

If you're still having issues:

1. **Check Netlify logs**:
   - Go to Netlify dashboard
   - Select your site
   - Go to **Functions** → **View function logs**

2. **Test locally**:
   ```bash
   npm run dev
   # Then test the admin panel at http://localhost:3000/admin
   ```

3. **Verify environment variables**:
   - Make sure `DATABASE_URL` is set correctly
   - Check for typos in the connection string

## 🚀 Ready to Go!

Once you've completed these steps, your admin panel should work correctly and you'll be able to update fees from the admin page. 