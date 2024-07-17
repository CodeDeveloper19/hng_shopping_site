const express = require('express');
const request = require('request');
const dotenv = require('dotenv');

// Load environment variables from .env.local file
dotenv.config();

const app = express();

// Middleware to enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Route for fetching a single product
app.get('/proxy/single/:productId', (req, res) => {
  const productId = req.params.productId;
  const organizationId = process.env.NEXT_PUBLIC_ORGANIZATION_ID;
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const url = `https://api.timbu.cloud/products/${productId}?organization_id=${organizationId}&Appid=${appId}&Apikey=${apiKey}`;

  request(url, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (response.statusCode !== 200) {
      console.error('Error:', response.statusCode, body);
      return res.status(response.statusCode).json({ error: 'Failed to fetch data' });
    }
    res.send(body);
  });
});

// Route for fetching all products
app.get('/proxy/all', (req, res) => {
  const organizationId = process.env.NEXT_PUBLIC_ORGANIZATION_ID;
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const url = `https://api.timbu.cloud/products?organization_id=${organizationId}&reverse_sort=false&Appid=${appId}&Apikey=${apiKey}&page=1&size=30`;

  request(url, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (response.statusCode !== 200) {
      console.error('Error:', response.statusCode, body);
      return res.status(response.statusCode).json({ error: 'Failed to fetch data' });
    }
    res.send(body);
  });
});

// Start the server on port 3001
const port = 3001;
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
