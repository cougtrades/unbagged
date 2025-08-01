# Unbagged Tracker 🌊

A real-time tracking website for the unbagged token's impact on ocean cleanup. For every 1 SOL in fees, 3,300 bags are removed from the ocean, with 90% going directly to @TheOceanCleanup.

## Features

- **Real-time Impact Tracking**: Live updates of bags removed and donations made
- **Beautiful Visualizations**: Interactive charts showing progress over time
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Solana Integration**: Direct connection to Solana blockchain for accurate data
- **Auto-refresh**: Data updates every 30 seconds automatically
- **Real API Integration**: Connects to Jupiter and Birdeye for live market data

## Token Information

- **Token Address**: `8zdFumGcK2iF8AcqfSEjaPX4NzPuP3Tyx7msnvcsBAGS`
- **Impact Ratio**: 3,300 bags removed per 1 SOL in fees
- **Donation Split**: 90% to @TheOceanCleanup, 10% for marketing
- **Powered by**: @bagsapp

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom ocean-themed design
- **Animations**: Framer Motion for smooth interactions
- **Charts**: Recharts for data visualization
- **Blockchain**: Solana Web3.js for token data
- **APIs**: Jupiter and Birdeye for real-time market data
- **Icons**: Lucide React for beautiful icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd unbagged-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional for real data):
```bash
# Create .env.local file
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

For production use with real data, create a `.env.local` file:

```env
# Birdeye API Key (get free key from https://birdeye.so/)
NEXT_PUBLIC_BIRDEYE_API_KEY=your_birdeye_api_key_here

# Solana RPC URL (optional - uses public RPC by default)
NEXT_PUBLIC_SOLANA_RPC_URL=https://your-dedicated-rpc.com
```

### Getting API Keys

#### Birdeye API (Recommended)
1. Visit [https://birdeye.so/](https://birdeye.so/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env.local` file

#### Jupiter API
- No API key required for basic price data
- Used for real-time token prices

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
unbagged-tracker/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page component
├── components/             # Reusable components
│   ├── ImpactCard.tsx     # Metric display cards
│   └── ImpactChart.tsx    # Data visualization charts
├── lib/                    # Utility libraries
│   ├── solana.ts          # Solana blockchain integration
│   └── config.ts          # API configuration
├── public/                 # Static assets
└── package.json           # Dependencies and scripts
```

## Key Components

### ImpactCard
Displays individual metrics with beautiful animations and gradients.

### ImpactChart
Shows historical data with interactive area charts using Recharts.

### SolanaService
Handles all blockchain interactions and data fetching from:
- **Solana RPC**: Token supply and metadata
- **Jupiter API**: Real-time price data
- **Birdeye API**: Volume, holders, and market data

## Data Sources

### Real-time Data
- **Token Supply**: Direct from Solana blockchain
- **Price Data**: Jupiter API (no key required)
- **Market Data**: Birdeye API (free key recommended)
- **Transaction History**: Solana RPC

### Fallback Data
If APIs are unavailable, the app uses realistic mock data to ensure the website always works.

## Customization

### Colors
The theme uses custom ocean and unbagged colors defined in `tailwind.config.js`:

- Ocean blues: `ocean-50` to `ocean-900`
- Unbagged greens: `unbagged-50` to `unbagged-900`

### Configuration
Edit `lib/config.ts` to modify:
- Fee percentages
- Update intervals
- API endpoints
- Token settings

## API Rate Limits

- **Jupiter**: No rate limits for basic price data
- **Birdeye**: 100 requests/minute (free tier)
- **Solana RPC**: Varies by provider

## Troubleshooting

### Common Issues

1. **"Failed to fetch real-time data"**
   - Check your internet connection
   - Verify API keys are correct
   - The app will use fallback data

2. **Slow loading times**
   - Consider using a dedicated Solana RPC
   - Check API rate limits

3. **Missing data**
   - Token might not be listed on Birdeye yet
   - Check if token address is correct

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For questions or support, please reach out to the development team.

---

**The Great Unbagging Begins** 🌊♻️ 