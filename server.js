const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory data storage
let salesData = [
  {
    id: 1,
    date: '2024-01-15',
    productName: 'Sulfuric Acid',
    quantity: 500,
    unitPrice: 150,
    cost: 50000,
    customerName: 'ABC Industries'
  },
  {
    id: 2,
    date: '2024-01-20',
    productName: 'Hydrochloric Acid',
    quantity: 300,
    unitPrice: 120,
    cost: 25000,
    customerName: 'XYZ Corp'
  },
  {
    id: 3,
    date: '2024-02-05',
    productName: 'Sodium Hydroxide',
    quantity: 700,
    unitPrice: 90,
    cost: 45000,
    customerName: 'PQR Ltd'
  }
];

let products = [
  { id: 1, name: 'Sulfuric Acid', category: 'Acid', unit: 'Liters' },
  { id: 2, name: 'Hydrochloric Acid', category: 'Acid', unit: 'Liters' },
  { id: 3, name: 'Sodium Hydroxide', category: 'Base', unit: 'Kg' },
  { id: 4, name: 'Nitric Acid', category: 'Acid', unit: 'Liters' },
  { id: 5, name: 'Acetic Acid', category: 'Acid', unit: 'Liters' }
];

// API Routes

// Get all sales
app.get('/api/sales', (req, res) => {
  res.json(salesData);
});

// Get single sale
app.get('/api/sales/:id', (req, res) => {
  const sale = salesData.find(s => s.id === parseInt(req.params.id));
  if (!sale) {
    return res.status(404).json({ error: 'Sale not found' });
  }
  res.json(sale);
});

// Create new sale
app.post('/api/sales', (req, res) => {
  const newSale = {
    id: salesData.length > 0 ? Math.max(...salesData.map(s => s.id)) + 1 : 1,
    ...req.body
  };
  salesData.push(newSale);
  res.status(201).json(newSale);
});

// Update sale
app.put('/api/sales/:id', (req, res) => {
  const index = salesData.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Sale not found' });
  }
  salesData[index] = { ...salesData[index], ...req.body, id: parseInt(req.params.id) };
  res.json(salesData[index]);
});

// Delete sale
app.delete('/api/sales/:id', (req, res) => {
  const index = salesData.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Sale not found' });
  }
  salesData.splice(index, 1);
  res.json({ message: 'Sale deleted successfully' });
});

// Get analytics/dashboard data
app.get('/api/analytics', (req, res) => {
  const totalSales = salesData.reduce((sum, sale) => sum + (sale.quantity * sale.unitPrice), 0);
  const totalCost = salesData.reduce((sum, sale) => sum + sale.cost, 0);
  const totalProfit = totalSales - totalCost;
  const profitMargin = totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(2) : 0;
  
  const salesByProduct = {};
  salesData.forEach(sale => {
    if (!salesByProduct[sale.productName]) {
      salesByProduct[sale.productName] = {
        quantity: 0,
        revenue: 0,
        cost: 0
      };
    }
    salesByProduct[sale.productName].quantity += sale.quantity;
    salesByProduct[sale.productName].revenue += sale.quantity * sale.unitPrice;
    salesByProduct[sale.productName].cost += sale.cost;
  });

  res.json({
    totalSales,
    totalCost,
    totalProfit,
    profitMargin,
    totalTransactions: salesData.length,
    salesByProduct
  });
});

// Product routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Chemical Company Management System running on http://localhost:${PORT}`);
});
