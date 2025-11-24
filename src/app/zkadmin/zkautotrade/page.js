// Start here
"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

// end here
import ZKautotrade from "./zkautotrade";

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

  return <ZKautotrade />;
};

export default Page;
