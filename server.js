const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'db.json');
const PUBLIC_DIR = path.join(__dirname, 'public');

// Helper to read DB
function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return { motorcycles: [], brands: [], categories: [], orders: [], preOrders: [], settings: {} };
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB:', err);
    return { motorcycles: [], brands: [], categories: [], orders: [], preOrders: [], settings: {} };
  }
}

// Helper to write DB
function writeDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing DB:', err);
    return false;
  }
}

// MIME Types mapping
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

// Main Request Handler
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Handle REST API Routes
  if (pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json');

    // GET /api/data
    if (pathname === '/api/data' && req.method === 'GET') {
      const db = readDB();
      res.writeHead(200);
      res.end(JSON.stringify(db));
      return;
    }

    // POST /api/motorcycles (Add motorcycle)
    if (pathname === '/api/motorcycles' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const bikeData = JSON.parse(body);
          const db = readDB();
          bikeData.id = 'bike-' + Date.now();
          db.motorcycles.unshift(bikeData);
          writeDB(db);
          res.writeHead(201);
          res.end(JSON.stringify({ success: true, motorcycle: bikeData }));
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
        }
      });
      return;
    }

    // PUT /api/motorcycles/:id (Update motorcycle)
    if (pathname.startsWith('/api/motorcycles/') && req.method === 'PUT') {
      const bikeId = pathname.replace('/api/motorcycles/', '');
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const updatedBike = JSON.parse(body);
          const db = readDB();
          const index = db.motorcycles.findIndex(b => b.id === bikeId);
          if (index !== -1) {
            db.motorcycles[index] = { ...db.motorcycles[index], ...updatedBike };
            writeDB(db);
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, motorcycle: db.motorcycles[index] }));
          } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Motorcycle not found' }));
          }
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      return;
    }

    // DELETE /api/motorcycles/:id
    if (pathname.startsWith('/api/motorcycles/') && req.method === 'DELETE') {
      const bikeId = pathname.replace('/api/motorcycles/', '');
      const db = readDB();
      db.motorcycles = db.motorcycles.filter(b => b.id !== bikeId);
      writeDB(db);
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, id: bikeId }));
      return;
    }

    // POST /api/orders (Create Order)
    if (pathname === '/api/orders' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const order = JSON.parse(body);
          const db = readDB();
          order.id = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
          order.date = new Date().toISOString();
          if (!order.orderStatus) order.orderStatus = 'Processing';
          if (!order.paymentStatus) order.paymentStatus = 'Paid';
          
          db.orders.unshift(order);
          // Deduct stock if bike exists
          const bike = db.motorcycles.find(b => b.id === order.motorcycleId);
          if (bike && bike.stock > 0) {
            bike.stock -= 1;
            bike.sold = (bike.sold || 0) + 1;
            if (bike.stock === 0) bike.availability = 'Out of Stock';
          }
          writeDB(db);
          res.writeHead(201);
          res.end(JSON.stringify({ success: true, order }));
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Invalid Order Request' }));
        }
      });
      return;
    }

    // POST /api/preorders (Create Pre-Order)
    if (pathname === '/api/preorders' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const preOrder = JSON.parse(body);
          const db = readDB();
          preOrder.id = 'PRE-' + Math.floor(100 + Math.random() * 900);
          preOrder.date = new Date().toISOString();
          if (!preOrder.status) preOrder.status = 'Confirmed';
          if (!preOrder.paymentStatus) preOrder.paymentStatus = 'Deposit Paid';
          
          db.preOrders.unshift(preOrder);
          // Update reserved units on bike
          const bike = db.motorcycles.find(b => b.id === preOrder.motorcycleId);
          if (bike) {
            bike.reserved = (bike.reserved || 0) + 1;
          }
          writeDB(db);
          res.writeHead(201);
          res.end(JSON.stringify({ success: true, preOrder }));
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Invalid Pre-Order Request' }));
        }
      });
      return;
    }

    // PUT /api/orders/:id (Update Order status)
    if (pathname.startsWith('/api/orders/') && req.method === 'PUT') {
      const orderId = pathname.replace('/api/orders/', '');
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const updateData = JSON.parse(body);
          const db = readDB();
          const idx = db.orders.findIndex(o => o.id === orderId);
          if (idx !== -1) {
            db.orders[idx] = { ...db.orders[idx], ...updateData };
            writeDB(db);
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, order: db.orders[idx] }));
          } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Order not found' }));
          }
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      return;
    }

    // PUT /api/preorders/:id (Update Pre-order status)
    if (pathname.startsWith('/api/preorders/') && req.method === 'PUT') {
      const preOrderId = pathname.replace('/api/preorders/', '');
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const updateData = JSON.parse(body);
          const db = readDB();
          const idx = db.preOrders.findIndex(p => p.id === preOrderId);
          if (idx !== -1) {
            db.preOrders[idx] = { ...db.preOrders[idx], ...updateData };
            writeDB(db);
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, preOrder: db.preOrders[idx] }));
          } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Pre-order not found' }));
          }
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      return;
    }

    // PUT /api/settings
    if (pathname === '/api/settings' && req.method === 'PUT') {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const newSettings = JSON.parse(body);
          const db = readDB();
          db.settings = { ...db.settings, ...newSettings };
          writeDB(db);
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, settings: db.settings }));
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Invalid Settings' }));
        }
      });
      return;
    }

    // 404 for unmatched API routes
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
    return;
  }

  // Serve Static Files
  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);

  // Security check for directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA routing if requested URL isn't a direct asset file
      const ext = path.extname(filePath);
      if (!ext || ext === '.html') {
        filePath = path.join(PUBLIC_DIR, 'index.html');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(500);
        res.end('Server Error: ' + error.code);
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` 🏍️  UZair Bike Showroom Server running on port ${PORT}`);
  console.log(` 🚀 Access website at: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
