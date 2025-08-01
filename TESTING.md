# 🧪 Testing Guide - Verify Before Going Live

## Pre-Deployment Testing Checklist

Before making your website live, run through these tests to ensure everything works correctly.

## 🔍 **Step 1: Local Testing**

### 1.1 Check Console for Errors
```bash
# Open browser developer tools (F12)
# Go to Console tab
# Look for any red error messages
```

**Expected Console Messages:**
- ✅ `Real-time update received:` - Transaction monitoring working
- ✅ `Token account changed, updating data...` - Account monitoring active
- ✅ No red error messages

### 1.2 Verify Live Status
**What to Check:**
- ✅ Green pulsing dot shows "LIVE"
- ✅ "Last updated" timestamp changes every 30 seconds
- ✅ "Last transaction" shows a date (if transactions exist)

### 1.3 Test Data Sources
**Check Browser Network Tab:**
- ✅ Jupiter API calls: `price.jup.ag/v4/price`
- ✅ Solana RPC calls: `api.mainnet-beta.solana.com`
- ✅ No failed requests (404, 500 errors)

## 🔧 **Step 2: Data Validation**

### 2.1 Verify Token Address
**Check:** `8zdFumGcK2iF8AcqfSEjaPX4NzPuP3Tyx7msnvcsBAGS`

**Test in Browser Console:**
```javascript
// Test Solana connection
fetch('https://api.mainnet-beta.solana.com', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'getTokenSupply',
    params: ['8zdFumGcK2iF8AcqfSEjaPX4NzPuP3Tyx7msnvcsBAGS']
  })
}).then(r => r.json()).then(console.log)
```

### 2.2 Verify Jupiter Price Data
**Test in Browser Console:**
```javascript
// Test Jupiter API
fetch('https://price.jup.ag/v4/price?ids=8zdFumGcK2iF8AcqfSEjaPX4NzPuP3Tyx7msnvcsBAGS')
.then(r => r.json()).then(console.log)
```

## 📊 **Step 3: Functionality Tests**

### 3.1 Test Real-Time Updates
**What to Watch:**
- ✅ Numbers update every 30 seconds
- ✅ "Last updated" timestamp changes
- ✅ No broken calculations (NaN, undefined)

### 3.2 Test Responsive Design
**Check on Different Devices:**
- ✅ Desktop (1920x1080)
- ✅ Tablet (768px width)
- ✅ Mobile (375px width)
- ✅ All elements visible and clickable

### 3.3 Test Animations
**Verify:**
- ✅ Hero section waves animation
- ✅ Cards animate in on page load
- ✅ Smooth transitions between states

## 🚀 **Step 4: Performance Testing**

### 4.1 Load Time Test
**Check Browser Network Tab:**
- ✅ First load < 3 seconds
- ✅ Subsequent loads < 1 second
- ✅ No large bundle sizes

### 4.2 Memory Usage
**Monitor Browser Performance:**
- ✅ No memory leaks
- ✅ CPU usage stays low
- ✅ Smooth scrolling

## 🔒 **Step 5: Error Handling**

### 5.1 Test Network Failures
**Simulate Offline Mode:**
1. Open DevTools → Network tab
2. Check "Offline" checkbox
3. Refresh page
4. Verify fallback data shows

### 5.2 Test API Failures
**Expected Behavior:**
- ✅ Site still loads with fallback data
- ✅ No broken UI elements
- ✅ Clear error messages in console

## 📱 **Step 6: Cross-Browser Testing**

### 6.1 Test Different Browsers
**Check on:**
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

### 6.2 Test Mobile Browsers
**Check on:**
- ✅ iOS Safari
- ✅ Android Chrome
- ✅ Mobile Firefox

## 🎯 **Step 7: Content Verification**

### 7.1 Check All Text
**Verify:**
- ✅ "The Great Unbagging" title
- ✅ "3,300 bags" calculation
- ✅ "90% to @TheOceanCleanup"
- ✅ Token address is correct
- ✅ "@bagsapp" attribution

### 7.2 Check Calculations
**Verify Math:**
- ✅ Bags = Fees × 3,300
- ✅ Ocean Donation = Fees × 0.90
- ✅ Marketing = Fees × 0.10
- ✅ No negative numbers

## 🚨 **Step 8: Common Issues & Fixes**

### Issue: "Connecting..." Never Changes to "LIVE"
**Fix:**
```bash
# Check Solana RPC connection
curl -X POST https://api.mainnet-beta.solana.com \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}'
```

### Issue: No Transaction Data
**Check:**
- Token might not have transactions yet
- Verify token address is correct
- Check if token exists on mainnet

### Issue: Slow Updates
**Fix:**
```bash
# Use dedicated RPC
echo "NEXT_PUBLIC_SOLANA_RPC_URL=https://your-rpc.com" >> .env.local
```

## ✅ **Step 9: Final Checklist**

### Before Going Live:
- ✅ All console errors resolved
- ✅ Live status shows "LIVE"
- ✅ Data updates every 30 seconds
- ✅ Responsive design works
- ✅ Calculations are correct
- ✅ No broken links or images
- ✅ Performance is acceptable
- ✅ Error handling works

## 🎉 **Step 10: Ready to Deploy**

Once all tests pass:
1. **Commit your changes**
2. **Push to GitHub**
3. **Deploy to Vercel/Netlify**
4. **Test the live URL**
5. **Monitor for 24 hours**

## 🔍 **Monitoring Commands**

### Check Live Status:
```bash
# Test your live URL
curl -I https://your-site.vercel.app

# Check response time
curl -w "@curl-format.txt" -o /dev/null -s https://your-site.vercel.app
```

### Monitor Console:
```javascript
// Add to browser console for debugging
setInterval(() => {
  console.log('Last update:', new Date().toLocaleTimeString());
}, 30000);
```

## 🚀 **Go Live Checklist**

- ✅ All tests pass
- ✅ No console errors
- ✅ Real-time updates working
- ✅ Responsive design verified
- ✅ Performance acceptable
- ✅ Error handling tested
- ✅ Cross-browser compatibility
- ✅ Content verified
- ✅ Calculations correct

**Your website is ready to track the unbagged token live!** 🌊♻️ 