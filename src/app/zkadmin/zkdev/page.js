"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import ZKDev from "./zkdev";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    const tokenValue = Cookies.get(["bossToken"]);
    if (!tokenValue) {
      router.push("/zkadmin");
    }
  }, []);

  return <ZKDev />;
};

export default Page;