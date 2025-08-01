import { NextResponse } from 'next/server';

// In-memory storage for serverless environment
let currentFees = 137.75;

export async function POST(request: Request) {
  try {
    const { totalFees } = await request.json();
    
    if (typeof totalFees !== 'number' || totalFees < 0) {
      return NextResponse.json({ error: 'Invalid total fees value' }, { status: 400 });
    }

    // Update the in-memory value
    currentFees = totalFees;
    
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

// GET endpoint to retrieve current fees
export async function GET() {
  return NextResponse.json({ totalFees: currentFees });
} 