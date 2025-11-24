"use client";
import { useEffect } from "react";

const Chart = () => {
  useEffect(() => {
    // Check if the script is already present
    if (!document.getElementById("tradingview-advanced-chart-script")) {
      const script = document.createElement("script");
      script.id = "tradingview-advanced-chart-script"; // Set an id to the script tag
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: "740",
        symbol: "NASDAQ:AAPL",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "en",
        allow_symbol_change: true,
        calendar: false,
        support_host: "https://www.tradingview.com",
      });
      document.getElementById("tradingview-advanced-chart").appendChild(script);
    }
  }, []);

  //   const htmlContent = `<!-- TradingView Widget BEGIN -->
  // <div class="tradingview-widget-container">
  //   <div class="tradingview-widget-container__widget"></div>
  //   <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text"></span></a></div>
  //   <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js" async>
  //   {
  //   "width": "100%",
  //   "height": "760",
  //   "symbol": "NASDAQ:AAPL",
  //   "interval": "D",
  //   "timezone": "Etc/UTC",
  //   "theme": "light",
  //   "style": "1",
  //   "locale": "en",
  //   "allow_symbol_change": true,
  //   "calendar": false,
  //   "support_host": "https://www.tradingview.com"
  // }
  //   </script>
  // </div>
  // <!-- TradingView Widget END -->`;
  return (
    <div
      className="tradingview-widget-container"
      id="tradingview-advanced-chart"
    >
      <div className="tradingview-widget-container__widget"></div>

      {/* <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Chart by TradingView</span>
        </a>
      </div> */}
    </div>
  );
};

export default Chart;
