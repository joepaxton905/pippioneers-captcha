"use client";

import { useMemo } from "react";
import styles from "../page.module.css";

export default function TestimonialsTicker({ items, duplicate = true }) {
  const renderUserIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    );
  };

  const randomizedItems = useMemo(() => {
    if (Array.isArray(items) && items.length > 0) return items;

    const types = ["Deposited", "Withdrew", "Invested"]; // keep these three for message consistency
    const methods = [
      "bank transfer", "crypto wallet", "card", "P2P", "wire",
      "ACH", "SEPA", "wire transfer", "bank wire", "instant buy",
      "Apple Pay", "Google Pay", "PayPal", "cash deposit", "PIX",
      "M-Pesa", "UPI", "Zelle", "Skrill", "Neteller"
    ];
    const investAssets = [
      // Crypto
      "bitcoin", "ethereum", "solana", "cardano", "ripple",
      "dogecoin", "litecoin", "polkadot", "tron", "avalanche",
      "chainlink", "uniswap", "cosmos", "near", "aptos",
      "arbitrum", "optimism", "polygon",
      // Stocks (tickers)
      "AAPL stock", "MSFT stock", "TSLA stock", "NVDA stock", "AMZN stock",
      "GOOGL stock", "META stock", "NFLX stock", "BRK.B stock", "JPM stock",
      // Forex pairs
      "EUR/USD", "GBP/USD", "USD/JPY", "USD/CAD", "AUD/USD", "NZD/USD", "USD/CHF",
      // Commodities
      "gold", "silver", "wti crude", "brent crude", "natural gas", "copper",
      // Indices
      "S&P 500", "NASDAQ 100", "Dow Jones", "FTSE 100", "DAX", "Nikkei 225", "CAC 40", "Hang Seng",
      // ETFs
      "SPY", "QQQ", "VTI", "IWM", "GLD", "SLV", "ARKK"
    ];
    const regions = [
      // Existing
      "New York, US", "London, UK", "Berlin, DE", "Toronto, CA", "Sydney, AU",
      "Dubai, AE", "Singapore, SG", "Paris, FR", "Dublin, IE", "Madrid, ES",
      // North America
      "Los Angeles, US", "San Francisco, US", "Chicago, US", "Miami, US", "Austin, US",
      "Vancouver, CA", "Montreal, CA", "Mexico City, MX", "Monterrey, MX",
      // Europe
      "Rome, IT", "Milan, IT", "Zurich, CH", "Geneva, CH", "Amsterdam, NL",
      "Rotterdam, NL", "Stockholm, SE", "Oslo, NO", "Copenhagen, DK", "Helsinki, FI",
      "Prague, CZ", "Warsaw, PL", "Vienna, AT", "Budapest, HU", "Lisbon, PT",
      "Barcelona, ES", "Valencia, ES", "Brussels, BE", "Luxembourg, LU",
      // Middle East
      "Doha, QA", "Riyadh, SA", "Kuwait City, KW", "Abu Dhabi, AE",
      // Asia-Pacific
      "Tokyo, JP", "Osaka, JP", "Seoul, KR", "Hong Kong, HK", "Kuala Lumpur, MY",
      "Jakarta, ID", "Bangkok, TH", "Manila, PH", "Mumbai, IN", "Bangalore, IN",
      "Delhi, IN", "Auckland, NZ", "Wellington, NZ", "Melbourne, AU", "Brisbane, AU",
      // Africa
      "Nairobi, KE", "Cape Town, ZA", "Johannesburg, ZA",
      "Cairo, EG",
      // South America
      "Bogotá, CO", "Santiago, CL", "Buenos Aires, AR", "Lima, PE",
      "Sao Paulo, BR", "Rio de Janeiro, BR"
    ];

    const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randomUsd = () => {
      const n = Math.floor(Math.random() * 95000) + 500; // $500 - $95,500
      return `$${n.toLocaleString()}`;
    };
    const relativeTime = () => {
      const n = Math.floor(Math.random()*55)+2; // 2-56m
      return `${n}m ago`;
    };

    const count = 12;
    const base = Array.from({ length: count }).map(() => {
      const type = randomPick(types);
      const amount = randomUsd();
      const method = randomPick(methods);
      const region = randomPick(regions);

      if (type === "Invested") {
        const asset = randomPick(investAssets);
        return { type, text: `someone in ${region} just invested ${amount} worth of ${asset}`, meta: "Auto-Trade", time: relativeTime() };
      }
      if (type === "Withdrew") {
        return { type, text: `someone in ${region} just withdrew ${amount}`, meta: method, time: relativeTime() };
      }
      return { type, text: `someone in ${region} just deposited ${amount}`, meta: method, time: relativeTime() };
    });

    return base;
  }, [items]);

  const trackItems = useMemo(() => {
    return duplicate ? [...randomizedItems, ...randomizedItems] : randomizedItems;
  }, [randomizedItems, duplicate]);

  return (
    <section className={`${styles.testimonialsSection} ${styles.glassCard}`} aria-label="Live user activity testimonials">
      <div className={styles.testimonialsWrapper}>
        <div className={styles.testimonialsTrack}>
          {trackItems.map((item, idx) => (
            <div className={styles.testimonialItem} key={`testimonial-${idx}`}>
              <span className={styles.testimonialIcon}>{renderUserIcon()}</span>
              <span className={styles.testimonialText}>{item.text}</span>
              {item.meta ? <span className={styles.testimonialMeta}>• {item.meta}</span> : null}
              {item.time ? <span className={styles.testimonialTime}>• {item.time}</span> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
