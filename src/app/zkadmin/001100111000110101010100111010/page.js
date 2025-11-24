"use client";
import { payoutEmail } from "../action/payoutemail";
import { useState, useEffect } from "react";
import OutPayBlockChain from "./blockchain";
import OutPayCoinbase from "./coinbase";
import BinanceMessage from "./binancemessage";
import { useRouter } from "next/navigation";
import styles from "./cryptoForms.module.css";

const OutPay = () => {
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    async function checkVersion() {
      try {
        const response = await fetch('/api/check-version');
        const data = await response.json();

        if (data.isFreeTier) {
          router.push('/zkadmin/access-denied');
        } else {
          setIsPremium(true);
        }
      } catch (error) {
        console.error('Error checking version:', error);
      }
    }

    checkVersion();
  }, [router]);

  const [inputs, setInput] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: inputs.email,
      amount: inputs.amount,
      currency: inputs.currency ? inputs.currency.toUpperCase() : '',
    };

    try {
      const resp = await payoutEmail(data);
      if (resp) {
        alert("Withdraw Email Sent Successfully");
      }
    } catch (error) {
      console.error("Error sending withdraw email:", error);
      alert("Failed to send withdraw email");
    }
  };

  if (!isPremium) {
    return null; // Don't render anything while checking permissions
  }

  return (
    <div className={styles.container} style={{ overflow: "auto", height: "450vh" }}>
      <h1 className={styles.title}>Crypto Payment Management</h1>

      <div className={styles.formsGrid}>
        <div className={styles.formContainer}>
          <h2 className={styles.subTitle}>Binance</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="amount">Amount</label>
              <input
                className={styles.input}
                id="amount"
                type="number"
                name="amount"
                value={inputs.amount || ""}
                onChange={handleChange}
                placeholder="Enter amount"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="currency">Currency</label>
              <input
                className={styles.input}
                id="currency"
                type="text"
                name="currency"
                value={inputs.currency || ""}
                onChange={handleChange}
                placeholder="e.g. BTC, ETH, USDT"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input
                className={styles.input}
                id="email"
                type="email"
                name="email"
                value={inputs.email || ""}
                onChange={handleChange}
                placeholder="user@example.com"
                required
              />
            </div>

            <button className={styles.button} type="submit">
              Send Withdraw Email
            </button>
          </form>
        </div>

        <OutPayBlockChain />
        <OutPayCoinbase />
      </div>

      <BinanceMessage/>
    </div>
  );
};

export default OutPay;
