"use client";

import { useState, useEffect } from "react";

const CoinList = () => {
  useEffect(() => {
    // Check if the script is already present
    if (!document.getElementById("tradingview-screener-script")) {
      const script = document.createElement("script");
      script.id = "tradingview-screener-script"; // Set an id to the script tag
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: "100%",
        defaultColumn: "overview",
        screener_type: "crypto_mkt",
        displayCurrency: "USD",
        colorTheme: "light",
        locale: "en",
        isTransparent: true,
      });
      document.getElementById("tradingview-screener").appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container" id="tradingview-screener">
      <div className="tradingview-widget-container__widget"></div>

      {/* <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div> */}
    </div>
  );
};

export default CoinList;
