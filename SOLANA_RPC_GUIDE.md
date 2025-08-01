# Free Solana RPC Endpoints for Live Updates

This guide covers all the free options for connecting to Solana and getting real-time updates for your application.

## 🚀 Best Free Options

### 1. **Project Serum RPC** (Recommended)
- **URL**: `https://solana-api.projectserum.com`
- **WebSocket**: `wss://solana-api.projectserum.com`
- **Pros**: 
  - Free with no rate limits
  - Excellent performance
  - WebSocket support for real-time updates
  - No authentication required
- **Cons**: None for basic usage

### 2. **Official Solana RPC**
- **URL**: `https://api.mainnet-beta.solana.com`
- **WebSocket**: `wss://api.mainnet-beta.solana.com`
- **Pros**: 
  - Official endpoint
  - Reliable
- **Cons**: 
  - Rate limited (429 errors common)
  - Not ideal for high-frequency updates

### 3. **Ankr RPC** (Free Tier)
- **URL**: `https://rpc.ankr.com/solana`
- **WebSocket**: `wss://rpc.ankr.com/solana`
- **Pros**: 
  - Good performance
  - Free tier available
- **Cons**: 
  - Requires registration for higher limits
  - Rate limited on free tier

### 4. **QuickNode** (Free Tier)
- **URL**: Requires registration
- **Pros**: 
  - Excellent performance
  - WebSocket support
  - Good documentation
- **Cons**: 
  - Requires signup
  - Limited on free tier

## 🔧 How to Use

### Option 1: Environment Variables (Recommended)
Create a `.env.local` file:
```bash
NEXT_PUBLIC_SOLANA_RPC_URL=https://solana-api.projectserum.com
NEXT_PUBLIC_SOLANA_WS_URL=wss://solana-api.projectserum.com
```

### Option 2: Direct Configuration
Update `lib/config.ts`:
```typescript
SOLANA_RPC_URL: 'https://solana-api.projectserum.com',
SOLANA_WS_URL: 'wss://solana-api.projectserum.com',
```

## 📊 Performance Comparison

| Provider | Speed | Reliability | WebSocket | Rate Limits |
|----------|-------|-------------|-----------|-------------|
| Project Serum | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ | None |
| Official | ⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ | Yes |
| Ankr | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ | Free tier |
| QuickNode | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ | Free tier |

## 🛠️ Implementation Tips

### 1. **Fallback Strategy**
Always implement fallback endpoints:
```typescript
const endpoints = [
  'https://solana-api.projectserum.com',
  'https://api.mainnet-beta.solana.com',
  'https://rpc.ankr.com/solana'
];
```

### 2. **WebSocket for Real-time Updates**
Use WebSocket connections for live updates:
```typescript
const ws = new WebSocket('wss://solana-api.projectserum.com');
ws.onmessage = (event) => {
  // Handle real-time updates
};
```

### 3. **Error Handling**
Implement proper error handling:
```typescript
try {
  const connection = new Connection(endpoint);
  await connection.getSlot(); // Test connection
} catch (error) {
  // Try fallback endpoint
}
```

## 🎯 For Your Unbagged Tracker

The current configuration uses **Project Serum RPC** which is:
- ✅ Completely free
- ✅ No rate limits
- ✅ WebSocket support for real-time updates
- ✅ No authentication required
- ✅ Excellent performance

## 🔄 Real-time Updates

To get live updates when transactions happen:

1. **WebSocket Subscription** (Best)
   ```typescript
   connection.onAccountChange(mintAddress, (accountInfo) => {
     // Real-time updates when token account changes
   });
   ```

2. **Polling** (Backup)
   ```typescript
   setInterval(async () => {
     const signatures = await connection.getSignaturesForAddress(mintAddress);
     // Check for new transactions
   }, 10000);
   ```

## 🚨 Troubleshooting

### Common Issues:
1. **429 Rate Limit**: Switch to Project Serum RPC
2. **WebSocket Connection Failed**: Check if endpoint supports WebSocket
3. **CORS Errors**: Use CORS-enabled endpoints

### Solutions:
- Use Project Serum RPC (no rate limits)
- Implement fallback endpoints
- Add proper error handling
- Use WebSocket for real-time updates

## 📈 Scaling Considerations

For production applications:
1. **Multiple Endpoints**: Rotate between endpoints
2. **Caching**: Cache frequently accessed data
3. **Monitoring**: Track endpoint performance
4. **Fallbacks**: Always have backup endpoints

## 🎉 Conclusion

**Project Serum RPC** is the best free option for your use case. It provides:
- Unlimited free usage
- Real-time WebSocket updates
- No authentication required
- Excellent performance

Your current setup should work perfectly for live updates! 🚀 