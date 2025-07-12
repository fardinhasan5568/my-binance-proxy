const express = require("express");
const axios = require("axios");
const app = express();

app.get("/kline", async (request, response) => {
  const symbol = request.query.symbol;
  const interval = request.query.interval;

  if (!symbol || !interval) {
    return response.status(400).json({ error: "Symbol and interval are required" });
  }

  try {
    const binanceUrl = `https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=1`;
    const binanceResponse = await axios.get(binanceUrl);
    response.json(binanceResponse.data);
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch data from Binance" });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
