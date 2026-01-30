import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'hooli.db');
const db = new Database(dbPath);

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image_url TEXT,
    category TEXT,
    stock INTEGER DEFAULT 100
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    total REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    shipping_address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

// Seed products if empty
const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
if (productCount.count === 0) {
  const insertProduct = db.prepare(`
    INSERT INTO products (name, description, price, image_url, category)
    VALUES (?, ?, ?, ?, ?)
  `);

  const products = [
    ['Hooli Phone X', 'Next-generation smartphone with AI capabilities', 999.99, '/products/phone.jpg', 'Electronics'],
    ['Hooli Smart Watch', 'Track your health and stay connected', 349.99, '/products/watch.jpg', 'Electronics'],
    ['Hooli Cloud Storage', 'Secure cloud storage solution - 1TB', 9.99, '/products/cloud.jpg', 'Services'],
    ['Hooli Enterprise Suite', 'Complete business productivity tools', 299.99, '/products/enterprise.jpg', 'Software'],
    ['Hooli Smart Home Hub', 'Control your entire home ecosystem', 199.99, '/products/hub.jpg', 'Electronics'],
    ['Hooli Security Pro', 'Advanced cybersecurity protection', 149.99, '/products/security.jpg', 'Software'],
  ];

  for (const product of products) {
    insertProduct.run(...product);
  }
}

export default db;

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
