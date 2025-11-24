"use client";

import { MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import k from "./trade.module.css";
import { placeOrder } from "../actions/placeOrder";
import { useRouter } from "next/navigation";

const TradingTools = () => {
  const router = useRouter();
  const [defult, Setdefult] = useState(50);
  const [price, setPrice] = useState();
  const [stopLoss, setstopLoss] = useState();
  const [takeProfit, settakeProfit] = useState();
  const [Execution, setExecution] = useState("Buy");
  const [CurrencyP, setCurrencyP] = useState("EURUSD");
  const [Expiration, setExpiration] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const lotSizeMinusZOne = () => {
    const newDefault = defult - 100;
    Setdefult(newDefault);
    if (newDefault <= 0) {
      Setdefult(50);
    }
  };

  const lotSizeMinusZOnem1K = () => {
    const newDefault = defult - 1000;
    Setdefult(newDefault);
    if (newDefault <= 0) {
      Setdefult(50);
    }
  };

  const lotSizeplusZOne = () => {
    const newDefault = defult + 100;
    Setdefult(newDefault);
    if (newDefault <= 0) {
      Setdefult(100);
    }
  };

  const lotSizeplusZOne1K = () => {
    const newDefault = defult + 1000;
    Setdefult(newDefault);
    if (newDefault <= 0) {
      Setdefult(100);
    }
  };

  const lotSizeMinusZZOne = () => {
    const newDefault = defult - 50;
    Setdefult(newDefault);
    if (newDefault <= 50) {
      Setdefult(50);
    }
  };

  const lotSizePlusZZOne = () => {
    const newDefault = defult + 50;
    Setdefult(newDefault);
    if (newDefault <= 0) {
      Setdefult(50);
    }
  };

  const [input, setInput] = useState();
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const overDfult = defult.toFixed(2);

  const [notAnum, setnotAnum] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const data = {
      lotSize: overDfult,
      CurrencyPair: CurrencyP,
      execution: Execution,
      price: price,
      stopLoss: stopLoss,
      takeProfit: pnl.profit,
      expiration: Expiration,
    };

    try {
    const response = await placeOrder(data);
    console.log(response.status);

    if (response.status === "ok") {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: response.message,
      }).then(() => {
        window.location.reload();
      });
    }
    if (response.status === "error") {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: response.message,
      });
    }
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get estimated PnL based on current values
  const getEstimatedPnL = () => {
    if (!takeProfit || !stopLoss) return null;

    try {
      const tpValue = parseFloat(takeProfit);
      const slValue = parseFloat(stopLoss);
      const lotValue = parseFloat(overDfult);

      if (isNaN(tpValue) || isNaN(slValue) || isNaN(lotValue)) return null;

      const estimatedProfit = tpValue * lotValue * 0.1;
      const estimatedLoss = slValue * lotValue * 0.1;

      return {
        profit: estimatedProfit.toFixed(2),
        loss: estimatedLoss.toFixed(2)
      };
    } catch (e) {
      return null;
    }
  }

  const pnl = getEstimatedPnL();

  const buttonStyle = {
    width: "100%",
    marginLeft: "0px",
    background: Execution === "Buy" ? "linear-gradient(45deg, #00964e, #00c076)" : "linear-gradient(45deg, #d32f2f, #f44336)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    border: "none",
    borderRadius: "4px",
    padding: "12px",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
    marginBottom: "80px"
  };

  const lotButtonStyle = (type) => ({
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    backgroundColor: type === "decrease" ? "rgba(244, 67, 54, 0.1)" : "rgba(33, 150, 243, 0.1)",
    color: type === "decrease" ? "#f44336" : "#2196f3",
    border: type === "decrease" ? "1px solid rgba(244, 67, 54, 0.3)" : "1px solid rgba(33, 150, 243, 0.3)",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.08)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "60px",
    userSelect: "none"
  });

  const currentAmountStyle = {
    padding: "10px 16px",
    borderRadius: "4px",
    fontSize: "18px",
    fontWeight: "700",
    fontFamily: "monospace",
    color: "#fff",
    backgroundColor: Execution === "Buy" ? "rgba(0, 150, 136, 0.15)" : "rgba(233, 30, 99, 0.15)",
    border: Execution === "Buy" ? "1px solid rgba(0, 150, 136, 0.4)" : "1px solid rgba(233, 30, 99, 0.4)",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)"
  };

  const containerStyle = {
    // background: "linear-gradient(135deg, #293140, #1a202c)",

    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    maxWidth: "800px",
    margin: "20px auto",
    border: "1px solid rgba(255, 255, 255, 0.05)"
  };

  const formGroupStyle = {
    marginBottom: "16px",
    position: "relative",
    // backgroundColor: "rgba(26, 32, 44, 0.8)",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.05)"
  };

  const formLabelStyle = {
    color: "#a0aec0",
    fontSize: "12px",
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: "0.8px",
    marginBottom: "6px"
  };

  const formInputStyle = {
    backgroundColor: "#151b46",
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "4px",
    padding: "10px 14px",
    width: "100%",
    outline: "none",
    transition: "all 0.3s ease"
  };

  const formSelectStyle = {
    ...formInputStyle,
    appearance: "none",
    backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    backgroundSize: "16px",
    paddingRight: "30px"
  };

  const cardTitleStyle = {
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "700",
    margin: "0 0 24px 0",
    borderBottom: "2px solid rgba(66, 153, 225, 0.3)",
    paddingBottom: "12px",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"
  };

  const summaryBoxStyle = {
    marginTop: "20px",
    padding: "16px",
    backgroundColor: "#151b46",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.08)"
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    padding: "8px 0",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
  };

  const labelStyle = {
    color: "#a0aec0",
    fontSize: "13px"
  };

  const valueStyle = {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "monospace"
  };

  return (
    <>
      <div style={containerStyle}>
        <h2 style={cardTitleStyle}>
          {Execution === "Buy" ? "📈 Buy Position" : "📉 Sell Position"}
        </h2>

          <form onSubmit={handleSubmit}>
          {/* Lot Size Control */}
          <div style={formGroupStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <p style={formLabelStyle}>Lot Size / Trading Volume</p>
              <span style={currentAmountStyle}>${overDfult}</span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "space-between" }}>
              <span style={lotButtonStyle("decrease")} onClick={lotSizeMinusZOnem1K}>-1000</span>
              <span style={lotButtonStyle("decrease")} onClick={lotSizeMinusZOne}>-100</span>
              <span style={lotButtonStyle("decrease")} onClick={lotSizeMinusZZOne}>-50</span>
              <span style={lotButtonStyle("increase")} onClick={lotSizePlusZZOne}>+50</span>
              <span style={lotButtonStyle("increase")} onClick={lotSizeplusZOne}>+100</span>
              <span style={lotButtonStyle("increase")} onClick={lotSizeplusZOne1K}>+1000</span>
            </div>
          </div>

          {/* Currency Pair */}
          <div style={formGroupStyle}>
            <p style={formLabelStyle}>Currency Pair</p>
                <select
              style={formSelectStyle}
                  value={CurrencyP}
                  onChange={(e) => setCurrencyP(e.target.value)}
                >
              {/* Forex Pairs */}
              <optgroup label="Forex Pairs">
                <option value="EURUSD">EUR/USD</option>
                <option value="GBPUSD">GBP/USD</option>
                <option value="USDJPY">USD/JPY</option>
                <option value="USDCAD">USD/CAD</option>
                <option value="USDCHF">USD/CHF</option>
                <option value="NZDUSD">NZD/USD</option>
                <option value="AUDUSD">AUD/USD</option>
                <option value="AUDNZD">AUD/NZD</option>
                <option value="AUDCAD">AUD/CAD</option>
                <option value="EURJPY">EUR/JPY</option>
                <option value="GBPJPY">GBP/JPY</option>
                <option value="EURGBP">EUR/GBP</option>
                <option value="CADJPY">CAD/JPY</option>
                <option value="EURAUD">EUR/AUD</option>
                <option value="EURCAD">EUR/CAD</option>
              </optgroup>

              {/* Cryptocurrencies */}
              <optgroup label="Cryptocurrencies">
                <option value="BTCUSD">BTC/USD (Bitcoin)</option>
                <option value="ETHUSD">ETH/USD (Ethereum)</option>
                <option value="XRPUSD">XRP/USD (Ripple)</option>
                <option value="LTCUSD">LTC/USD (Litecoin)</option>
                <option value="DOTUSD">DOT/USD (Polkadot)</option>
                <option value="ADAUSD">ADA/USD (Cardano)</option>
                <option value="SOLUSD">SOL/USD (Solana)</option>
                <option value="DOGEUSD">DOGE/USD (Dogecoin)</option>
                <option value="AVAXUSD">AVAX/USD (Avalanche)</option>
              </optgroup>

              {/* Stocks */}
              <optgroup label="Stocks">
                <option value="AAPL">Apple Inc.</option>
                <option value="MSFT">Microsoft Corp.</option>
                <option value="AMZN">Amazon.com Inc.</option>
                <option value="GOOGL">Alphabet Inc.</option>
                <option value="META">Meta Platforms Inc.</option>
                <option value="TSLA">Tesla Inc.</option>
                <option value="NVDA">NVIDIA Corp.</option>
                <option value="JPM">JPMorgan Chase & Co.</option>
                <option value="V">Visa Inc.</option>
                <option value="WMT">Walmart Inc.</option>
              </optgroup>

              {/* Commodities */}
              <optgroup label="Commodities">
                <option value="XAUUSD">XAU/USD (Gold)</option>
                <option value="XAGUSD">XAG/USD (Silver)</option>
                <option value="WTIUSD">WTI/USD (Crude Oil)</option>
                <option value="BRENTUSD">BRENT/USD (Brent Crude)</option>
                <option value="NATGASUSD">NATGAS/USD (Natural Gas)</option>
                <option value="CORNUSD">CORN/USD (Corn)</option>
                <option value="WHEATUSD">WHEAT/USD (Wheat)</option>
              </optgroup>

              {/* Indices */}
              <optgroup label="Indices">
                <option value="US30">US30 (Dow Jones)</option>
                <option value="SPX500">SPX500 (S&P 500)</option>
                <option value="NAS100">NAS100 (Nasdaq)</option>
                <option value="UK100">UK100 (FTSE 100)</option>
                <option value="GER40">GER40 (DAX)</option>
                <option value="JPN225">JPN225 (Nikkei 225)</option>
                <option value="AUS200">AUS200 (ASX 200)</option>
              </optgroup>
                </select>
            </div>

          {/* Trade Direction */}
          <div style={formGroupStyle}>
            <p style={formLabelStyle}>Direction</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setExecution("Buy")}
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: Execution === "Buy" ? "rgba(0, 150, 136, 0.3)" : "rgba(26, 32, 44, 0.5)",
                  color: Execution === "Buy" ? "#ffffff" : "#a0aec0",
                  fontWeight: Execution === "Buy" ? "bold" : "normal",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                BUY
              </button>
              <button
                type="button"
                onClick={() => setExecution("Sell")}
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: Execution === "Sell" ? "rgba(233, 30, 99, 0.3)" : "rgba(26, 32, 44, 0.5)",
                  color: Execution === "Sell" ? "#ffffff" : "#a0aec0",
                  fontWeight: Execution === "Sell" ? "bold" : "normal",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                SELL
              </button>
                <select
                style={{
                  ...formSelectStyle,
                  width: "auto",
                  minWidth: "120px",
                }}
                  value={Execution}
                  onChange={(e) => setExecution(e.target.value)}
                >
                <option value="Buy">Market</option>
                  <option value="Buy Limit">Buy Limit</option>
                  <option value="Sell Limit">Sell Limit</option>
                  <option value="Buy Stop">Buy Stop</option>
                  <option value="Sell Stop">Sell Stop</option>
                </select>
              </div>
            </div>

          {/* Price */}
          <div style={formGroupStyle}>
            <p style={formLabelStyle}>Entry Price</p>
              <input
              style={formInputStyle}
              placeholder="Market price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

          {/* Stop Loss */}
          <div style={formGroupStyle}>
            <p style={formLabelStyle}>Stop Loss</p>
              <input
              style={formInputStyle}
              placeholder="Optional"
                onChange={(e) => setstopLoss(e.target.value)}
              />
            </div>

          {/* Take Profit */}
          <div style={formGroupStyle}>
            <p style={formLabelStyle}>Take Profit</p>
              <input
              style={formInputStyle}
              placeholder="Optional"
                onChange={(e) => settakeProfit(e.target.value)}
              />
            </div>

          {/* Expiration */}
          {/* <div style={formGroupStyle}>
            <p style={formLabelStyle}>Expiration</p>
              <input
              type="datetime-local"
              style={formInputStyle}
                onChange={(e) => setExpiration(e.target.value)}
              />
            </div> */}

          {/* Trade Summary */}
          {pnl && (
            <div style={summaryBoxStyle}>
              <p style={{ ...formLabelStyle, marginBottom: "12px", color: "#e2e8f0" }}>TRADE SUMMARY</p>

              <div style={rowStyle}>
                <span style={labelStyle}>Order Type:</span>
                <span style={{ ...valueStyle, color: Execution === "Buy" ? "#4fd1c5" : "#f56565" }}>{Execution.toUpperCase()}</span>
              </div>

              <div style={rowStyle}>
                <span style={labelStyle}>Symbol:</span>
                <span style={valueStyle}>{CurrencyP}</span>
              </div>

              <div style={rowStyle}>
                <span style={labelStyle}>Lot Size:</span>
                <span style={valueStyle}>${overDfult}</span>
              </div>

              <div style={rowStyle}>
                <span style={labelStyle}>Potential Profit:</span>
                <span style={{ ...valueStyle, color: "#4fd1c5" }}>${pnl.profit}</span>
              </div>

              <div style={{ ...rowStyle, borderBottom: "none" }}>
                <span style={labelStyle}>Potential Loss:</span>
                <span style={{ ...valueStyle, color: "#f56565" }}>${overDfult}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            style={buttonStyle}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : `${Execution} ${CurrencyP}`}
          </button>
          </form>
      </div>
    </>
  );
};

export default TradingTools;
