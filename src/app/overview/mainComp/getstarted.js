"use client";
import styles from '../page.module.css';

const QuickActions = () => {
  const actionItems = [
    {
      icon: "💰",
      title: "Deposit",
      description: "Add funds to your account",
      color: "linear-gradient(135deg, #4f46e5, #7c3aed)"
    },
    {
      icon: "📊",
      title: "Trade",
      description: "Buy or sell cryptocurrencies",
      color: "linear-gradient(135deg, #0ea5e9, #3b82f6)"
    },
    {
      icon: "💹",
      title: "Earn",
      description: "Stake your assets for rewards",
      color: "linear-gradient(135deg, #10b981, #059669)"
    },
    {
      icon: "🏦",
      title: "Withdraw",
      description: "Transfer funds to your bank",
      color: "linear-gradient(135deg, #f59e0b, #d97706)"
    }
  ];

  return (
    <div className={styles.quickActionsContainer}>
      {actionItems.map((item, index) => (
        <div 
          key={index} 
          className={styles.quickActionCard}
          style={{ background: item.color }}
        >
          <div className={styles.quickActionIcon}>
            {item.icon}
          </div>
          <div className={styles.quickActionContent}>
            <h3 className={styles.quickActionTitle}>{item.title}</h3>
            <p className={styles.quickActionDescription}>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickActions;
