"use client";
import { useState, useEffect } from 'react';
import styles from '../page.module.css';

const LiveCryptoMarket = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  // Remove the search state since we're removing search functionality
  
  // Define the top cryptocurrencies to track
  const topCryptos = ['bitcoin', 'ethereum', 'ripple', 'cardano', 'solana', 'polkadot', 'dogecoin', 'avalanche-2', 'tron', 'chainlink'];

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${topCryptos.join(',')}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();

    // Refresh data every 60 seconds
    const intervalId = setInterval(fetchCryptoData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // Remove the filtering logic since we're removing search functionality

  // Function to format large numbers
  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  };

  return (
    <>
      <div className={`${styles.marketHeader} ${styles.sectionHeader}`}>
        <h2 className={styles.sectionTitle}>Top Cryptocurrencies</h2>
        {/* Remove the search box from here */}
      </div>

      <div className={styles.marketTable}>
        <div className={styles.marketTableHeader}>
          <div className={styles.marketHeaderCell}>Asset</div>
          <div className={styles.marketHeaderCell}>Price</div>
          <div className={styles.marketHeaderCell}>24h Change</div>
          <div className={styles.marketHeaderCell}>Market Cap</div>
          <div className={styles.marketHeaderCell}>Trade</div>
        </div>

        <div className={styles.marketTableBody}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>Loading live market data...</p>
            </div>
          ) : cryptoData.length === 0 ? (
            <div className={styles.noResults}>
              No cryptocurrencies found.
            </div>
          ) : (
            cryptoData.map((crypto) => (
              <div key={crypto.id} className={styles.marketTableRow}>
                <div className={styles.assetInfo}>
                  <div 
                    className={styles.assetIcon} 
                    style={{ background: 'transparent' }}
                  >
                    <img 
                      src={crypto.image} 
                      alt={crypto.name} 
                      width="30" 
                      height="30" 
                    />
                  </div>
                  <div className={styles.assetDetails}>
                    <div className={styles.assetName}>{crypto.name}</div>
                    <div className={styles.assetSymbol}>{crypto.symbol.toUpperCase()}</div>
                  </div>
                </div>
                <div className={styles.assetPrice}>
                  ${crypto.current_price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </div>
                <div 
                  className={
                    crypto.price_change_percentage_24h >= 0 
                      ? styles.changePositive 
                      : styles.changeNegative
                  }
                >
                  {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className={styles.marketCap}>
                  {formatMarketCap(crypto.market_cap)}
                </div>
                <div>
                  <button className={styles.tradeButton}>Trade</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={styles.dataAttribution}>
        <span>Live data provided by CoinGecko API</span>
        <div className={styles.liveIndicator}>
          <div className={styles.liveDot}></div>
          Live
        </div>
      </div>
    </>
  );
};

export default LiveCryptoMarket; 