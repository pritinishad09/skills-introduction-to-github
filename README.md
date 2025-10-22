# 🧪 Chemical Company Management System

A full-stack web application for managing sales, profits, and inventory for a chemical company.

## Features

- 📊 **Dashboard**: View real-time sales, profit, and revenue metrics
- 💰 **Sales Management**: Add, edit, delete, and track sales records
- 🧪 **Product Management**: Manage chemical products and categories
- 📈 **Analytics & Reports**: View detailed business analytics and profit margins
- 📥 **Data Export**: Download sales reports in CSV format
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Technology Stack

**Backend:**
- Node.js
- Express.js
- In-memory data storage

**Frontend:**
- HTML5
- CSS3 (with modern gradients and animations)
- Vanilla JavaScript (ES6+)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Steps

1. Clone the repository:
```bash
git clone https://github.com/pritinishad09/skills-introduction-to-github.git
cd skills-introduction-to-github
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

### Dashboard
- View key metrics: Total Sales, Total Profit, Total Cost, and Profit Margin
- Visualize sales by product with interactive charts
- See recent transactions at a glance

### Sales Management
- Click on the "Sales Management" tab
- Fill in the form to add new sales records:
  - Date
  - Product Name (select from dropdown)
  - Quantity
  - Unit Price
  - Total Cost
  - Customer Name
- View all sales records in a sortable table
- Edit or delete existing records

### Product Management
- Click on the "Products" tab
- Add new chemical products with:
  - Product Name
  - Category
  - Unit of Measurement (Liters, Kg, etc.)
- View all products in a grid layout

### Reports & Analytics
- Click on the "Reports" tab
- View detailed analytics including:
  - Average sale value
  - Average profit per transaction
  - Total revenue and expenses
  - Net profit and profit margin
- Download sales reports in CSV format

## API Endpoints

### Sales
- `GET /api/sales` - Get all sales records
- `GET /api/sales/:id` - Get a single sale record
- `POST /api/sales` - Create a new sale record
- `PUT /api/sales/:id` - Update a sale record
- `DELETE /api/sales/:id` - Delete a sale record

### Analytics
- `GET /api/analytics` - Get dashboard analytics data

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product

## Project Structure

```
├── server.js           # Express server and API routes
├── package.json        # Project dependencies and scripts
├── public/
│   ├── index.html     # Main HTML file
│   ├── css/
│   │   └── style.css  # Styling and responsive design
│   └── js/
│       └── app.js     # Frontend JavaScript logic
└── README.md          # Project documentation
```

## Sample Data

The application comes with pre-loaded sample data including:
- 3 sales transactions
- 5 chemical products (Sulfuric Acid, Hydrochloric Acid, Sodium Hydroxide, etc.)

## Future Enhancements

- Database integration (MongoDB, PostgreSQL)
- User authentication and authorization
- Invoice generation
- Inventory tracking
- Multi-currency support
- Email notifications
- Advanced filtering and search
- Data visualization with charts library (Chart.js)

## Contributing

Feel free to fork this repository and submit pull requests for any improvements.

## License

MIT License

---

&copy; 2025 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)

