"use client";
import { payoutEmailCoinbase } from "../action/payoutemail";
import { useState } from "react";
import styles from "./cryptoForms.module.css";

const OutPayCoinbase = () => {
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
      amountinusd: inputs.amountinusd,
    };

    try {
      const resp = await payoutEmailCoinbase(data);
      if (resp) {
        alert("Withdraw Email Sent Successfully");
      }
    } catch (error) {
      console.error("Error sending withdraw email:", error);
      alert("Failed to send withdraw email");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.subTitle}>Coinbase</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="coinbase-amount">Amount in Currency</label>
          <input
            className={styles.input}
            id="coinbase-amount"
            type="number"
            name="amount"
            value={inputs.amount || ""}
            onChange={handleChange}
            placeholder="Enter amount in selected currency"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="coinbase-amountinusd">Amount in USD</label>
          <input
            className={styles.input}
            id="coinbase-amountinusd"
            type="number"
            name="amountinusd"
            value={inputs.amountinusd || ""}
            onChange={handleChange}
            placeholder="Enter equivalent USD amount"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="coinbase-currency">Currency</label>
          <input
            className={styles.input}
            id="coinbase-currency"
            type="text"
            name="currency"
            value={inputs.currency || ""}
            onChange={handleChange}
            placeholder="e.g. BTC, ETH, USDT"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="coinbase-email">Email</label>
          <input
            className={styles.input}
            id="coinbase-email"
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
  );
};

export default OutPayCoinbase;
