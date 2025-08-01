// Manual configuration for total fees
// Update this value when you need to change the total fees
export const CONFIG = {
  totalFees: 137.31, // Update this value manually
  totalSupply: 999999366.7835349,
  bagsPerSol: 3300,
  oceanCleanupPercentage: 0.90,
  marketingPercentage: 0.10,
  // Solana RPC endpoints
  solanaRpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
  solanaWsUrl: process.env.NEXT_PUBLIC_SOLANA_WS_URL || 'wss://api.mainnet-beta.solana.com',
  // Jupiter API
  jupiterApiUrl: 'https://price.jup.ag/v4/price',
}; 