import { neon } from '@neondatabase/serverless';

// Get database URL from Netlify's Neon extension
// Netlify automatically provides this environment variable
const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.PRIMARY_DATABASE_URL!);

// Initialize database table
export async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS fees_data (
        id SERIAL PRIMARY KEY,
        total_fees DECIMAL(20, 8) NOT NULL DEFAULT 137.31,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    // Insert default data if table is empty
    const existingData = await sql`SELECT COUNT(*) as count FROM fees_data`;
    if (existingData[0].count === 0) {
      await sql`
        INSERT INTO fees_data (total_fees, last_updated) 
        VALUES (137.31, CURRENT_TIMESTAMP)
      `;
    }
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Get current fees
export async function getCurrentFees(): Promise<number> {
  try {
    const result = await sql`
      SELECT total_fees FROM fees_data 
      ORDER BY last_updated DESC 
      LIMIT 1
    `;
    return result[0]?.total_fees || 137.31;
  } catch (error) {
    console.error('Error getting fees:', error);
    return 137.31;
  }
}

// Update fees
export async function updateFees(newFees: number): Promise<boolean> {
  try {
    await sql`
      INSERT INTO fees_data (total_fees, last_updated) 
      VALUES (${newFees}, CURRENT_TIMESTAMP)
    `;
    return true;
  } catch (error) {
    console.error('Error updating fees:', error);
    return false;
  }
}

// Get fees with timestamp
export async function getFeesData() {
  try {
    const result = await sql`
      SELECT total_fees, last_updated FROM fees_data 
      ORDER BY last_updated DESC 
      LIMIT 1
    `;
    return {
      totalFees: result[0]?.total_fees || 137.31,
      lastUpdated: result[0]?.last_updated || new Date().toISOString()
    };
  } catch (error) {
    console.error('Error getting fees data:', error);
    return {
      totalFees: 137.31,
      lastUpdated: new Date().toISOString()
    };
  }
} 