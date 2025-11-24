"use client";
import { authUser } from "@/app/actions/authUser";
import { useEffect, useState } from "react";
import AutoTradeFD from "./autotrade";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import k from "../history.module.css";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const tokenValue = Cookies.get("logToken");
        if (!tokenValue) {
          router.push("/");
          return;
        }

        const data = await authUser();
        const { userData } = data;

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

  return <AutoTradeFD />;
};

export default Page;
