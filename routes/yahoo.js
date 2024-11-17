const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://query1.finance.yahoo.com/v7/finance/quote', {
            params: { symbols: 'AAPL,MSFT,GOOGL,AMZN,FB' },
        });

        const stocks = response.data.quoteResponse.result.map(stock => ({
            name: stock.shortName,
            symbol: stock.symbol,
            price: stock.regularMarketPrice,
            change: stock.regularMarketChangePercent.toFixed(2) + '%',
        }));

        res.render('yahoo', { stocks });
    } catch (error) {
        console.error('Error fetching Yahoo Finance data:', error.message);
        res.render('yahoo', { stocks: [] });
    }
});

module.exports = router;
