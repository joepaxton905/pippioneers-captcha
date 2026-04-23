"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import styles from "./page.module.css";
import { authUser } from "../actions/authUser";

// Import components
import TradingViewWidget from "./mainComp/TradingViewWidget";
import CryptoDonutChart from "./mainComp/CryptoDonutChart";
import LiveCryptoMarket from "./mainComp/LiveCryptoMarket";
import dynamic from "next/dynamic";
const TestimonialsTicker = dynamic(() => import("./mainComp/TestimonialsTicker"), { ssr: false });
import Footer from "./mainComp/footer";

// Action icons component
const ActionIcon = ({ name }) => {
  switch (name) {
    case 'deposit':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
          <path d="M12 8v8"></path>
          <path d="M8 12h8"></path>
        </svg>
      );
    case 'trade':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 8l-9-7-9 7v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z"></path>
          <polyline points="16 14 12 10 8 14"></polyline>
          <line x1="12" y1="10" x2="12" y2="20"></line>
        </svg>
      );
    case 'withdraw':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
          <path d="M12 15V9"></path>
          <path d="M8 12h8"></path>
        </svg>
      );
    case 'analytics':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      );
    default:
      return null;
  }
};

const Overview = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("1D");
  const [showBalance, setShowBalance] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0);
  const [btcBalance, setBtcBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [autoTradesCount, setAutoTradesCount] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState([]);

  // Quick actions data
  const quickActions = [
    { name: 'Deposit', icon: 'deposit', path: '/addfunds' },
    { name: 'Trade', icon: 'trade', path: '/trade' },
    { name: 'Withdraw', icon: 'withdraw', path: '/withdraw' },
    { name: 'Analytics', icon: 'analytics', path: '/history/autotrade' },
  ];

  // No mock data needed for cryptoAssets - using live data

  const activityData = [
    {
      type: "Purchase",
      icon: "💰",
      time: "2 hours ago",
      amount: "+0.24 BTC",
      description: "Bought Bitcoin",
      status: "Completed",
      statusType: "complete"
    },
    {
      type: "Withdrawal",
      icon: "💸",
      time: "Yesterday",
      amount: "-1.5 ETH",
      description: "To external wallet",
      status: "Processing",
      statusType: "pending"
    },
    {
      type: "Deposit",
      icon: "📥",
      time: "3 days ago",
      amount: "+500 USDC",
      description: "From bank account",
      status: "Completed",
      statusType: "complete"
    }
  ];

  useEffect(() => {
    const tokenValue = Cookies.get("logToken");
    if (!tokenValue) {
      router.push("/");
    } else {
      fetchUserBalance();
    }
  }, [router]);

  // from here
  const [userData, setUserData] = useState({});
  useEffect(() => {
    async function getUser() {
      try {
        const data = await authUser();
        const { userData } = data;
        setUserData(userData);
        console.log(userData.suspendAccount);
        if (userData.suspendAccount === true) {
          router.push("/suspended");
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);
  // end here

  // from here
  useEffect(() => {
    async function getUser() {
      try {
        const data = await authUser();
        const { userData } = data;
        setUserData(userData);
        console.log(userData.sos);
        if (userData.sos === true) {
          router.push("/sos");
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);
  // end here
  




  // Calculate portfolio percentages based on actual balance values
  const calculatePortfolioData = (btc, eth, total) => {
    const btcValue = btc || 0;
    const ethValue = eth || 0;
    const totalValue = total || 0;

    // Calculate sum of all assets for percentage calculation
    const sum = btcValue + ethValue + totalValue;

    if (sum <= 0) {
      return [
        { name: "Bitcoin", symbol: "BTC", value: 0, percent: 0, color: "#F7931A" },
        { name: "Ethereum", symbol: "ETH", value: 0, percent: 0, color: "#627EEA" },
        { name: "Total Balance", symbol: "USD", value: 0, percent: 0, color: "#00FFA3" },
      ];
    }

    const btcPercent = (btcValue / sum) * 100;
    const ethPercent = (ethValue / sum) * 100;
    const totalPercent = 100 - btcPercent - ethPercent;

    return [
      { name: "Bitcoin", symbol: "BTC", value: btcValue, percent: btcPercent, color: "#F7931A" },
      { name: "Ethereum", symbol: "ETH", value: ethValue, percent: ethPercent, color: "#627EEA" },
      { name: "Total Balance", symbol: "USD", value: totalValue, percent: totalPercent, color: "#00FFA3" },
    ];
  };

  const fetchUserBalance = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/user-balance', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      const data = await response.json();
      if (data.status === "ok") {
        setTotalBalance(data.totalBalance + data.BTCbalance + data.ETHbalance);
        setBtcBalance(data.BTCbalance);
        setEthBalance(data.ETHbalance);
        setAutoTradesCount(data.autoTradesCount);
        setRecentActivity(data.recentActivity || []);

        // Update portfolio data with real values
        setPortfolioData(calculatePortfolioData(data.BTCbalance, data.ETHbalance, data.totalBalance));
      } else {
        console.error("Failed to fetch balance:", data.message);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };

  // Format the balance with dollar sign and commas
  const formatCurrency = (amount) => {
    return `$${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Handle navigation for quick action buttons
  const handleQuickAction = (path) => {
    if (path) {
      router.push(path);
    }
  };

  // Helper to determine the relative time from a date string
  const getRelativeTime = (dateString) => {
    if (!dateString) return "No date";

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) return "No date";

      // Format as date only: MM/DD/YYYY
      return date.toLocaleDateString();
    } catch (e) {
      console.error("Error parsing date:", e);
      return "No date";
    }
  };

  // Get appropriate icon for activity type
  const getActivityIcon = (action) => {
    const actionType = action ? action.toLowerCase() : '';

    if (actionType.includes('deposit')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      );
    } else if (actionType.includes('withdraw')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20"></path>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      );
    }
  };

  // Testimonials data can be passed in; if omitted, component will generate randomized items.

  return (
    <main className={styles.container}>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.headerTitle}>Dashboard</h1>
            <div className={styles.headerSubtitle}>Welcome back! Your portfolio is looking good.</div>
          </div>
          <div className={styles.userActions}>
            <button className={styles.secondaryButton} onClick={() => router.push('/addfunds')}>Deposit</button>
            <button className={styles.primaryButton} onClick={() => router.push('/withdraw')}>Withdraw</button>
          </div>
        </div>

        <div className={styles.dashboardGrid}>
          {/* Balance Summary Section */}
          <section className={`${styles.balanceSection} ${styles.glassCard}`}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Balance Summary</h2>
            </div>
            <div className={styles.balanceSummary}>
              <div className={styles.totalBalance}>
                <div className={styles.balanceLabel}>Total Balance</div>
                <div className={styles.balanceValue} onClick={toggleBalance}>
                  {isLoading
                    ? "Loading..."
                    : showBalance
                      ? formatCurrency(totalBalance)
                      : "••••••••"}
                </div>
                <div className={styles.balanceChange}>
                  <span className={styles.balanceIcon}>↗</span> +3.8% from last week
                </div>
              </div>
              <div className={styles.balanceStats}>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>0</div>
                  <div className={styles.statLabel}>Assets</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>
                    {isLoading ? "..." : autoTradesCount}
                  </div>
                  <div className={styles.statLabel}>Auto Trades</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "20px" }}> <TestimonialsTicker /> </div>
          </section>

          {/* Quick Actions Section */}
          <section className={`${styles.quickActionsSection} ${styles.glassCard}`}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Quick Actions</h2>
              <div className={styles.scrollIndicator}>
                <span className={styles.scrollDot}></span>
                <span className={styles.scrollDot}></span>
                <span className={styles.scrollDot}></span>
              </div>
            </div>
            <div className={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className={styles.actionCard}
                  onClick={() => handleQuickAction(action.path)}
                  style={{ cursor: action.path ? 'pointer' : 'default' }}
                >
                  <div className={styles.actionIcon}>
                    <ActionIcon name={action.icon} />
                  </div>
                  <h3 className={styles.actionTitle}>{action.name}</h3>
                </div>
              ))}
              <div className={`${styles.actionCard} ${styles.moreActionCard}`}>
                <div className={styles.actionIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                  </svg>
                </div>
                <h3 className={styles.actionTitle}>More</h3>
              </div>
            </div>
          </section>






          {/* Chart Section */}
          <section className={`${styles.chartSection} ${styles.glassCard}`}>
            <div className={styles.chartHeader}>
              <h2 className={styles.sectionTitle}>Market Trend</h2>
              <div className={styles.chartControls}>
                {["1D", "1W", "1M", "3M", "1Y"].map((period) => (
                  <button
                    key={period}
                    className={`${styles.chartControlButton} ${currentTab === period ? styles.chartControlActive : ""}`}
                    onClick={() => setCurrentTab(period)}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.chartContainer}>
              <TradingViewWidget period={currentTab} />
            </div>
          </section>

          {/* Social Proof - Testimonials under Portfolio */}
          {/* <TestimonialsTicker /> */}

          {/* Market Section */}
          <section className={`${styles.marketSection} ${styles.glassCard}`}>
            <LiveCryptoMarket />
          </section>

          {/* Portfolio Section */}
          <section className={`${styles.portfolioSection} ${styles.glassCard}`}>
            <div className={`${styles.portfolioHeader} ${styles.sectionHeader}`}>
              <h2 className={styles.sectionTitle}>Portfolio</h2>
              <div className={styles.portfolioValue}>
                {isLoading
                  ? "Loading..."
                  : showBalance
                    ? formatCurrency(totalBalance)
                    : "••••••"}
              </div>
            </div>

            <div className={styles.donutChartContainer}>
              <CryptoDonutChart data={portfolioData} showValues={showBalance} />
              <div className={styles.donutCenter}>
                <p className={styles.donutValue}>{showBalance ? "+5.2%" : "••••"}</p>
                <p className={styles.donutLabel}>24h Change</p>
              </div>
            </div>

            <div className={styles.portfolioList}>
              {portfolioData.map((item) => (
                <div key={item.symbol} className={styles.portfolioItem}>
                  <div className={styles.portfolioItemLeft}>
                    <div
                      className={styles.portfolioColorIndicator}
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div className={styles.portfolioItemName}>{item.name}</div>
                  </div>
                  <div>
                    <span className={styles.portfolioItemValue}>
                      {showBalance ? `$${item.value.toLocaleString()}` : "•••••"}
                    </span>
                    <span className={styles.portfolioItemPercent}>{item.percent.toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* <div > <TestimonialsTicker /> </div> */}




          </section>









          {/* Recent Activity */}
          <section className={`${styles.activitySection} ${styles.glassCard}`}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recent Activity</h2>
              <div className={styles.scrollIndicator}>
                <span className={styles.scrollDot}></span>
                <span className={styles.scrollDot}></span>
                <span className={styles.scrollDot}></span>
              </div>
            </div>

            <div className={styles.activityList}>
              {isLoading ? (
                <div className={styles.loadingActivity}>Loading recent activity...</div>
              ) : recentActivity && recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div key={activity.depositID || index} className={styles.activityItem}>
                    <div className={styles.activityHeader}>
                      <div className={styles.activityType}>
                        <div className={styles.activityTypeIcon}>
                          {getActivityIcon(activity.action)}
                        </div>
                        {activity.action || "Transaction"}
                      </div>
                      <div className={styles.activityTime}>{getRelativeTime(activity.date)}</div>
                    </div>
                    <div className={styles.activityContent}>
                      <div className={styles.activityAmount}>{activity.amount || "$0.00"}</div>
                      <div className={styles.activityDescription}>{activity.method || "Via deposit"}</div>
                    </div>
                    <div className={`${styles.activityStatus} ${activity.status && activity.status.toLowerCase() === 'completed' ? styles.statusComplete : styles.statusPending}`}>
                      {activity.status && activity.status.toLowerCase() === 'completed' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                      )}
                      {' '}{activity.status || "Pending"}
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noActivity}>No recent activity found</div>
              )}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Overview;
