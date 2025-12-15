import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db';

// POST /api/init-db
// Call this once to initialize the database tables
export async function POST() {
  try {
    await initializeDatabase();
    return NextResponse.json({ 
      success: true, 
      message: 'Database initialized successfully' 
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json(
      { error: 'Failed to initialize database', details: error.message },
      { status: 500 }
    );
  }
}

// GET /api/init-db
// Health check for database connection
export async function GET() {
  try {
    // Just check if environment variable is set
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { 
          error: 'DATABASE_URL environment variable is not set',
          help: 'Add DATABASE_URL to your .env.local file'
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection configured. Use POST to initialize tables.' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Database configuration error', details: error.message },
      { status: 500 }
    );
  }
}
