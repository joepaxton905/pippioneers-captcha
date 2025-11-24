"use client";
import { useRouter } from "next/navigation";
import Chart from "./TradingViewWidget";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import { authUser } from "../actions/authUser";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    const tokenValue = Cookies.get(["logToken"]);
    if (!tokenValue) {
      router.push("/");
    }
  }, []);

  // from here
  const [userData, setUserData] = useState({});
  useEffect(() => {
    async function getUser() {
      try {
        const data = await authUser();
        const { userData } = data;
        setUserData(userData);
        console.log(userData.suspendAccount);
        if (userData.suspendAccount === true) {
          router.push("/suspended");
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);
  // end here

  return (
    <div>
      <Chart />
    </div>
  );
};

export default Page;
