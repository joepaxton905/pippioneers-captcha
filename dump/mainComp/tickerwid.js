"use client";
import { useEffect } from "react";

const TickerWid = () => {
  useEffect(() => {
    // Check if the script is already present
    if (!document.getElementById("tradingview-ticker-tape-script")) {
      const script = document.createElement("script");
      script.id = "tradingview-ticker-tape-script"; // Set an id to the script tag
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbols: [
          { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
          { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
          { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
          { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
          { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
          { description: "BTC to USD", proName: "BITSTAMP:BTCUSD" },
        ],
        showSymbolLogo: true,
        isTransparent: false,
        displayMode: "adaptive",
        colorTheme: "dark",
        locale: "en",
      });
      document.getElementById("tradingview-ticker-tape").appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container" id="tradingview-ticker-tape">
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

export default TickerWid;
