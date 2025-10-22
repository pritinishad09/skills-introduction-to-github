# Quick Start Guide

Welcome to the Chemical Company Management System! Follow these simple steps to get started.

## Prerequisites
- Node.js installed on your computer (v14 or higher)
- A web browser (Chrome, Firefox, Safari, or Edge)

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```

3. **Open in Browser**
   - Navigate to: http://localhost:3000
   - The application will open automatically

## First Steps

### 1. Explore the Dashboard
- View your total sales, profit, and cost metrics
- Check the profit margin percentage
- See visual charts of sales by product
- Review recent transactions

### 2. Add a New Sale
- Click on "Sales Management" tab
- Fill in the form:
  - Select today's date (pre-filled)
  - Choose a product from the dropdown
  - Enter quantity sold
  - Enter unit price
  - Enter total cost
  - Enter customer name
- Click "Add Sale"
- Your new sale will appear in the table below

### 3. Manage Products
- Click on "Products" tab
- View all available chemical products
- Add new products using the form:
  - Product name (e.g., "Phosphoric Acid")
  - Category (e.g., "Acid", "Base", "Salt")
  - Unit (e.g., "Liters", "Kg", "Tons")

### 4. View Reports
- Click on "Reports" tab
- See detailed analytics:
  - Average sale value
  - Average profit per transaction
  - Total revenue and expenses
  - Net profit and profit margin
- Download CSV report by clicking the download button

## Features

### Dashboard
- 📊 Real-time metrics
- 📈 Visual charts
- 💰 Profit calculations
- 🔄 Auto-updating data

### Sales Management
- ➕ Add new sales
- ✏️ Edit existing sales (click Edit button)
- 🗑️ Delete sales (click Delete button)
- 📋 View all transactions in a table

### Product Management
- 🧪 Manage chemical products
- 📝 Add new products
- 👁️ View product details

### Reports & Analytics
- 📊 Detailed business metrics
- 💾 Export to CSV
- 📈 Calculate averages and totals

## Sample Data

The application comes with sample data:
- 3 sales transactions
- 5 chemical products

Feel free to add, edit, or delete this sample data to test the system.

## Tips

- All calculations (profit, margins) are automatic
- Data is stored in memory (resets on server restart)
- The interface is responsive and works on mobile devices
- Use the Edit button to modify existing sales records
- Export reports regularly to save your data

## Troubleshooting

**Server won't start?**
- Make sure Node.js is installed: `node --version`
- Try reinstalling dependencies: `npm install`
- Check if port 3000 is available

**Can't see the application?**
- Make sure the server is running (should say "running on http://localhost:3000")
- Try a different browser
- Clear your browser cache

**Data disappeared?**
- The application uses in-memory storage
- Data resets when you restart the server
- Export to CSV to save your data permanently

## Need Help?

Check the README.md file for more detailed documentation and API endpoint information.

## Future Enhancements

Consider these features for future development:
- Database integration (MongoDB, PostgreSQL)
- User authentication
- Multi-user support
- Real-time notifications
- Mobile app
- Advanced reporting with charts
- Inventory management
- Purchase order tracking

Happy managing! 🚀
