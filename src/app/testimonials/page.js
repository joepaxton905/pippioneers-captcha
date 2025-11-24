'use client'
import React, { useState, useEffect } from 'react';
import styles from './testimonials.module.css';

// Function to generate a more sophisticated color palette
const generateColor = (username) => {
  const colorPalettes = [
    { bg: '#ff6b6b', text: '#ffffff' },   // Coral Red
    { bg: '#4ecdc4', text: '#ffffff' },   // Teal
    { bg: '#45b7d1', text: '#ffffff' },   // Sky Blue
    { bg: '#ff8c42', text: '#ffffff' },   // Warm Orange
    { bg: '#a8dadc', text: '#1d3557' },   // Light Blue
    { bg: '#6576ff', text: '#ffffff' },   // Vibrant Blue
    { bg: '#457b9d', text: '#ffffff' },   // Slate Blue
    { bg: '#1d3557', text: '#ffffff' },   // Deep Navy
    { bg: '#2a9d8f', text: '#ffffff' },   // Emerald Green
    { bg: '#e9c46a', text: '#000000' }    // Soft Yellow
  ];
  const hash = username.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  return colorPalettes[hash % colorPalettes.length];
};

// Function to get user initials
const getInitials = (username) => {
  return username.split(' ').map(name => name[0].toUpperCase()).join('');
};

// Expanded transaction types
const transactionTypes = [
  {
    type: 'deposit',
    categories: [
      { name: 'Crypto', options: ['BTC', 'ETH', 'USDT', 'BNB', 'XRP'] },
      { name: 'Fiat', options: ['USD', 'EUR', 'GBP', 'WIRE'] },
      { name: 'Stock', options: ['AAPL', 'GOOGL', 'MSFT', 'AMZN'] }
    ]
  },
  {
    type: 'withdraw',
    categories: [
      { name: 'Crypto', options: ['BTC', 'ETH', 'USDT', 'ADA', 'DOT'] },
      { name: 'Fiat', options: ['USD', 'EUR', 'JPY'] },
      { name: 'Stock', options: ['TSLA', 'NVDA', 'FB', 'NFLX'] }
    ]
  },
  {
    type: 'trade',
    categories: [
      { name: 'Crypto Pair', options: ['BTC/USDT', 'ETH/BTC', 'XRP/ETH'] },
      { name: 'Forex', options: ['EUR/USD', 'USD/JPY', 'GBP/USD'] },
      { name: 'Stock Trade', options: ['AAPL/GOOGL', 'MSFT/AMZN'] }
    ]
  },
  {
    type: 'investment',
    categories: [
      { name: 'Crypto', options: ['BTC Staking', 'ETH Liquidity Pool', 'ADA Staking'] },
      { name: 'Stock', options: ['Tech Index', 'S&P 500', 'Dividend Fund'] },
      { name: 'NFT', options: ['Digital Art', 'Collectible', 'Gaming Asset'] }
    ]
  }
];

// Generate a random transaction
const generateRandomTransaction = () => {
  const transactionType = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
  const category = transactionType.categories[Math.floor(Math.random() * transactionType.categories.length)];
  const asset = category.options[Math.floor(Math.random() * category.options.length)];

  return {
    id: Date.now(),
    username: `User ${Math.floor(Math.random() * 1000)}`,
    action: transactionType.type,
    currency: asset,
    amount: Math.floor(Math.random() * 50000),
    timestamp: new Date().toLocaleString(),
    status: ['completed', 'pending'][Math.floor(Math.random() * 2)]
  };
};

// Initial user activities
const baseUserActivities = [
  {
    id: 1,
    username: 'John Doe',
    action: 'deposit',
    currency: 'BTC',
    amount: 7100,
    timestamp: '07/23/2025, 01:41:56 PM',
    status: 'completed'
  },
  {
    id: 2,
    username: 'Sarah Martinez',
    action: 'trade',
    currency: 'ETH/USDT',
    amount: 40000,
    timestamp: '07/23/2025, 06:35:25 PM',
    status: 'completed'
  },
  {
    id: 3,
    username: 'Alex Kim',
    action: 'investment',
    currency: 'Tech Index',
    amount: 25000,
    timestamp: '07/23/2025, 01:30:48 PM',
    status: 'completed'
  },
  {
    id: 4,
    username: 'Emma Wilson',
    action: 'withdraw',
    currency: 'AAPL',
    amount: 15000,
    timestamp: '07/23/2025, 01:23:09 PM',
    status: 'pending'
  }
];

const TestimonialItem = ({ username, action, currency, amount, timestamp, status }) => {
  const { bg: backgroundColor, text: textColor } = generateColor(username);
  const initials = getInitials(username);

  // Determine amount class based on transaction type
  const amountClass = action === 'withdraw' || action === 'trade'
    ? styles.amountNegative
    : styles.amountPositive;

  // Format amount with dollar sign and commas
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.abs(amount));

  return (
    <div className={`${styles.testimonialItem} ${styles[action + 'Category']}`}>
      <div
        className={styles.userInitial}
        style={{
          backgroundColor,
          color: textColor
        }}
      >
        {initials}
      </div>

      <div className={styles.activityDetails}>
        <div className={styles.transactionInfo}>
          <h3 className={styles.username}>{username}</h3>
          <p className={styles.activity}>
            {action} {currency}
          </p>
        </div>

        <div className={styles.transactionDetails}>
          <div className={`${styles.amount} ${amountClass}`}>
            {action === 'withdraw' || action === 'trade' ? '-' : '+'}{formattedAmount}
          </div>
          <div className={styles.timestamp}>{timestamp}</div>
        </div>
      </div>
    </div>
  );
};

export default function TestimonialsPage() {
  const [userActivities, setUserActivities] = useState(baseUserActivities);
  const [filter, setFilter] = useState('all');
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup listener
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulated real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate adding a new activity
      const newActivity = generateRandomTransaction();

      setUserActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Adjust filter buttons for mobile
  const mobileFilterButtons = isMobile
    ? [
        { label: 'All', value: 'all' },
        { label: 'Deposit', value: 'deposit' },
        { label: 'Trade', value: 'trade' }
      ]
    : [
        { label: 'All Activities', value: 'all' },
        { label: 'Deposits', value: 'deposit' },
        { label: 'Trades', value: 'trade' },
        { label: 'Investments', value: 'investment' }
      ];

  // Filter activities
  const filteredActivities = filter === 'all'
    ? userActivities
    : userActivities.filter(activity => activity.action === filter);

  return (
    <div className={styles.testimonialsContainer}>
      <div className={styles.backgroundPattern}></div>

      <div className={styles.headerSection}>
        <h1>Live Platform Activities</h1>
        <p>Real-time insights into user transactions and achievements across our platform</p>

        <div className={styles.filterButtons}>
          {mobileFilterButtons.map(btn => (
            <button
              key={btn.value}
              className={filter === btn.value ? styles.activeFilter : ''}
              onClick={() => setFilter(btn.value)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.activitiesList}>
        {filteredActivities.map(activity => (
          <TestimonialItem
            key={activity.id}
            {...activity}
          />
        ))}
      </div>
    </div>
  );
}
