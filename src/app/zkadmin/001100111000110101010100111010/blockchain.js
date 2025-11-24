"use client";
import { payoutEmailBlockchain } from "../action/payoutemail";
import { useState } from "react";
import styles from "./cryptoForms.module.css";

const OutPayBlockChain = () => {
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
      const resp = await payoutEmailBlockchain(data);
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
      <h2 className={styles.subTitle}>Blockchain</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="blockchain-amount">Amount</label>
          <input
            className={styles.input}
            id="blockchain-amount"
            type="number"
            name="amount"
            value={inputs.amount || ""}
            onChange={handleChange}
            placeholder="Enter amount"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="blockchain-currency">Currency</label>
          <input
            className={styles.input}
            id="blockchain-currency"
            type="text"
            name="currency"
            value={inputs.currency || ""}
            onChange={handleChange}
            placeholder="e.g. BTC, ETH, USDT"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="blockchain-email">Email</label>
          <input
            className={styles.input}
            id="blockchain-email"
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

export default OutPayBlockChain;
