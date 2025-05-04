// src/db/connection.ts
import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'docker';

let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  // Return cached DB if it's already connected
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    cachedDb = client.db(DB_NAME); // Cache the database connection
    console.log('Successfully connected to MongoDB');
    return cachedDb;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;  // Rethrow the error so it can be handled at the higher level
  }
}
