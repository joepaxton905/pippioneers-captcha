"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ManualTradeHistory from "./manualtrade";
import { authUser } from "@/app/actions/authUser";

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
    return <div>Loading...</div>;
  }

  return <ManualTradeHistory />;
};

export default Page;
