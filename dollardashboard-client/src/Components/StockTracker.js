import React, { useState ,useEffect } from 'react';
import axios from 'axios';
// import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './StockTracker.css';
import { NavigationBar } from "./NavigationBar/NavigationBar";
// import './stockTracker.css';

const StockCalculator = () => {
  const [symbol, setSymbol] = useState('');
  const [buyingDate, setBuyingDate] = useState('');
  const [numShares, setNumShares] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [netProfit, setNetProfit] = useState(null);
  const navigate = useNavigate();

  const API_KEY = 'GMWNK4H0TLUQHLFH';
  const API_ENDPOINT = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`;

  useEffect(() => {
    if (!localStorage.getItem('username')) {
      console.log('noUser')
      navigate('/');
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(API_ENDPOINT);
      const timeSeries = res.data['Time Series (Daily)'];
      console.log("timeseries", timeSeries)
      const latestDate = Object.keys(timeSeries)[0];
      const buyingPrice = parseFloat(timeSeries[buyingDate]['4. close']);
      console.log("buyingPrice", buyingPrice)
      const currentPrice = parseFloat(timeSeries[latestDate]['4. close']);
      console.log("currentPrice", currentPrice)
      const netProfit = ((currentPrice - buyingPrice) * numShares).toFixed(2);
      setCurrentPrice(currentPrice);
      setNetProfit(netProfit);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <NavigationBar></NavigationBar>
    <div className='stockSearchBar' >
      <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="symbol" className='stockFontSize' style={{ color: 'white',margin: '10px' }}>Select a stock:</label>
        <select id="symbol" value={symbol} style={{margin: '10px', backgroundColor: 'white', color: 'black', padding: '10px', borderRadius: '5px', border: 'none', fontSize: '16px', cursor: 'pointer' }} onChange={(e) => setSymbol(e.target.value)}>
          <option value="">-- Please select a stock --</option>
          <option value="AAPL">AAPL (Apple Inc.)</option>
          <option value="AMZN">AMZN (Amazon.com Inc.)</option>
          <option value="GOOG">GOOG (Alphabet Inc. Class C)</option>
          <option value="MSFT">MSFT (Microsoft Corporation)</option>
        </select>
        <label htmlFor="buying-date" className='stockFontSize' style={{ color: 'white',margin: '10px', }}>Enter buying date:</label>
        <input type="date" id="buying-date" value={buyingDate} onChange={(e) => setBuyingDate(e.target.value)} style={{margin: '10px', backgroundColor: 'white', color: 'black', padding: '10px', borderRadius: '5px', border: 'none', fontSize: '16px', cursor: 'pointer' }}/>
        <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}> <label htmlFor="num-shares" className='stockFontSize' style={{ color: 'white',margin: '10px' }}>No shares purchased:</label>
        
        <input type="number" id="num-shares" value={numShares} onChange={(e) => setNumShares(parseInt(e.target.value))} style={{margin: '10px', backgroundColor: 'white', color: 'black', padding: '10px', borderRadius: '5px', border: 'none', fontSize: '16px', cursor: 'pointer' }} />

        </div>
        <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', fontSize: '16px', cursor: 'pointer' }}>Calculate</button>

        {/* <input type="number" id="num-shares" value={numShares} onChange={(e) => setNumShares(parseInt(e.target.value))} style={{margin: '10px', backgroundColor: 'white', color: 'black', padding: '10px', borderRadius: '5px', border: 'none', fontSize: '16px', cursor: 'pointer' }} /> */}
      </form>
      </div>
      {currentPrice && (
        // <div className='stockResult'>
        //   <h2>{symbol}</h2>
        //   <p>Current price: {currentPrice}</p>
        //   <p>Number of shares purchased: {numShares}</p>
        //   <p>Buying price: {parseFloat(currentPrice).toFixed(2)}</p>
        //   <p>Net profit/loss: {netProfit > 0 ? "+" : ""}{netProfit}</p>
        // </div>
        <div className='stockResult'>
        <h2>{symbol}</h2>
        <p>Current price: {currentPrice}</p>
        <p>Number of shares purchased: {numShares}</p>
        <p>Buying price: {parseFloat(currentPrice).toFixed(2)}</p>
        {typeof netProfit !== "undefined" && (
          <p style={{ color: netProfit > 0 ? "green" : "red" }}>
            Net profit/loss: {netProfit > 0 ? "+" : ""}{netProfit}
          </p>
        )}
      </div>
      
      )}
    </div>
    </>
  );
};

export default StockCalculator;
