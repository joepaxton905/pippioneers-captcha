"use client";
import { useEffect, useRef } from 'react';
import styles from '../page.module.css';

const MarketTicker = () => {
  const tickerRef = useRef(null);
  
  const tickerData = [
    { symbol: "BTC", name: "Bitcoin", price: 29145.83, change: 2.14 },
    { symbol: "ETH", name: "Ethereum", price: 1864.32, change: 3.75 },
    { symbol: "BNB", name: "Binance Coin", price: 245.67, change: -0.83 },
    { symbol: "SOL", name: "Solana", price: 98.23, change: 5.62 },
    { symbol: "XRP", name: "XRP", price: 0.59, change: -1.24 },
    { symbol: "ADA", name: "Cardano", price: 0.38, change: 0.94 },
    { symbol: "DOGE", name: "Dogecoin", price: 0.074, change: 1.32 },
    { symbol: "AVAX", name: "Avalanche", price: 12.86, change: 4.57 },
    { symbol: "DOT", name: "Polkadot", price: 5.23, change: -0.67 },
    { symbol: "LINK", name: "Chainlink", price: 14.92, change: 2.85 },
  ];
  
  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;
    
    const tickerWidth = ticker.scrollWidth;
    let position = ticker.clientWidth;
    let animationId;
    
    const animate = () => {
      if (position <= -tickerWidth / 2) {
        position = ticker.clientWidth;
      }
      position--;
      ticker.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div className={styles.tickerWrapper}>
      <div className={styles.tickerContainer}>
        <div ref={tickerRef} className={styles.ticker}>
          {/* Duplicate the items to create seamless scrolling */}
          {[...tickerData, ...tickerData].map((item, index) => (
            <div key={`${item.symbol}-${index}`} className={styles.tickerItem}>
              <div className={styles.tickerSymbol}>
                {item.symbol}/USD
              </div>
              <div className={styles.tickerPrice}>
                ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div 
                className={styles.tickerChange} 
                style={{ color: item.change >= 0 ? '#10b981' : '#ef4444' }}
              >
                {item.change >= 0 ? '+' : ''}{item.change}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketTicker;
