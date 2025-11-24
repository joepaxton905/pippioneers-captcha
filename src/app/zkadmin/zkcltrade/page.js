"use client";
import { useEffect, useState } from "react";
import { authUser } from "@/app/actions/authUser";
import { getCardDetails } from "@/app/zkadmin/action/suspended";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import styles from "./zkcltrade.module.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
// import { sendMail } from "@/app/actions/sendMail";

const Cltrade = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function checkVersion() {
          try {
            const response = await fetch('/api/check-version');
            const data = await response.json();
            console.log("data",data);

            if (data.isFreeTier) {
              router.push('/zkadmin/access-denied');
            } else {
              // setIsPremium(true);
            }
          } catch (error) {
            console.error('Error checking version:', error);
          } finally {
            // setLoading(false);
          }
        }

        checkVersion();
      }, [router]);

      const [MTrades, setMTrades] = useState([]);

      useEffect(() => {
        const email = Cookies.get("mtEmail"); // fixed: pass a string, not an array
        const input = { email: email };
        fetchTrades(input);
      }, []);

      const fetchTrades = async (input) => {
        try {
          const res = await fetch("/api/mtrade", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
          });

          const data = await res.json();
          setMTrades(data);
        } catch (error) {
          console.log(error);
          showToast('error', 'Failed to load trades');
        }
      };

      const confirmProfit = async (trade) => {
        const profitAmount = (trade.takeProfit).toFixed(2);

        const result = await Swal.fire({
          title: 'Confirm Profit',
          html: `
            <p>Are you sure you want to mark this trade as Profit?</p>
            <p>Profit amount: <strong class="text-success">$${profitAmount}</strong></p>
            <p>This will increase the user's balance by $${profitAmount}</p>
          `,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#10b981',
          cancelButtonColor: '#6b7280',
          confirmButtonText: 'Yes, mark as Profit'
        });

        if (result.isConfirmed) {
          await handleProfit(trade._id);
        }
      };

      const confirmLoss = async (trade) => {
        const lossAmount = (trade.lotSize).toFixed(2);

        const result = await Swal.fire({
          title: 'Confirm Loss',
          html: `
            <p>Are you sure you want to mark this trade as Loss?</p>
            <p>Loss amount: <strong class="text-danger">-$${lossAmount}</strong></p>
            <p>This will decrease the user's balance by $${lossAmount}</p>
          `,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#e11d48',
          cancelButtonColor: '#6b7280',
          confirmButtonText: 'Yes, mark as Loss'
        });

        if (result.isConfirmed) {
          await handleLoss(trade._id);
        }
      };

      const handleProfit = async (tradeId) => {
        setIsLoading(true);
        try {
          const email = Cookies.get("mtEmail");
          const response = await fetch("/api/approve-trade", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, tradeId }),
          });

          const result = await response.json();

          if (result.success) {
            showToast('success', 'Trade marked as Profit successfully');
            // Update the trades list
            const input = { email: email };
            fetchTrades(input);
          } else {
            showToast('error', result.message || 'Failed to mark trade as Profit');
          }
        } catch (error) {
          console.error("Error marking trade as Profit:", error);
          showToast('error', 'An error occurred while processing the trade');
        } finally {
          setIsLoading(false);
        }
      };

      const handleLoss = async (tradeId) => {
        setIsLoading(true);
        try {
          const email = Cookies.get("mtEmail");
          const response = await fetch("/api/reject-trade", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, tradeId }),
          });

          const result = await response.json();

          if (result.success) {
            showToast('success', 'Trade marked as Loss successfully');
            // Update the trades list
            const input = { email: email };
            fetchTrades(input);
          } else {
            showToast('error', result.message || 'Failed to mark trade as Loss');
          }
        } catch (error) {
          console.error("Error marking trade as Loss:", error);
          showToast('error', 'An error occurred while processing the trade');
        } finally {
          setIsLoading(false);
        }
      };

      const showToast = (icon, title) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        Toast.fire({
          icon,
          title,
        });
      };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Trade Management</h1>

            <div className={styles.tradesContainer}>
              {MTrades.length > 0 ? (
                MTrades.map((trade, index) => (
                  <div key={index} className={styles.tradeCard}>
                    <div className={styles.tradeHeader}>
                      <h3 className={styles.currencyPair}>{trade.CurrencyPair}</h3>
                      <span className={styles.executionBadge}>{trade.execution}</span>
                    </div>

                    <div className={styles.tradeDetails}>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Lot Size:</span>
                        <span className={styles.detailValue}>{trade.lotSize}</span>
                      </div>

                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Price:</span>
                        <span className={styles.detailValue}>{trade.price}</span>
                      </div>

                      {trade.orderStatus === "Pending" ? (
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Potential Profit:</span>
                          <span className={styles.profitValue}>${(trade.takeProfit).toFixed(2)}</span>
                        </div>
                      ) : (
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Result:</span>
                          <span className={`${
                            trade.orderStatus === "Profit"
                              ? styles.profitValue
                              : styles.lossValue
                          }`}>
                            {trade.amountWonOrLost}
                          </span>
                        </div>
                      )}

                      {trade.orderStatus && (
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Status:</span>
                          <span className={`${styles.statusBadge} ${
                            trade.orderStatus === "Profit"
                              ? styles.statusProfit
                              : trade.orderStatus === "Loss"
                                ? styles.statusLoss
                                : styles.statusPending
                          }`}>
                            {trade.orderStatus}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className={styles.actionButtons}>
                      <button
                        className={`${styles.button} ${styles.profitButton}`}
                        onClick={() => confirmProfit(trade)}
                        disabled={isLoading || trade.orderStatus !== "Pending"}
                      >
                        Profit
                      </button>
                      <button
                        className={`${styles.button} ${styles.lossButton}`}
                        onClick={() => confirmLoss(trade)}
                        disabled={isLoading || trade.orderStatus !== "Pending"}
                      >
                        Loss
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noTrades}>
                  <p>No trades available at the moment</p>
                </div>
              )}
            </div>
        </div>
    );
}

export default Cltrade;