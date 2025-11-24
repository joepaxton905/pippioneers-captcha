"use client";
import { useEffect, useRef, useState } from 'react';
import styles from '../page.module.css';

const TrendingChart = ({ period }) => {
  const canvasRef = useRef(null);
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Convert period to days for API
  const getDays = () => {
    switch (period) {
      case '1D': return 1;
      case '1W': return 7;
      case '1M': return 30;
      case '3M': return 90;
      case '1Y': return 365;
      default: return 1;
    }
  };
  
  // Fetch live Bitcoin data
  useEffect(() => {
    const fetchLiveData = async () => {
      setLoading(true);
      
      try {
        // Get live Bitcoin data from Binance API
        const days = getDays();
        const interval = period === '1D' ? '1h' : '1d';
        const limit = period === '1D' ? 24 : days;
        
        const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${interval}&limit=${limit}`
        );
        
        const data = await response.json();
        
        // Format the data [timestamp, price]
        const formattedData = data.map(item => [
          parseInt(item[0]), // timestamp
          parseFloat(item[4])  // close price
        ]);
        
        setPriceData(formattedData);
      } catch (error) {
        console.error('Error fetching live Bitcoin data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLiveData();
    
    // Set up auto-refresh for live data
    const intervalId = setInterval(() => {
      fetchLiveData();
    }, 60000); // Refresh every minute
    
    return () => clearInterval(intervalId);
  }, [period]);
  
  // Draw chart with live data
  useEffect(() => {
    if (!canvasRef.current || priceData.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Get price values only
    const prices = priceData.map(item => item[1]);
    const times = priceData.map(item => new Date(item[0]));
    
    // Get min and max for scaling
    const minPrice = Math.min(...prices) * 0.998;
    const maxPrice = Math.max(...prices) * 1.002;
    const priceRange = maxPrice - minPrice;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background
    ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 5; i++) {
      const y = height * (i / 4);
      
      // Grid line
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
      
      // Price label
      const price = maxPrice - (priceRange * (i / 4));
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`$${price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 5, y - 5);
    }
    
    // Draw time labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.textAlign = 'center';
    
    const timeStep = Math.max(1, Math.floor(times.length / 5));
    for (let i = 0; i < times.length; i += timeStep) {
      const x = (i / (times.length - 1)) * width;
      const time = times[i];
      
      let label;
      if (period === '1D') {
        label = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else {
        label = time.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }
      
      ctx.fillText(label, x, height - 5);
    }
    
    // Draw price line
    ctx.beginPath();
    for (let i = 0; i < prices.length; i++) {
      const x = (i / (prices.length - 1)) * width;
      const normalizedPrice = (prices[i] - minPrice) / priceRange;
      const y = height - (normalizedPrice * height);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    // Style the line
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    
    // Fill area under line
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
    gradient.addColorStop(0.8, 'rgba(99, 102, 241, 0.0)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Add current price indicator and value
    if (prices.length > 0) {
      const lastPrice = prices[prices.length - 1];
      const normalizedLastPrice = (lastPrice - minPrice) / priceRange;
      const lastY = height - (normalizedLastPrice * height);
      
      // Price dot
      ctx.beginPath();
      ctx.arc(width - 10, lastY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#6366f1';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Price label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`$${lastPrice.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`, width - 20, lastY - 10);
      
      // Change indicator
      if (prices.length > 1) {
        const firstPrice = prices[0];
        const change = ((lastPrice - firstPrice) / firstPrice) * 100;
        const changeText = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
        
        ctx.fillStyle = change >= 0 ? '#10b981' : '#ef4444';
        ctx.textAlign = 'left';
        ctx.font = '12px sans-serif';
        ctx.fillText(changeText, 10, 20);
      }
    }
    
  }, [priceData, period]);
  
  return (
    <div className={styles.chartContainer}>
      {loading && (
        <div className={styles.liveIndicator}>
          <div className={styles.liveDot}></div>
          Fetching live data...
        </div>
      )}
      <canvas 
        ref={canvasRef}
        width="1000"
        height="300"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default TrendingChart; 