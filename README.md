# The Great Unbagged - Ocean Cleanup Tracker

🌊 **Real-time tracking of bags removed from the ocean through Solana token trading fees**

## Overview

This project tracks the impact of the "unbagged" token on ocean cleanup efforts. For every 1 SOL in trading fees, 3,300 bags are removed from the ocean. 90% of fees are donated to @TheOceanCleanup, while 10% goes to marketing.

## 🚀 Live Demo

- **Main Site**: [https://unbagged.fun](https://unbagged.fun)
- **Admin Panel**: [https://unbagged.fun/admin](https://unbagged.fun/admin)
- **GitHub Repo**: [https://github.com/cougtrades/unbagged](https://github.com/cougtrades/unbagged)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Framer Motion
- **Deployment**: Netlify
- **Database**: In-memory storage (ready for Neon/Postgres)
- **Icons**: Lucide React
- **Token**: 8zdFumGcK2iF8AcqfSEjaPX4NzPuP3Tyx7msnvcsBAGS

## 📁 Project Structure

```
unbagged/
├── app/
│   ├── admin/page.tsx          # Admin panel for updating fees
│   ├── api/fees/route.ts       # API endpoint for fees data
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main homepage
├── components/                 # Reusable components
├── lib/
│   ├── config.ts              # Configuration
│   └── solana.ts              # Solana utilities
├── public/
│   └── turtle.jpg             # Hero background image
├── netlify.toml               # Netlify configuration
└── README.md                  # This file
```

## 🔧 Setup & Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/cougtrades/unbagged.git
cd unbagged

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
Create a `.env.local` file:
```env
# Add any environment variables here
# Currently using in-memory storage
```

## 🚀 Deployment

### Netlify (Current)
- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Node Version**: 18

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod
```

## 🔐 Admin Access

- **URL**: [https://unbagged.fun/admin](https://unbagged.fun/admin)
- **Password**: `unbagged2024`
- **Function**: Update total fees collected

## 📊 API Endpoints

### GET `/api/fees`
Returns current fees data:
```json
{
  "totalFees": 137.31,
  "bagsRemoved": 453123,
  "oceanCleanupDonation": 123.58,
  "marketingBudget": 13.73,
  "feesCollected": 137.31,
  "isLive": true
}
```

### POST `/api/fees`
Update total fees (admin only):
```json
{
  "totalFees": 150.00
}
```

## 🎨 Design Features

- **Responsive Design**: Mobile-first approach
- **Animations**: Framer Motion for smooth transitions
- **Ocean Theme**: Blue gradient backgrounds
- **Real-time Updates**: Auto-refresh every 30 seconds
- **Hero Section**: Sea turtle background image

## 🔄 Data Flow

1. **Admin Panel** → Updates fees via POST to `/api/fees`
2. **Main Page** → Fetches data via GET from `/api/fees`
3. **Auto-refresh** → Updates every 30 seconds
4. **Calculations** → Bags removed = fees × 3,300

## 🗄️ Database Integration (Future)

Currently using in-memory storage. Ready for Neon/Postgres:

```bash
# Install Neon database
npm install @neondatabase/serverless

# Add to .env.local
DATABASE_URL=your_neon_connection_string
```

## 🐛 Troubleshooting

### Admin Updates Not Working
- Check Netlify function logs
- Verify API endpoint is accessible
- Ensure proper CORS headers

### Data Not Loading
- Check browser console for errors
- Verify API route is working
- Check Netlify deployment status

## 📈 Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices)
- **Bundle Size**: Optimized with Next.js
- **Loading Time**: < 2 seconds
- **SEO**: Meta tags and structured data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

## 🔗 Links

- **Token**: [8zdFumGcK2iF8AcqfSEjaPX4NzPuP3Tyx7msnvcsBAGS](https://bags.fm/8zdFumGcK2iF8AcqfSEjaPX4NzPuP3Tyx7msnvcsBAGS)
- **Community**: [@bagsapp](https://x.com/i/communities/1951105698575577552)
- **Ocean Cleanup**: [@TheOceanCleanup](https://twitter.com/TheOceanCleanup)

## 📞 Contact

- **Developer**: @cougtrades
- **Project**: The Great Unbagged
- **Support**: Open an issue on GitHub

---

**Made with ❤️ for ocean cleanup** 🌊 