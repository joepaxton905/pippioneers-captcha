"use client";
import { MDBInput, MDBTextArea } from "mdb-react-ui-kit";
// import "react-quill/dist/quill.snow.css";
// Dynamically import Quill to work with Next.js SSR
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import { useEffect } from "react";
import { useState } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
// import { sendMsg } from "./action/sendmsg";
// import { sendMail } from "./utils/sendMail";
import { binanceMessage } from "../action/payoutemail";
import styles from "./cryptoForms.module.css";

export default function BinanceMessage() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !subject || !text) {
      alert("Please fill all fields");
      return;
    }

    const data = { email, subject, text };

    try {
      const resp = await binanceMessage(data);
      if (resp) {
        alert("Message sent successfully!");
        setEmail("");
        setSubject("");
        setText("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    }
  };

  return (
    <div className={`${styles.mailContainer} ${styles.formContainer}`}>
      <h2 className={styles.subTitle}>Binance Mailing</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="binance-email">Email</label>
          <input
            className={styles.input}
            id="binance-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="recipient@example.com"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="binance-subject">Subject</label>
          <input
            className={styles.input}
            id="binance-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="binance-message">Message</label>
          <textarea
            className={styles.textarea}
            id="binance-message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your message here..."
            required
          />
        </div>

        <button className={styles.button} type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
}
