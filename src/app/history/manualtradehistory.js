"use client";
import { authUser } from "../actions/authUser";
import k from "./history.module.css";
import { useEffect, useState } from "react";

const ManualTradeHistory = () => {
  const [userData, setUserData] = useState();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const data = await authUser();
        const { userData } = data;
        setUserData(userData);

        const placedOrders = userData?.placeOder || [];
        const reversedOrders = placedOrders.slice().reverse();
        setOrders(reversedOrders);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  if (loading) {
    return (
      <div className={k.loadingContainer}>
        <div className={k.loadingSpinner}></div>
        <span>Loading trading history...</span>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className={k.emptyState}>
        No manual trades found. Start trading to see your history here.
      </div>
    );
  }

  return (
    <div className={k.historyContainer}>
      {orders.map((trade) => (
        <div className={k.mtable} key={trade._id}>
          <div className={k.mtableT}>
            <div className={k.tradeCard}>
              <span className={k.currencyPair}>
                {trade.CurrencyPair}
                <span className={k.executionType}>{trade.execution}</span>
              </span>
            </div>
            <span className={`${k.amount} ${trade.amountWonOrLost.startsWith("-") ? k.lossAmount : k.gainAmount}`}>
              {trade.amountWonOrLost}
            </span>
          </div>
          <div className={k.mtableD}>
            <span className={k.lotSize}>${trade.lotSize.toLocaleString()}</span>
            <span className={k.dateText}>{trade.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManualTradeHistory;
