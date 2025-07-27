# Bconomy Dashboard

A real-time game data dashboard for Bconomy built with Vue.js frontend and Node.js backend.

## 🛠️ Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Bconomy API key

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd BconomyDashboard
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies (server)
   npm install
   
   # Install client dependencies
   cd client
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment example
   cp env.example .env
   
   # Edit .env file with your Bconomy API key
   MY_BCONOMY_API_KEY=your_bconomy_api_key_here
   ```

4. **Start the development servers**
   ```bash
   # Start both server and client
   npm run dev
   
   # Or start them separately:
   # Terminal 1 - Start server
   npm run server
   
   # Terminal 2 - Start client
   npm run client
   ```

## 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

## 📊 Available Endpoints

### Bconomy Game Data APIs

- `GET /api/pets/:id` - Get specific pet data
- `GET /api/items` - Get all items data

## 🎨 Frontend Features

### Pages
- **Dashboard** (`/`) - Overview of all game data
- **Pets** (`/pets`) - View and manage pets
- **Items** (`/items`) - View and manage items

## 🔌 API Integration

The project integrates with the Bconomy API:

- **API Base URL**: `https://bconomy.net/api/data`
- **Authentication**: Uses `x-api-key` header
- **Data Types**: pets, items

### Example API Call

```javascript
// Fetch pet data for ID #1
const response = await axios.post('https://bconomy.net/api/data', {
  type: 'pet',
  id: 1
}, {
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.MY_BCONOMY_API_KEY
  }
});
```