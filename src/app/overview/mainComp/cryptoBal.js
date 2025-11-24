"use client";
import { useState } from 'react';
import styles from '../page.module.css';

const CryptoBalance = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const balanceData = {
    totalBalance: 12584.75,
    change: 3.8,
    currencies: [
      { name: "Bitcoin", symbol: "BTC", amount: 0.345, value: 8632.50, color: "#f7931a" },
      { name: "Ethereum", symbol: "ETH", amount: 2.567, value: 3252.25, color: "#627eea" },
      { name: "USD Coin", symbol: "USDC", amount: 700, value: 700, color: "#2775ca" }
    ]
  };
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  
  return (
    <div className={styles.balanceCard}>
      <div className={styles.balanceHeader}>
        <div className={styles.balanceInfo}>
          <span className={styles.balanceLabel}>Total Balance</span>
          <div className={styles.balanceValue}>
            {isVisible ? (
              <>
                <span className={styles.currencySymbol}>$</span>
                <span>{balanceData.totalBalance.toLocaleString()}</span>
              </>
            ) : (
              <span className={styles.hiddenBalance}>••••••</span>
            )}
            <button 
              className={styles.visibilityToggle} 
              onClick={toggleVisibility}
              aria-label={isVisible ? "Hide balance" : "Show balance"}
            >
              {isVisible ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          <div className={styles.balanceChange} style={{ color: balanceData.change >= 0 ? '#10b981' : '#ef4444' }}>
            {balanceData.change >= 0 ? '+' : ''}{balanceData.change}% this week
          </div>
        </div>
      </div>
      
      <div className={styles.balanceDistribution}>
        <div className={styles.distributionChart}>
          {balanceData.currencies.map((currency, index) => (
            <div 
              key={currency.symbol} 
              className={styles.distributionBar}
              style={{ 
                width: `${(currency.value / balanceData.totalBalance) * 100}%`,
                backgroundColor: currency.color,
                zIndex: balanceData.currencies.length - index
              }} 
            />
          ))}
        </div>
      </div>
      
      <div className={styles.currenciesList}>
        {balanceData.currencies.map((currency) => (
          <div key={currency.symbol} className={styles.currencyItem}>
            <div className={styles.currencyInfo}>
              <div 
                className={styles.currencyIcon} 
                style={{ backgroundColor: currency.color }}
              >
                {currency.symbol.substring(0, 1)}
              </div>
              <div className={styles.currencyName}>
                <div>{currency.name}</div>
                <div className={styles.currencyAmount}>{currency.amount} {currency.symbol}</div>
              </div>
            </div>
            <div className={styles.currencyValue}>
              ${isVisible ? currency.value.toLocaleString() : "•••••"}
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.balanceActions}>
        <button className={styles.actionButton}>Buy</button>
        <button className={styles.actionButton}>Sell</button>
        <button className={styles.actionButton}>Convert</button>
      </div>
    </div>
  );
};

export default CryptoBalance;
