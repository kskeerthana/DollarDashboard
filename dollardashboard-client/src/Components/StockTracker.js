import React, { useState } from 'react';
import axios from 'axios';

const StockCalculator = () => {
  const [symbol, setSymbol] = useState('');
  const [buyingDate, setBuyingDate] = useState('');
  const [numShares, setNumShares] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [netProfit, setNetProfit] = useState(null);

  const API_KEY = 'GMWNK4H0TLUQHLFH';
  const API_ENDPOINT = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(API_ENDPOINT);
      const timeSeries = res.data['Time Series (Daily)'];
      console.log("timeseries" , timeSeries)
      const latestDate = Object.keys(timeSeries)[0];
      const buyingPrice = parseFloat(timeSeries[buyingDate]['4. close']);
      console.log("buyingPrice" , buyingPrice)
      const currentPrice = parseFloat(timeSeries[latestDate]['4. close']);
      console.log("currentPrice" , currentPrice)
      const netProfit = ((currentPrice - buyingPrice) * numShares).toFixed(2);
      setCurrentPrice(currentPrice);
      setNetProfit(netProfit);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="symbol">Select a stock:</label>
        <select id="symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)}>
          <option value="">-- Please select a stock --</option>
          <option value="AAPL">AAPL (Apple Inc.)</option>
          <option value="AMZN">AMZN (Amazon.com Inc.)</option>
          <option value="GOOG">GOOG (Alphabet Inc. Class C)</option>
          <option value="MSFT">MSFT (Microsoft Corporation)</option>
        </select>
        <label htmlFor="buying-date">Enter buying date:</label>
        <input type="date" id="buying-date" value={buyingDate} onChange={(e) => setBuyingDate(e.target.value)} />
        <label htmlFor="num-shares">Enter number of shares purchased:</label>
        <input type="number" id="num-shares" value={numShares} onChange={(e) => setNumShares(parseInt(e.target.value))} />
        <button type="submit">Calculate</button>
      </form>
      {currentPrice && (
        <div>
          <h2>{symbol}</h2>
          <p>Current price: {currentPrice}</p>
          <p>Number of shares purchased: {numShares}</p>
          <p>Buying price: {parseFloat(currentPrice).toFixed(2)}</p>
          <p>Net profit/loss: {netProfit > 0 ? "+" : ""}{netProfit}</p>
        </div>
      )}
    </div>
  );
};

export default StockCalculator;






// import React, { useState } from 'react';
// import axios from 'axios';

// const StockCalculator = () => {
//   const [symbol, setSymbol] = useState('');
//   const [stockData, setStockData] = useState(null);

//   const API_KEY = 'GMWNK4H0TLUQHLFH';
//   const API_ENDPOINT = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.get(API_ENDPOINT);
//       setStockData(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Enter stock symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
//         <button type="submit">Search</button>
//       </form>
//       {stockData && (
//         <div>
//           <h2>{stockData['Global Quote']['01. symbol']}</h2>
//           <p>Open: {stockData['Global Quote']['02. open']}</p>
//           <p>High: {stockData['Global Quote']['03. high']}</p>
//           <p>Low: {stockData['Global Quote']['04. low']}</p>
//           <p>Price: {stockData['Global Quote']['05. price']}</p>
//           <p>Volume: {stockData['Global Quote']['06. volume']}</p>
//           <p>Last trade time: {stockData['Global Quote']['07. latest trading day']}</p>
//           <p>Previous close: {stockData['Global Quote']['08. previous close']}</p>
//           <p>Change: {stockData['Global Quote']['09. change']}</p>
//           <p>Change percent: {stockData['Global Quote']['10. change percent']}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StockCalculator;
