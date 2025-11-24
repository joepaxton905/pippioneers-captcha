"use client";
import { useRouter } from "next/navigation";
import ManualTradeHistory from "./manualtradehistory";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { authUser } from "../actions/authUser";
import k from "./history.module.css";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        // Check if user is logged in
        const tokenValue = Cookies.get("logToken");
        if (!tokenValue) {
          router.push("/");
          return;
        }

        // Check account status
        const data = await authUser();
        const { userData } = data;
        setUserData(userData);

        if (userData?.suspendAccount === true) {
          router.push("/suspended");
          return;
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className={k.loadingContainer}>
        <div className={k.loadingSpinner}></div>
        <span>Loading...</span>
      </div>
    );
  }

  return <ManualTradeHistory />;
};

export default Page;
