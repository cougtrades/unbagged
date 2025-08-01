import { NextResponse } from 'next/server';
import { initDatabase, getFeesData, updateFeesData } from '@/lib/database';

export async function GET() {
  try {
    console.log('🔍 Fetching fees data from Neon database...');
    
    // Initialize database on first request
    await initDatabase();
    
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
      dataSource: 'Neon Database',
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

    // Initialize database
    await initDatabase();
    
    // Update the database
    const result = await updateFeesData(totalFees);
    
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
    
    console.log(`✅ Total fees updated to: ${totalFees} SOL`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Total fees updated successfully!',
      totalFees 
    });
    
  } catch (error) {
    console.error('❌ Error updating total fees:', error);
    return NextResponse.json({ error: 'Failed to update total fees' }, { status: 500 });
  }
} 