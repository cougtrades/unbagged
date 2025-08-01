'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Waves, 
  Trash2, 
  Heart, 
  DollarSign,
  Activity,
  Twitter,
  ExternalLink
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

    // Initial data fetch
    fetchData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-50 to-ocean-100">
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
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 to-ocean-100 relative">
      {/* Fixed background gradient that covers the entire viewport */}
      <div className="fixed inset-0 bg-gradient-to-br from-ocean-50 to-ocean-100 -z-10"></div>
      {/* Hero Section with Sea Turtle Image */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/turtle.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              The Great Unbagging
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              For every 1 SOL in fees, <span className="font-bold">3,300 bags</span> are removed from the ocean.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
              <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                Token: 8zdFumGcK2iF8AcqfSEjaPX4NzPuP3Tyx7msnvcsBAGS
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                Powered by @bagsapp
              </span>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6">
              <a 
                href="https://x.com/i/communities/1951105698575577552" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span>Community</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              
              <a 
                href="https://bags.fm/8zdFumGcK2iF8AcqfSEjaPX4NzPuP3Tyx7msnvcsBAGS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                <span>Bags.fm</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </motion.div>



      {/* Main Impact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Ocean Cleanup Impact
          </h2>
          <p className="text-xl text-gray-600">Real-time tracking of bags removed from the ocean</p>
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
          className="text-center mb-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
            <div className="flex items-center justify-center mb-6">
              <Trash2 className="w-16 h-16 text-unbagged-500 mr-4" />
              <h3 className="text-4xl font-bold text-gray-900">Bags Removed</h3>
            </div>
            <div className="text-8xl md:text-9xl font-bold text-unbagged-600 mb-4">
              {(tokenData?.bagsRemoved || 0).toLocaleString()}
            </div>
            <p className="text-xl text-gray-600">from the ocean</p>
          </div>
        </motion.div>

        {/* Impact Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 text-center"
          >
            <Heart className="w-12 h-12 mx-auto mb-4 text-ocean-500" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ocean Cleanup</h3>
            <div className="text-4xl font-bold text-ocean-600 mb-2">
              {(tokenData?.oceanCleanupDonation || 0).toFixed(2)} SOL
            </div>
            <p className="text-gray-600">90% of fees donated</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 text-center"
          >
            <DollarSign className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Fees Collected</h3>
            <div className="text-4xl font-bold text-yellow-600 mb-2">
              {(tokenData?.feesCollected || 0).toFixed(2)} SOL
            </div>
            <p className="text-gray-600">total trading fees</p>
          </motion.div>


        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">The Mission</h4>
                <p className="text-gray-600">
                  Every time someone trades the unbagged token, a portion of the fees goes directly to ocean cleanup efforts. 
                  For every 1 SOL in fees, 3,300 bags are removed from the ocean.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">The Impact</h4>
                <p className="text-gray-600">
                  90% of all fees collected are donated directly to @TheOceanCleanup, 
                  while 10% is used for marketing to spread awareness about ocean pollution.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-900 text-white py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg mb-4">
            Join the movement to clean our oceans, one bag at a time.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>@TheOceanCleanup</span>
            <span>@bagsapp</span>
            <span>#Unbagged</span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
} 