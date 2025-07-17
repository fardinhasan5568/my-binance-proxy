const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// This is the endpoint we will use, just like your Glitch code
app.get('/candles/:symbol', async (req, res) => {
  const { symbol } = req.params;
  try {
    const response = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=15m&limit=100`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch candles from Binance" });
  }
});

const PORT = process.env.PORT || 10000; // Render uses a specific port
app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
