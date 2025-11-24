"use client";
import WithdrawComp from "./withdrawComp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { authUser } from "../actions/authUser";
import Head from "next/head";

const Page = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokenValue = Cookies.get(["logToken"]);
    if (!tokenValue) {
      router.push("/");
      return;
    }

    async function getUser() {
      try {
        setIsLoading(true);
        const data = await authUser();
        const { userData } = data;
        setUserData(userData);

        if (userData.suspendAccount === true) {
          router.push("/suspended");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getUser();
  }, [router]);

  return (
    <>
      <Head>
        <title>Withdraw Funds | PipPioneers</title>
        <meta name="description" content="Securely withdraw your funds using various payment methods" />
      </Head>
      <div className="page-container">
        <WithdrawComp />
      </div>
      <style jsx>{`
        .page-container {
          min-height: 100%;
          background: linear-gradient(180deg, #f7f9fc 0%, #ffffff 100%);
        }
      `}</style>
    </>
  );
};

export default Page;
