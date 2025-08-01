'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { 
  Waves, 
  Trash2, 
  Heart, 
  DollarSign,
  Activity,
  Twitter,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

// Define the data type locally to avoid importing the old service
interface TokenData {
  totalSupply: number;
  price: number;
  feesCollected: number;
  bagsRemoved: number;
  oceanCleanupDonation: number;
  marketingBudget: number;
  lastTransactionTime?: Date;
  totalTransactions?: number;
  baselineFees?: number;
  additionalFees?: number;
}

// Constants
const BAGS_PER_SOL = 3300;
const OCEAN_CLEANUP_PERCENTAGE = 0.90;

export default function Home() {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<string>('');
  const [solPrice, setSolPrice] = useState<number>(100); // Default fallback price

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔍 Fetching total fees data...');
        const response = await fetch('/api/fees');
        const data = await response.json();
        
        console.log('✅ Data received:', data);
        
        if (data.error) {
          console.warn('⚠️ API returned error:', data.error);
          setError(data.error);
          setIsLive(false);
        } else {
          console.log('✅ Total fees data fetched successfully:', data);
          setError(null);
          setIsLive(data.isLive || false);
          setDataSource(data.dataSource || '');
        }
        
        // Update the state with the new data
        setTokenData({
          totalSupply: data.totalSupply || 0,
          price: data.price || 0,
          feesCollected: data.feesCollected || 0,
          bagsRemoved: data.bagsRemoved || 0,
          oceanCleanupDonation: data.oceanCleanupDonation || 0,
          marketingBudget: data.marketingBudget || 0,
          totalTransactions: data.totalTransactions || 0,
          lastTransactionTime: data.lastTransactionTime ? new Date(data.lastTransactionTime) : undefined,
          baselineFees: data.baselineFees,
          additionalFees: data.additionalFees,
        });
        setLastUpdated(new Date());
        setLoading(false);
      } catch (error) {
        console.error('❌ Error fetching total fees data:', error);
        setError('Failed to fetch total fees data');
        setIsLive(false);
        
        // Show zero data instead of demo numbers
        setTokenData({
          totalSupply: 0,
          price: 0,
          feesCollected: 0,
          bagsRemoved: 0,
          oceanCleanupDonation: 0,
          marketingBudget: 0,
          totalTransactions: 0,
        });
        setLoading(false);
      }
    };

    const fetchSolPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const data = await response.json();
        if (data.solana?.usd) {
          setSolPrice(data.solana.usd);
        }
      } catch (error) {
        console.log('Using fallback SOL price');
      }
    };

    // Initial data fetch
    fetchData();
    fetchSolPrice();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    const priceInterval = setInterval(fetchSolPrice, 60000); // Update price every minute
    
    return () => {
      clearInterval(interval);
      clearInterval(priceInterval);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-50 to-ocean-100 overflow-x-hidden">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ocean-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading ocean cleanup impact...</p>
          {error && (
            <p className="mt-2 text-red-500 text-sm">Error: {error}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 to-ocean-100 relative overflow-x-hidden">
      {/* Fixed background gradient that covers the entire viewport */}
      <div className="fixed inset-0 bg-gradient-to-br from-ocean-50 to-ocean-100 -z-10"></div>
      {/* Hero Section with Sea Turtle Image */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 hero-bg"
          style={{
            backgroundImage: `url('/turtle.jpg')`
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6">
              The Great Unbagging
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
              For every 1 SOL in fees, <span className="font-bold">3,300 bags</span> are removed from the ocean.
            </p>
            
            <div className="flex flex-col items-center gap-4 mb-6 sm:mb-8">
              <span className="bg-white/20 px-3 sm:px-6 py-2 sm:py-3 rounded-full backdrop-blur-sm text-sm sm:text-lg font-medium break-all sm:break-normal">
                CA: 8zdFumGcK2iF8AcqfSEjaPX4NzPuP3Tyx7msnvcsBAGS
              </span>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 sm:gap-6">
              <a 
                href="https://x.com/i/communities/1951105698575577552" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img src="/logo-white.png" alt="X Community" className="w-8 h-8 sm:w-10 sm:h-10" />
              </a>
              
              <a 
                href="https://bags.fm/8zdFumGcK2iF8AcqfSEjaPX4NzPuP3Tyx7msnvcsBAGS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img src="/bags-icon.png" alt="Bags.fm" className="w-8 h-8 sm:w-10 sm:h-10 filter brightness-0 invert" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bouncing Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <ChevronDown className="w-8 h-8 animate-pulse" />
        </motion.div>

      </motion.div>



      {/* Main Impact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-4 sm:mb-6">
            Ocean Cleanup Impact
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 px-2">Real-time tracking of bags removed from the ocean</p>
          {error && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-yellow-800">
                <span>⚠️ {error}</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Big Bags Removed Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-2xl border border-white/20">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
              <Trash2 className="w-12 h-12 sm:w-16 sm:h-16 text-unbagged-500 mb-2 sm:mb-0 sm:mr-4" />
              <h3 className="text-2xl sm:text-4xl font-bold text-gray-900">Bags Removed</h3>
            </div>
            <div className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-unbagged-600 mb-4">
              <CountUp 
                end={tokenData?.bagsRemoved || 0} 
                duration={1}
                separator=","
                useEasing={true}
                start={0}
                key={`bags-${tokenData?.bagsRemoved || 0}`}
              />
            </div>
            <p className="text-lg sm:text-xl text-gray-600">from the ocean</p>
          </div>
        </motion.div>

        {/* Impact Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 text-center"
          >
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-ocean-500" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Ocean Cleanup</h3>
            <div className="text-3xl sm:text-4xl font-bold text-ocean-600 mb-2">
              <CountUp 
                end={tokenData?.oceanCleanupDonation || 0} 
                duration={1}
                decimals={2}
                useEasing={true}
                start={0}
                key={`ocean-sol-${tokenData?.oceanCleanupDonation || 0}`}
              /> SOL
            </div>
            <div className="text-lg sm:text-xl font-semibold text-ocean-500 mb-2">
              $<CountUp 
                end={(tokenData?.oceanCleanupDonation || 0) * solPrice} 
                duration={1}
                separator=","
                useEasing={true}
                start={0}
                key={`ocean-usd-${(tokenData?.oceanCleanupDonation || 0) * solPrice}`}
              />
            </div>
            <p className="text-sm sm:text-base text-gray-600">90% of fees donated</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 text-center"
          >
            <DollarSign className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-yellow-500" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Fees Collected</h3>
            <div className="text-3xl sm:text-4xl font-bold text-yellow-600 mb-2">
              <CountUp 
                end={tokenData?.feesCollected || 0} 
                duration={1}
                decimals={2}
                useEasing={true}
                start={0}
                key={`fees-sol-${tokenData?.feesCollected || 0}`}
              /> SOL
            </div>
            <div className="text-lg sm:text-xl font-semibold text-yellow-500 mb-2">
              $<CountUp 
                end={(tokenData?.feesCollected || 0) * solPrice} 
                duration={1}
                separator=","
                useEasing={true}
                start={0}
                key={`fees-usd-${(tokenData?.feesCollected || 0) * solPrice}`}
              />
            </div>
            <p className="text-sm sm:text-base text-gray-600">total trading fees</p>
          </motion.div>


        </div>


      </div>


    </div>
  );
} 