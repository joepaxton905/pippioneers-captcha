"use client";
import { useRouter } from "next/navigation";
import VerifyAccount from "./verifyaccount";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    const tokenValue = Cookies.get(["logToken"]);
    if (!tokenValue) {
      router.push("/");
    }
  }, []);

  return <VerifyAccount />;
};

export default Page;
