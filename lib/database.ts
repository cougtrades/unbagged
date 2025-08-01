import { neon } from '@neondatabase/serverless';

// Get the database URL from environment variables
const sql = neon(process.env.DATABASE_URL!);

// Initialize the database table if it doesn't exist
export async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS fees_data (
        id SERIAL PRIMARY KEY,
        total_fees DECIMAL(10,2) NOT NULL DEFAULT 137.31,
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

// Get current fees data
export async function getFeesData() {
  try {
    const result = await sql`
      SELECT total_fees, last_updated 
      FROM fees_data 
      ORDER BY id DESC 
      LIMIT 1
    `;
    
    if (result.length > 0) {
      return {
        totalFees: parseFloat(result[0].total_fees),
        lastUpdated: result[0].last_updated
      };
    }
    
    return {
      totalFees: 137.31,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching fees data:', error);
    return {
      totalFees: 137.31,
      lastUpdated: new Date().toISOString()
    };
  }
}

// Update fees data
export async function updateFeesData(totalFees: number) {
  try {
    await sql`
      INSERT INTO fees_data (total_fees, last_updated)
      VALUES (${totalFees}, CURRENT_TIMESTAMP)
    `;
    
    return { success: true, totalFees };
  } catch (error) {
    console.error('Error updating fees data:', error);
    return { success: false, error: 'Failed to update fees' };
  }
} 