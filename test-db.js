// Test script to verify Neon database connection
// Run with: node test-db.js

const { neon } = require('@neondatabase/serverless');

async function testDatabase() {
  // You need to replace this with your actual Neon database connection string
  const databaseUrl = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;
  
  if (!databaseUrl) {
    console.log('❌ No DATABASE_URL found in environment variables');
    console.log('Please set DATABASE_URL with your Neon database connection string');
    console.log('Format: postgresql://username:password@host/database?sslmode=require');
    return;
  }

  console.log('🔗 Testing database connection...');
  
  try {
    const sql = neon(databaseUrl);
    
    // Test the connection
    const result = await sql`SELECT NOW() as current_time`;
    console.log('✅ Database connection successful!');
    console.log('Current time from database:', result[0].current_time);
    
    // Test if fees_data table exists
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'fees_data'
      ) as table_exists
    `;
    
    if (tableCheck[0].table_exists) {
      console.log('✅ fees_data table exists');
      
      // Check current data
      const feesData = await sql`SELECT * FROM fees_data ORDER BY id DESC LIMIT 1`;
      if (feesData.length > 0) {
        console.log('📊 Current fees data:', feesData[0]);
      } else {
        console.log('📝 No fees data found, table is empty');
      }
    } else {
      console.log('⚠️ fees_data table does not exist, will be created on first use');
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure your DATABASE_URL is correct');
    console.log('2. Check if your Neon database is active');
    console.log('3. Verify your database credentials');
    console.log('4. Ensure your IP is allowed (if using IP restrictions)');
  }
}

testDatabase(); 