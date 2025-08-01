import { NextResponse } from 'next/server';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

// File-based storage for persistence across serverless instances
const STORAGE_FILE = join(process.cwd(), 'data', 'fees.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = join(process.cwd(), 'data');
  if (!existsSync(dataDir)) {
    try {
      const fs = require('fs');
      fs.mkdirSync(dataDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create data directory:', error);
    }
  }
};

// Read fees data from file or use default
const readFeesData = () => {
  try {
    ensureDataDir();
    if (existsSync(STORAGE_FILE)) {
      const data = readFileSync(STORAGE_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading fees data:', error);
  }
  
  // Default data
  return {
    totalFees: 137.31,
    lastUpdated: new Date().toISOString()
  };
};

// Write fees data to file
const writeFeesData = (data: any) => {
  try {
    ensureDataDir();
    writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing fees data:', error);
    return false;
  }
};

export async function GET() {
  try {
    console.log('🔍 Fetching fees data from persistent storage...');
    
    const feesData = readFeesData();
    const totalFees = feesData.totalFees;
    const totalSupply = 999999366.7835349;
    const bagsPerSol = 3300;
    const oceanCleanupPercentage = 0.90;
    const marketingPercentage = 0.10;
    
    // Calculate derived data
    const bagsRemoved = totalFees * bagsPerSol;
    const oceanCleanup = totalFees * oceanCleanupPercentage;
    const marketing = totalFees * marketingPercentage;
    
    const result = {
      totalFees,
      bagsRemoved: Math.round(bagsRemoved),
      oceanCleanupDonation: oceanCleanup,
      marketingBudget: marketing,
      totalSupply,
      price: 0,
      feesCollected: totalFees,
      totalTransactions: Math.round(bagsRemoved / 100),
      lastTransactionTime: feesData.lastUpdated || new Date().toISOString(),
      dataSource: 'Persistent Storage',
      isLive: true,
      baselineFees: totalFees,
      additionalFees: 0,
    };
    
    console.log('✅ Fees data ready:');
    console.log(`   Total Fees: ${totalFees} SOL`);
    console.log(`   Bags Removed: ${bagsRemoved.toLocaleString()} bags`);
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('❌ Error in fees data fetch:', error);
    
    // Return fallback data
    const fallbackData = {
      totalFees: 137.31,
      bagsRemoved: 453123,
      oceanCleanupDonation: 123.58,
      marketingBudget: 13.73,
      totalSupply: 999999366.7835349,
      price: 0,
      feesCollected: 137.31,
      totalTransactions: 4531,
      lastTransactionTime: new Date().toISOString(),
      dataSource: 'Fallback',
      isLive: false,
      baselineFees: 137.31,
      additionalFees: 0,
    };
    
    return NextResponse.json(fallbackData);
  }
}

// POST endpoint to update fees (for admin use)
export async function POST(request: Request) {
  try {
    const { totalFees } = await request.json();
    
    if (typeof totalFees !== 'number' || totalFees < 0) {
      return NextResponse.json({ error: 'Invalid total fees value' }, { status: 400 });
    }

    // Update the persistent storage
    const success = writeFeesData({
      totalFees,
      lastUpdated: new Date().toISOString()
    });
    
    if (!success) {
      return NextResponse.json({ error: 'Failed to save fees data' }, { status: 500 });
    }
    
    console.log(`✅ Total fees updated to: ${totalFees} SOL`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Total fees updated successfully',
      totalFees 
    });
    
  } catch (error) {
    console.error('❌ Error updating total fees:', error);
    return NextResponse.json({ error: 'Failed to update total fees' }, { status: 500 });
  }
} 