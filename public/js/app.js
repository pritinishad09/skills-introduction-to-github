// API Base URL
const API_BASE_URL = window.location.origin;

// Tab Navigation
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        // Update active button
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update active tab content
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(tabName).classList.add('active');
        
        // Load data for specific tabs
        if (tabName === 'dashboard') {
            loadDashboard();
        } else if (tabName === 'sales') {
            loadSalesTable();
        } else if (tabName === 'products') {
            loadProducts();
        } else if (tabName === 'reports') {
            loadReports();
        }
    });
});

// Load Dashboard Data
async function loadDashboard() {
    try {
        const [analyticsRes, salesRes] = await Promise.all([
            fetch(`${API_BASE_URL}/api/analytics`),
            fetch(`${API_BASE_URL}/api/sales`)
        ]);
        
        const analytics = await analyticsRes.json();
        const sales = await salesRes.json();
        
        // Update stats
        document.getElementById('totalSales').textContent = `₹${analytics.totalSales.toLocaleString()}`;
        document.getElementById('totalProfit').textContent = `₹${analytics.totalProfit.toLocaleString()}`;
        document.getElementById('totalCost').textContent = `₹${analytics.totalCost.toLocaleString()}`;
        document.getElementById('profitMargin').textContent = `${analytics.profitMargin}%`;
        
        // Render product chart
        renderProductChart(analytics.salesByProduct);
        
        // Render recent transactions
        renderRecentTransactions(sales.slice(-5).reverse());
    } catch (error) {
        console.error('Error loading dashboard:', error);
        alert('Failed to load dashboard data. Please ensure the server is running.');
    }
}

// Render Product Chart
function renderProductChart(salesByProduct) {
    const chartContainer = document.getElementById('productChart');
    chartContainer.innerHTML = '';
    
    if (Object.keys(salesByProduct).length === 0) {
        chartContainer.innerHTML = '<p>No sales data available</p>';
        return;
    }
    
    const maxRevenue = Math.max(...Object.values(salesByProduct).map(p => p.revenue));
    
    Object.entries(salesByProduct).forEach(([product, data]) => {
        const percentage = (data.revenue / maxRevenue) * 100;
        const profit = data.revenue - data.cost;
        
        const barHTML = `
            <div class="chart-bar">
                <div class="chart-label">${product}</div>
                <div class="chart-bar-container">
                    <div class="chart-bar-fill" style="width: ${percentage}%">
                        ₹${data.revenue.toLocaleString()}
                    </div>
                </div>
            </div>
        `;
        chartContainer.innerHTML += barHTML;
    });
}

// Render Recent Transactions
function renderRecentTransactions(transactions) {
    const container = document.getElementById('recentTransactions');
    container.innerHTML = '';
    
    if (transactions.length === 0) {
        container.innerHTML = '<p>No recent transactions</p>';
        return;
    }
    
    transactions.forEach(transaction => {
        const totalSale = transaction.quantity * transaction.unitPrice;
        const profit = totalSale - transaction.cost;
        
        const transactionHTML = `
            <div class="transaction-item">
                <div class="transaction-info">
                    <h4>${transaction.productName}</h4>
                    <p>${transaction.customerName} • ${transaction.date} • ${transaction.quantity} units</p>
                </div>
                <div class="transaction-amount">
                    ₹${totalSale.toLocaleString()}
                </div>
            </div>
        `;
        container.innerHTML += transactionHTML;
    });
}

// Load Products
async function loadProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        const products = await response.json();
        
        // Populate product dropdown in sales form
        const productSelect = document.getElementById('productName');
        productSelect.innerHTML = '<option value="">Select Product</option>';
        products.forEach(product => {
            productSelect.innerHTML += `<option value="${product.name}">${product.name}</option>`;
        });
        
        // Render products grid
        renderProductsGrid(products);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Render Products Grid
function renderProductsGrid(products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    if (products.length === 0) {
        grid.innerHTML = '<p>No products available</p>';
        return;
    }
    
    products.forEach(product => {
        const productHTML = `
            <div class="product-card">
                <h4>${product.name}</h4>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Unit:</strong> ${product.unit}</p>
            </div>
        `;
        grid.innerHTML += productHTML;
    });
}

// Load Sales Table
async function loadSalesTable() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/sales`);
        const sales = await response.json();
        renderSalesTable(sales);
    } catch (error) {
        console.error('Error loading sales:', error);
    }
}

// Render Sales Table
function renderSalesTable(sales) {
    const tbody = document.getElementById('salesTableBody');
    tbody.innerHTML = '';
    
    if (sales.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align: center;">No sales records found</td></tr>';
        return;
    }
    
    sales.forEach(sale => {
        const totalSale = sale.quantity * sale.unitPrice;
        const profit = totalSale - sale.cost;
        
        const row = `
            <tr>
                <td>${sale.id}</td>
                <td>${sale.date}</td>
                <td>${sale.productName}</td>
                <td>${sale.quantity}</td>
                <td>₹${sale.unitPrice.toLocaleString()}</td>
                <td>₹${totalSale.toLocaleString()}</td>
                <td>₹${sale.cost.toLocaleString()}</td>
                <td style="color: ${profit >= 0 ? 'green' : 'red'}">₹${profit.toLocaleString()}</td>
                <td>${sale.customerName}</td>
                <td>
                    <button class="btn btn-edit" onclick="editSale(${sale.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteSale(${sale.id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Add Sale Form Handler
document.getElementById('salesForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        date: document.getElementById('date').value,
        productName: document.getElementById('productName').value,
        quantity: parseInt(document.getElementById('quantity').value),
        unitPrice: parseFloat(document.getElementById('unitPrice').value),
        cost: parseFloat(document.getElementById('cost').value),
        customerName: document.getElementById('customerName').value
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/sales`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert('Sale added successfully!');
            document.getElementById('salesForm').reset();
            loadSalesTable();
            loadDashboard();
        } else {
            alert('Failed to add sale');
        }
    } catch (error) {
        console.error('Error adding sale:', error);
        alert('Failed to add sale');
    }
});

// Reset Form
document.getElementById('resetForm').addEventListener('click', () => {
    document.getElementById('salesForm').reset();
});

// Edit Sale
async function editSale(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/sales/${id}`);
        const sale = await response.json();
        
        // Populate edit form
        document.getElementById('editId').value = sale.id;
        document.getElementById('editDate').value = sale.date;
        document.getElementById('editProductName').value = sale.productName;
        document.getElementById('editQuantity').value = sale.quantity;
        document.getElementById('editUnitPrice').value = sale.unitPrice;
        document.getElementById('editCost').value = sale.cost;
        document.getElementById('editCustomerName').value = sale.customerName;
        
        // Show modal
        document.getElementById('modal').style.display = 'block';
    } catch (error) {
        console.error('Error loading sale:', error);
    }
}

// Delete Sale
async function deleteSale(id) {
    if (!confirm('Are you sure you want to delete this sale?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/sales/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Sale deleted successfully!');
            loadSalesTable();
            loadDashboard();
        } else {
            alert('Failed to delete sale');
        }
    } catch (error) {
        console.error('Error deleting sale:', error);
        alert('Failed to delete sale');
    }
}

// Edit Sale Form Handler
document.getElementById('editSaleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('editId').value;
    const formData = {
        date: document.getElementById('editDate').value,
        productName: document.getElementById('editProductName').value,
        quantity: parseInt(document.getElementById('editQuantity').value),
        unitPrice: parseFloat(document.getElementById('editUnitPrice').value),
        cost: parseFloat(document.getElementById('editCost').value),
        customerName: document.getElementById('editCustomerName').value
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/sales/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert('Sale updated successfully!');
            document.getElementById('modal').style.display = 'none';
            loadSalesTable();
            loadDashboard();
        } else {
            alert('Failed to update sale');
        }
    } catch (error) {
        console.error('Error updating sale:', error);
        alert('Failed to update sale');
    }
});

// Modal Close Handlers
document.querySelectorAll('.close').forEach(element => {
    element.addEventListener('click', () => {
        document.getElementById('modal').style.display = 'none';
    });
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Product Form Handler
document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('productFormName').value,
        category: document.getElementById('category').value,
        unit: document.getElementById('unit').value
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert('Product added successfully!');
            document.getElementById('productForm').reset();
            loadProducts();
        } else {
            alert('Failed to add product');
        }
    } catch (error) {
        console.error('Error adding product:', error);
        alert('Failed to add product');
    }
});

// Load Reports
async function loadReports() {
    try {
        const [analyticsRes, salesRes] = await Promise.all([
            fetch(`${API_BASE_URL}/api/analytics`),
            fetch(`${API_BASE_URL}/api/sales`)
        ]);
        
        const analytics = await analyticsRes.json();
        const sales = await salesRes.json();
        
        renderDetailedAnalytics(analytics, sales);
    } catch (error) {
        console.error('Error loading reports:', error);
    }
}

// Render Detailed Analytics
function renderDetailedAnalytics(analytics, sales) {
    const container = document.getElementById('detailedAnalytics');
    
    const html = `
        <div class="analytics-item">
            <span class="analytics-label">Total Transactions</span>
            <span class="analytics-value">${analytics.totalTransactions}</span>
        </div>
        <div class="analytics-item">
            <span class="analytics-label">Average Sale Value</span>
            <span class="analytics-value">₹${(analytics.totalSales / analytics.totalTransactions || 0).toFixed(2)}</span>
        </div>
        <div class="analytics-item">
            <span class="analytics-label">Average Profit per Transaction</span>
            <span class="analytics-value">₹${(analytics.totalProfit / analytics.totalTransactions || 0).toFixed(2)}</span>
        </div>
        <div class="analytics-item">
            <span class="analytics-label">Total Revenue</span>
            <span class="analytics-value">₹${analytics.totalSales.toLocaleString()}</span>
        </div>
        <div class="analytics-item">
            <span class="analytics-label">Total Expenses</span>
            <span class="analytics-value">₹${analytics.totalCost.toLocaleString()}</span>
        </div>
        <div class="analytics-item">
            <span class="analytics-label">Net Profit</span>
            <span class="analytics-value">₹${analytics.totalProfit.toLocaleString()}</span>
        </div>
        <div class="analytics-item">
            <span class="analytics-label">Profit Margin</span>
            <span class="analytics-value">${analytics.profitMargin}%</span>
        </div>
    `;
    
    container.innerHTML = html;
}

// Export to CSV
document.getElementById('exportCSV').addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/sales`);
        const sales = await response.json();
        
        if (sales.length === 0) {
            alert('No data to export');
            return;
        }
        
        // Create CSV content
        const headers = ['ID', 'Date', 'Product', 'Quantity', 'Unit Price', 'Total Sale', 'Cost', 'Profit', 'Customer'];
        const csvRows = [headers.join(',')];
        
        sales.forEach(sale => {
            const totalSale = sale.quantity * sale.unitPrice;
            const profit = totalSale - sale.cost;
            
            const row = [
                sale.id,
                sale.date,
                sale.productName,
                sale.quantity,
                sale.unitPrice,
                totalSale,
                sale.cost,
                profit,
                sale.customerName
            ];
            csvRows.push(row.join(','));
        });
        
        const csvContent = csvRows.join('\n');
        
        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sales-report-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        
        alert('Report downloaded successfully!');
    } catch (error) {
        console.error('Error exporting CSV:', error);
        alert('Failed to export data');
    }
});

// Set default date to today
document.getElementById('date').valueAsDate = new Date();

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
    loadProducts();
});
