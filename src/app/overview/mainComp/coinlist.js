"use client";
import { useState } from 'react';
import styles from '../page.module.css';

const CryptoMarket = () => {
  const [sortBy, setSortBy] = useState('marketCap');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  
  const cryptocurrencies = [
    { 
      id: 1, 
      name: 'Bitcoin', 
      symbol: 'BTC', 
      price: 29145.83, 
      change24h: 2.14, 
      marketCap: 566.7, 
      volume: 23.5,
      iconColor: '#f7931a'
    },
    { 
      id: 2, 
      name: 'Ethereum', 
      symbol: 'ETH', 
      price: 1864.32, 
      change24h: 3.75, 
      marketCap: 223.8, 
      volume: 14.2,
      iconColor: '#627eea'
    },
    { 
      id: 3, 
      name: 'Binance Coin', 
      symbol: 'BNB', 
      price: 245.67, 
      change24h: -0.83, 
      marketCap: 41.2, 
      volume: 1.8,
      iconColor: '#f0b90b'
    },
    { 
      id: 4, 
      name: 'Solana', 
      symbol: 'SOL', 
      price: 98.23, 
      change24h: 5.62, 
      marketCap: 38.5, 
      volume: 2.1,
      iconColor: '#00ffa3'
    },
    { 
      id: 5, 
      name: 'XRP', 
      symbol: 'XRP', 
      price: 0.59, 
      change24h: -1.24, 
      marketCap: 31.2, 
      volume: 1.5,
      iconColor: '#00aae4'
    },
    { 
      id: 6, 
      name: 'Cardano', 
      symbol: 'ADA', 
      price: 0.38, 
      change24h: 0.94, 
      marketCap: 13.4, 
      volume: 0.42,
      iconColor: '#0033ad'
    },
    { 
      id: 7, 
      name: 'Dogecoin', 
      symbol: 'DOGE', 
      price: 0.074, 
      change24h: 1.32, 
      marketCap: 10.5, 
      volume: 0.38,
      iconColor: '#c3a634'
    }
  ];
  
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };
  
  const sortedData = [...cryptocurrencies]
    .filter(crypto => 
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      
      if (sortBy === 'name') {
        return multiplier * a.name.localeCompare(b.name);
      }
      
      return multiplier * (a[sortBy] - b[sortBy]);
    });
  
  const renderSortIcon = (column) => {
    if (sortBy !== column) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };
  
  return (
    <div className={styles.marketContainer}>
      <div className={styles.marketHeader}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.marketFilters}>
          <button 
            className={`${styles.filterButton} ${sortBy === 'marketCap' ? styles.activeFilter : ''}`}
            onClick={() => handleSort('marketCap')}
          >
            Market Cap
          </button>
          <button 
            className={`${styles.filterButton} ${sortBy === 'volume' ? styles.activeFilter : ''}`}
            onClick={() => handleSort('volume')}
          >
            Volume
          </button>
          <button 
            className={`${styles.filterButton} ${sortBy === 'change24h' ? styles.activeFilter : ''}`}
            onClick={() => handleSort('change24h')}
          >
            24h Change
          </button>
        </div>
      </div>
      
      <div className={styles.marketTable}>
        <div className={styles.marketTableHeader}>
          <div className={styles.marketHeaderCell} onClick={() => handleSort('name')}>
            Asset {renderSortIcon('name')}
          </div>
          <div className={styles.marketHeaderCell} onClick={() => handleSort('price')}>
            Price {renderSortIcon('price')}
          </div>
          <div className={styles.marketHeaderCell} onClick={() => handleSort('change24h')}>
            24h Change {renderSortIcon('change24h')}
          </div>
          <div className={styles.marketHeaderCell} onClick={() => handleSort('marketCap')}>
            Market Cap {renderSortIcon('marketCap')}
          </div>
          <div className={styles.marketHeaderCell}>
            Trade
          </div>
        </div>
        
        <div className={styles.marketTableBody}>
          {sortedData.map(crypto => (
            <div key={crypto.id} className={styles.marketTableRow}>
              <div className={styles.marketCell}>
                <div className={styles.assetInfo}>
                  <div 
                    className={styles.assetIcon}
                    style={{ backgroundColor: crypto.iconColor }}
                  >
                    {crypto.symbol.substring(0, 1)}
                  </div>
                  <div>
                    <div className={styles.assetName}>{crypto.name}</div>
                    <div className={styles.assetSymbol}>{crypto.symbol}</div>
                  </div>
                </div>
              </div>
              <div className={styles.marketCell}>
                ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
              </div>
              <div 
                className={styles.marketCell}
                style={{ color: crypto.change24h >= 0 ? '#10b981' : '#ef4444' }}
              >
                {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}%
              </div>
              <div className={styles.marketCell}>
                ${crypto.marketCap.toLocaleString(undefined, { maximumFractionDigits: 1 })}B
              </div>
              <div className={styles.marketCell}>
                <button className={styles.tradeButton}>Trade</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoMarket;
