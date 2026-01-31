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

      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        is_private BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS bank_accounts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        account_number TEXT NOT NULL,
        balance REAL DEFAULT 0,
        ssn TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS admin_logs (
        id SERIAL PRIMARY KEY,
        admin_id INTEGER NOT NULL REFERENCES users(id),
        action TEXT NOT NULL,
        target_user_id INTEGER,
        details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS api_keys (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        key TEXT UNIQUE NOT NULL,
        name TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

    // Seed test users if empty (for IDOR testing)
    const userResult = await client.query('SELECT COUNT(*) as count FROM users');
    if (parseInt(userResult.rows[0].count) === 0) {
      // Password: password123 (hashed)
      const hashedPassword = 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f';

      const users = [
        ['admin@hooli-corp.org', hashedPassword, 'Admin User', 'admin'],
        ['alice@example.com', hashedPassword, 'Alice Johnson', 'user'],
        ['bob@example.com', hashedPassword, 'Bob Smith', 'user'],
        ['charlie@example.com', hashedPassword, 'Charlie Brown', 'user'],
      ];

      for (const user of users) {
        await client.query(
          'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4)',
          user
        );
      }

      // Seed documents
      await client.query(`
        INSERT INTO documents (user_id, title, content, is_private) VALUES
        (2, 'My Private Notes', 'These are Alice''s confidential notes about the project.', true),
        (2, 'Public Announcement', 'This is a public document anyone can read.', false),
        (3, 'Bob''s Secret Plans', 'Bob''s secret business strategy for 2026.', true),
        (3, 'Meeting Notes', 'Notes from the team meeting.', false),
        (4, 'SSN and Passwords', 'SENSITIVE: SSN: 123-45-6789, Banking PIN: 1234', true)
      `);

      // Seed bank accounts (SENSITIVE DATA)
      await client.query(`
        INSERT INTO bank_accounts (user_id, account_number, balance, ssn) VALUES
        (2, '1234567890', 50000.00, '123-45-6789'),
        (3, '9876543210', 75000.00, '987-65-4321'),
        (4, '5555555555', 100000.00, '555-55-5555')
      `);

      // Seed orders
      await client.query(`
        INSERT INTO orders (user_id, total, status, shipping_address) VALUES
        (2, 1349.98, 'completed', '123 Main St, San Francisco, CA 94102'),
        (2, 999.99, 'pending', '123 Main St, San Francisco, CA 94102'),
        (3, 299.99, 'completed', '456 Oak Ave, Palo Alto, CA 94301'),
        (4, 149.99, 'shipped', '789 Pine Rd, Mountain View, CA 94040')
      `);

      // Seed admin logs
      await client.query(`
        INSERT INTO admin_logs (admin_id, action, target_user_id, details) VALUES
        (1, 'USER_CREATED', 2, 'Created user alice@example.com'),
        (1, 'USER_MODIFIED', 3, 'Changed role for bob@example.com'),
        (1, 'SECURITY_ALERT', 4, 'Suspicious login attempt detected')
      `);
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

export interface Document {
  id: number;
  user_id: number;
  title: string;
  content: string;
  is_private: boolean;
  created_at: string;
}

export interface BankAccount {
  id: number;
  user_id: number;
  account_number: string;
  balance: number;
  ssn: string;
  created_at: string;
}

export interface AdminLog {
  id: number;
  admin_id: number;
  action: string;
  target_user_id: number | null;
  details: string;
  created_at: string;
}
