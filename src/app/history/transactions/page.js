"use client";
import k from "../history.module.css";
import { useState, useEffect } from "react";
import { authUser } from "@/app/actions/authUser";
import { Locaa } from "@/app/utils/locaa";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Transactions = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Check authentication
        const tokenValue = Cookies.get("logToken");
        if (!tokenValue) {
          router.push("/");
          return;
        }

        const data = await authUser();
        const { userData } = data;

        if (userData?.suspendAccount === true) {
          router.push("/suspended");
          return;
        }

        // Load transactions
        const deposits = userData.deposit || [];
        const reversedTransactions = deposits.slice().reverse();
        setTransactions(reversedTransactions);
      } catch (error) {
        console.error("Error loading transactions:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [router]);

  // Helper function to determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "#3366ff";
      case "Failed": return "#ef4444";
      case "Approved": return "#8b5cf6";
      case "Completed": return "#22c55e";
      default: return "#22c55e";
    }
  };

  if (loading) {
    return (
      <div className={k.loadingContainer}>
        <div className={k.loadingSpinner}></div>
        <span>Loading transactions...</span>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className={k.emptyState}>
        No transactions found. Deposits and withdrawals will appear here.
      </div>
    );
  }

  return (
    <div className={k.historyContainer}>
      {transactions.map((transaction) => (
        <div className={k.mtable} key={transaction._id}>
          <div className={k.mtableT}>
            <div className={k.tradeCard}>
              <span className={k.currencyPair}>
                {transaction.action}
                <span
                  className={k.executionType}
                  style={{ color: getStatusColor(transaction.status) }}
                >
                  {transaction.status}
                </span>
              </span>
            </div>
            <span
              className={k.amount}
              style={{ color: getStatusColor(transaction.status) }}
            >
              {transaction.status === "Pending"
                ? `-$${Locaa(transaction.depositAmount)}`
                : transaction.status === "Failed"
                ? `$${Locaa(transaction.depositAmount)}`
                : transaction.status === "Approved"
                ? `-$${Locaa(transaction.depositAmount)}`
                : `+$${transaction.depositAmount}`}
            </span>
          </div>
          <div className={k.mtableD}>
            <span className={k.lotSize}>{transaction.depositMethod}</span>
            <span className={k.dateText}>{transaction.nyTime}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Transactions;
