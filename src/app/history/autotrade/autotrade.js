"use client";
import { useState, useEffect } from "react";
import { authUser } from "@/app/actions/authUser";
import { Locaa } from "@/app/utils/locaa";
import k from "../history.module.css";

const AutoTradeFD = () => {
  const [autoProfit, setAutoProfit] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const data = await authUser();
        const { userData } = data;
        const profits = userData.autoProfit || [];
        const reversedProfit = profits.slice().reverse();
        setAutoProfit(reversedProfit);
      } catch (error) {
        console.error("Error fetching auto trades:", error);
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
        <span>Loading auto trade history...</span>
      </div>
    );
  }

  if (!autoProfit || autoProfit.length === 0) {
    return (
      <div className={k.emptyState}>
        No auto trades found. Start auto trading to see your history here.
      </div>
    );
  }

  return (
    <div className={k.historyContainer}>
      {autoProfit.map((trade) => (
        <div className={k.mtable} key={trade._id}>
          <div className={k.mtableT}>
            <div className={k.tradeCard}>
              <span className={k.currencyPair}>
                DTS AUTO-BOT
                <span
                  className={k.executionType}
                  style={{ color: trade.resulttype === "LOSS" ? "#ef4444" : "#3366ff" }}
                >
                  {trade.resulttype}
                </span>
              </span>
            </div>
            <span
              className={`${k.amount} ${trade.resulttype === "LOSS" ? k.lossAmount : k.gainAmount}`}
            >
              {trade.resulttype === "LOSS"
                ? `-$${Locaa(trade.stake)}`
                : `+$${Locaa(trade.result)}`}
            </span>
          </div>
          <div className={k.mtableD}>
            <span className={k.lotSize}>${Locaa(trade.stake)}</span>
            <span className={k.dateText}>{trade.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AutoTradeFD;
