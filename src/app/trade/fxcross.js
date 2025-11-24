import { useEffect, useState } from "react";

const TradingViewForexCrossRates = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const containerStyle = {
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#151b46",
    border: "1px solid #151b46",
    marginBottom: "25px"
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    backgroundColor: "#151b46",
    borderBottom: "1px solid #151b46"
  };

  const pulseStyle = {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#4fd1c5",
    marginRight: "10px",
    animation: "pulse 2s infinite",
  };

  const loadingStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "400px",
    backgroundColor: "#151b46",
  };

  useEffect(() => {
    // Add the pulse animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(79, 209, 197, 0.4); }
        70% { box-shadow: 0 0 0 8px rgba(79, 209, 197, 0); }
        100% { box-shadow: 0 0 0 0 rgba(79, 209, 197, 0); }
      }
    `;
    document.head.appendChild(style);

    // Check if the script is already present
    if (!document.getElementById("tradingview-forex-cross-rates-script")) {
      try {
      const script = document.createElement("script");
        script.id = "tradingview-forex-cross-rates-script";
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
      script.async = true;

        // Add event listeners for loading state
        script.onload = () => {
          setTimeout(() => setIsLoading(false), 1200);
        };

        script.onerror = () => {
          setIsError(true);
          setIsLoading(false);
        };

      script.innerHTML = JSON.stringify({
        width: "100%",
        height: "400",
        currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"],
          isTransparent: true,
          colorTheme: "dark",
        locale: "en",
          backgroundColor: "#151b46",
          gridLineColor: "#151b46",
      });

      document
        .getElementById("tradingview-forex-cross-rates")
        .appendChild(script);
      } catch (error) {
        console.error("Error loading TradingView widget:", error);
        setIsError(true);
        setIsLoading(false);
      }
    } else {
      // If script is already present, we're not in the first load
      setIsLoading(false);
    }

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={pulseStyle}></div>
        <span style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase" }}>
          LIVE MARKET DATA
        </span>
      </div>

      {isLoading && (
        <div style={loadingStyle}>
          <div style={{ textAlign: "center" }}>
            <svg className="animate-spin" width="40" height="40" viewBox="0 0 24 24" style={{ color: "#4fd1c5", margin: "0 auto 12px" }}>
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V2.5c-5 0-9 4-9 9h2zm2 5.3A7.9 7.9 0 014 12H2c0 3.9 2.1 7.3 5.3 9l1.3-2.7z"
              ></path>
            </svg>
            <div style={{ fontFamily: "monospace", color: "#a0aec0", fontSize: "14px" }}>
              <span style={{ color: "#4fd1c5" }}>Connecting</span> to market data servers...
            </div>
          </div>
        </div>
      )}

      {isError && (
        <div style={loadingStyle}>
          <div style={{ textAlign: "center" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" style={{ color: "#f56565", margin: "0 auto 12px" }}>
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div style={{ color: "#a0aec0", fontSize: "14px" }}>
              Failed to load market data. Please refresh.
            </div>
          </div>
        </div>
      )}

    <div
      className="tradingview-widget-container"
      id="tradingview-forex-cross-rates"
        style={{ display: isLoading || isError ? 'none' : 'block', height: "400px" }}
    >
        <div className="tradingview-widget-container__widget" style={{ height: "400px" }}></div>
      </div>
    </div>
  );
};

export default TradingViewForexCrossRates;
