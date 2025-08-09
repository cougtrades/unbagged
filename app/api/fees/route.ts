import { NextResponse } from 'next/server';
import { initDatabase, getFeesData, updateFeesData } from '../../../lib/database';

export async function GET() {
  try {
    console.log('🔍 Fetching fees data from Neon database...');
    
    // Initialize database on first request
    try {
      await initDatabase();
    } catch (dbError) {
      console.error('❌ Database initialization failed:', dbError);
      // Continue with fallback data
    }
    
    // Get fees data from database
    const feesData = await getFeesData();
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
      lastTransactionTime: feesData.lastUpdated,
      dataSource: feesData.totalFees === 139.89 ? 'Fallback' : 'Neon Database',
      isLive: feesData.totalFees !== 139.89,
      baselineFees: totalFees,
      additionalFees: 0,
    };
    
    console.log('✅ Fees data ready:');
    console.log(`   Total Fees: ${totalFees} SOL`);
    console.log(`   Bags Removed: ${bagsRemoved.toLocaleString()} bags`);
    console.log(`   Data Source: ${result.dataSource}`);
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('❌ Error in fees data fetch:', error);
    
    // Return fallback data
    const fallbackData = {
      totalFees: 139.89,
      bagsRemoved: 461637,
      oceanCleanupDonation: 125.90,
      marketingBudget: 13.99,
      totalSupply: 999999366.7835349,
      price: 0,
      feesCollected: 139.89,
      totalTransactions: 4616,
      lastTransactionTime: new Date().toISOString(),
      dataSource: 'Fallback',
      isLive: false,
      baselineFees: 139.89,
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

    console.log(`💾 Attempting to update fees to ${totalFees} SOL...`);

    // Initialize database
    try {
      await initDatabase();
    } catch (dbError) {
      console.error('❌ Database initialization failed:', dbError);
      return NextResponse.json({ 
        error: 'Database not available. Please check your DATABASE_URL environment variable.' 
      }, { status: 500 });
    }
    
    // Update the database
    const result = await updateFeesData(totalFees);
    
    if (!result.success) {
      console.error('❌ Failed to update fees:', result.error);
      return NextResponse.json({ 
        error: result.error || 'Failed to update fees' 
      }, { status: 500 });
    }
    
    console.log(`✅ Total fees updated to: ${totalFees} SOL`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Total fees updated successfully!',
      totalFees 
    });
    
  } catch (error) {
    console.error('❌ Error updating total fees:', error);
    return NextResponse.json({ 
      error: `Failed to update total fees: ${error.message}` 
    }, { status: 500 });
  }
} 