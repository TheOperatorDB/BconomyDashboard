const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com' 
    : 'http://localhost:5173'
}));
app.use(express.json());
app.use(express.static('public'));

const BCONOMY_API_URL = 'https://bconomy.net/api/data';
const BCONOMY_API_KEY = process.env.MY_BCONOMY_API_KEY;

async function fetchBconomyData(type, id = null) {
  try {
    const requestBody = id !== null ? { type: type, id: id } : { type: type };
    
    const response = await axios.post(BCONOMY_API_URL, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': BCONOMY_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${type} data:`, error.message);
    throw error;
  }
}

app.get('/api/pets/:id', async (req, res) => {
  try {
    const petId = parseInt(req.params.id);
    const petData = await fetchBconomyData('pet', petId);
    
    res.json({
      success: true,
      data: petData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching pet data:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pet data'
    });
  }
});


app.get('/api/items', async (req, res) => {
  try {
    const itemsData = await fetchBconomyData('itemData');
    
    res.json({
      success: true,
      data: itemsData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching items data:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch items data'
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`Bconomy Dashboard Server running on port ${PORT}`);
  console.log(`Game data API available at http://localhost:${PORT}/api`);
  console.log(`API Key status: ${BCONOMY_API_KEY ? 'Configured' : 'Missing - Please set MY_BCONOMY_API_KEY'}`);
}); 