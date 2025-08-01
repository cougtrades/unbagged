import { neon } from '@neondatabase/serverless';

// Lazy database connection - only created when needed at runtime
let sql: any = null;

function getDatabaseConnection() {
  if (!sql) {
    const databaseUrl = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;
    if (databaseUrl) {
      sql = neon(databaseUrl);
    }
  }
  return sql;
}

// Initialize the database table if it doesn't exist
export async function initDatabase() {
  const db = getDatabaseConnection();
  if (!db) {
    console.log('No database connection available, skipping initialization');
    return;
  }
  
  try {
    await db`
      CREATE TABLE IF NOT EXISTS fees_data (
        id SERIAL PRIMARY KEY,
        total_fees DECIMAL(10,2) NOT NULL DEFAULT 137.31,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    // Insert default data if table is empty
    const existingData = await db`SELECT COUNT(*) as count FROM fees_data`;
    if (existingData[0].count === 0) {
      await db`
        INSERT INTO fees_data (total_fees, last_updated)
        VALUES (139.89, CURRENT_TIMESTAMP)
      `;
    }
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Get current fees data
export async function getFeesData() {
  const db = getDatabaseConnection();
  if (!db) {
    console.log('No database connection available, using fallback data');
    return {
      totalFees: 139.89,
      lastUpdated: new Date().toISOString()
    };
  }
  
  try {
    const result = await db`
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
      totalFees: 139.89,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching fees data:', error);
    return {
      totalFees: 139.89,
      lastUpdated: new Date().toISOString()
    };
  }
}

// Update fees data
export async function updateFeesData(totalFees: number) {
  const db = getDatabaseConnection();
  if (!db) {
    console.log('No database connection available, cannot update fees');
    return { success: false, error: 'Database not available' };
  }
  
  try {
    await db`
      INSERT INTO fees_data (total_fees, last_updated)
      VALUES (${totalFees}, CURRENT_TIMESTAMP)
    `;
    
    return { success: true, totalFees };
  } catch (error) {
    console.error('Error updating fees data:', error);
    return { success: false, error: 'Failed to update fees' };
  }
} 