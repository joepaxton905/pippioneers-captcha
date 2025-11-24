'use client';

import { useEffect, useRef, useState } from 'react';

function TradingViewWidget({ period }) {
  const container = useRef();
  const [chartLoaded, setChartLoaded] = useState(false);

  // Convert period to TradingView interval
  const getInterval = () => {
    switch (period) {
      case '1D': return '60';  // 60 minutes
      case '1W': return '240'; // 4 hours
      case '1M': return 'D';   // 1 day
      case '3M': return 'D';   // 1 day
      case '1Y': return 'W';   // 1 week
      default: return '60';    // default to 60 minutes
    }
  };

  // Convert period to TradingView range
  const getRange = () => {
    switch (period) {
      case '1D': return '1D';
      case '1W': return '1W'; 
      case '1M': return '1M';
      case '3M': return '3M';
      case '1Y': return '12M';
      default: return '1D';
    }
  };

  useEffect(() => {
    if (container.current && !chartLoaded) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        if (window.TradingView) {
          setChartLoaded(true);
          createWidget();
        }
      };
      container.current.appendChild(script);
    } else if (container.current && chartLoaded && window.TradingView) {
      // If chart is already loaded but period changed, recreate the widget
      createWidget();
    }

    function createWidget() {
      if (container.current.querySelector('iframe')) {
        container.current.innerHTML = '';
      }

      new window.TradingView.widget({
        autosize: true,
        symbol: "COINBASE:BTCUSD",
        interval: getInterval(),
        range: getRange(),
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        enable_publishing: false,
        hide_top_toolbar: true,
        hide_legend: false,
        save_image: false,
        container_id: container.current.id,
        hide_volume: true,
        backgroundColor: "rgba(15, 23, 42, 0.2)",
        gridColor: "rgba(255, 255, 255, 0.06)",
        allow_symbol_change: false
      });
    }

    return () => {
      // Clean up if component unmounts
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [chartLoaded, period]);

  return (
    <div 
      id="tradingview_widget_container" 
      ref={container} 
      style={{ 
        height: '100%', 
        width: '100%', 
        borderRadius: '12px',
        overflow: 'hidden'
      }}
    />
  );
}

export default TradingViewWidget; 