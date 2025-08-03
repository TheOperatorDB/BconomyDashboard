# Bconomy Dashboard

An *almost* real-time game data dashboard for Bconomy.net built with a Vue.js frontend and a Node.js backend.

## 🛠️ Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Bconomy API key

### Setup Instructions

1. **Clone the repository (ssh)**
   ```bash
   git clone git@github.com:TheOperatorDB/BconomyDashboard.git
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

## 🎨 Frontend Features

### Pages
- **Market** (`/market`) - A chart view of price evolution for an item
- **Pets** (`/pets`) - Find pet by ID and display some info about them
- **Users** (`/Users`) - Find user by ID and display some info about them
- **Items** (`/database`) - Displays the list of all items currently in the game (returned by Bconomy.net endpoint)

## 🔌 API Integration

The project integrates with the Bconomy API:

- **API Base URL**: `https://bconomy.net/api/data`
- **Authentication**: Uses `x-api-key` header

### API Key System

The application uses a flexible API key system:

#### Default Key
- A default API key is provided with the application
- Subject to rate limiting (150 queries/minute)
- Shared among all users who don't provide their own key

#### Personal API Key
- Users can provide their own API key through the navbar input
- To get your API key:
  1. Type `/resetapikey` in the Bconomy.net game console
  2. Copy the generated key
  3. Paste it in the API key input field in the navbar
- To revoke access: Type `/resetapikey` again in game

#### Technical Details
- API keys are stored in browser's localStorage only
- No server-side storage of user API keys
- Keys persist across browser sessions but can be cleared
- When no personal key is provided, falls back to default key automatically 
