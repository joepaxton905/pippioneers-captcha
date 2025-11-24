"use client";
// import Zkcleints from "./zkcleints";
import { useEffect, useState } from "react";
import { getClients } from "../action/getCl";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import ZkclientiD from "./zkclientiD";

const Page = () => {
  // start here
  const router = useRouter();
  useEffect(() => {
    const tokenValue = Cookies.get(["bossToken"]);
    if (!tokenValue) {
      router.push("/zkadmin");
    }
  }, []);
  // end here

  return <ZkclientiD />;
};

export default Page;
