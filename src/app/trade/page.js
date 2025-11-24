"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { authUser } from "../actions/authUser";
import TradingTools from "./tradecomp";
import TradingViewForexCrossRates from "./fxcross";

const Page = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM:SS
  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Format date as Day, Month Date, Year
  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  useEffect(() => {
    async function authenticateUser() {
      try {
        const tokenValue = Cookies.get("logToken");
        if (!tokenValue) {
          router.push("/");
          return;
        }

        const data = await authUser();
        if (!data || !data.userData) {
          console.error("Failed to fetch user data");
          router.push("/");
          return;
        }

        const { userData } = data;
        setUserData(userData);

        if (userData.suspendAccount === true) {
          router.push("/suspended");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Authentication error:", error);
        router.push("/");
      }
    }

    authenticateUser();
  }, [router]);

  const containerStyle = {
    minHeight: "220vh",
    // background: "linear-gradient(to bottom, #0f172a, #1a202c)",
    background: "#151b46",
    padding: "20px",
    color: "#e2e8f0"
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    marginBottom: "20px",
    // backgroundColor: "rgba(26, 32, 44, 0.7)",
    backgroundColor: "#151b46",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.05)"
  };

  const titleStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: "0.5px"
  };

  const badgeStyle = {
    marginLeft: "8px",
    padding: "2px 8px",
    backgroundColor: "#4fd1c5",
    color: "#1a202c",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "0.5px"
  };

  const timeStyle = {
    textAlign: "right",
    fontFamily: "monospace"
  };

  const clockStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#4fd1c5",
    marginBottom: "2px"
  };

  const dateUserStyle = {
    fontSize: "13px",
    color: "#a0aec0"
  };

  const loadingContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#151b46"
  };

  const loadingContentStyle = {
    textAlign: "center"
  };

  if (isLoading) {
    return (
      <div style={loadingContainerStyle}>
        <div style={loadingContentStyle}>
          <svg className="animate-spin" width="50" height="50" viewBox="0 0 24 24" style={{ color: "#4fd1c5", margin: "0 auto 16px" }}>
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
          <div style={{ color: "#a0aec0", fontSize: "16px", fontFamily: "monospace" }}>
            INITIALIZING TRADING TERMINAL
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <div style={titleStyle}>
          TRADING DASHBOARD
          <span style={badgeStyle}>PRO</span>
        </div>
        <div style={timeStyle}>
          <div style={clockStyle}>{formatTime()} GMT</div>
          <div style={dateUserStyle}>
            {formatDate()} | {userData.firstName || "Trader"} {userData.lastName || ""}
          </div>
        </div>
      </header>

      <main>
        <TradingViewForexCrossRates />
        <TradingTools />
      </main>
    </div>
  );
};

export default Page;
