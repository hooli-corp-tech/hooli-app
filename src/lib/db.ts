import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Initialize database tables
export async function initDB() {
  // Skip DB init during build time to avoid race conditions with multiple workers
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return;
  }

  const client = await pool.connect();
  try {
    // Use advisory lock to prevent race conditions
    await client.query('SELECT pg_advisory_lock(12345)');

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP NOT NULL
      );

      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        image_url TEXT,
        category TEXT,
        stock INTEGER DEFAULT 100
      );

      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        total REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        shipping_address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL REFERENCES orders(id),
        product_id INTEGER NOT NULL REFERENCES products(id),
        quantity INTEGER NOT NULL,
        price REAL NOT NULL
      );
    `);

    await client.query('SELECT pg_advisory_unlock(12345)');

    // Seed products if empty
    const result = await client.query('SELECT COUNT(*) as count FROM products');
    if (parseInt(result.rows[0].count) === 0) {
      const products = [
        ['Hooli Phone X', 'Next-generation smartphone with AI capabilities', 999.99, '/products/phone.jpg', 'Electronics'],
        ['Hooli Smart Watch', 'Track your health and stay connected', 349.99, '/products/watch.jpg', 'Electronics'],
        ['Hooli Cloud Storage', 'Secure cloud storage solution - 1TB', 9.99, '/products/cloud.jpg', 'Services'],
        ['Hooli Enterprise Suite', 'Complete business productivity tools', 299.99, '/products/enterprise.jpg', 'Software'],
        ['Hooli Smart Home Hub', 'Control your entire home ecosystem', 199.99, '/products/hub.jpg', 'Electronics'],
        ['Hooli Security Pro', 'Advanced cybersecurity protection', 149.99, '/products/security.jpg', 'Software'],
      ];

      for (const product of products) {
        await client.query(
          'INSERT INTO products (name, description, price, image_url, category) VALUES ($1, $2, $3, $4, $5)',
          product
        );
      }
    }
  } finally {
    client.release();
  }
}

// Initialize on first import
let initialized = false;
export async function ensureDB() {
  if (!initialized) {
    await initDB();
    initialized = true;
  }
}

export default pool;

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  created_at: string;
}

export interface Session {
  id: string;
  user_id: number;
  created_at: string;
  expires_at: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
}

export interface Order {
  id: number;
  user_id: number;
  total: number;
  status: string;
  shipping_address: string;
  created_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}
