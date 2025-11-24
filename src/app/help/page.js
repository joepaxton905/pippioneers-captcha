"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    const tokenValue = Cookies.get(["logToken"]);
    if (!tokenValue) {
      router.push("/");
    }
  }, []);

  return <div>help</div>;
};

export default Page;
