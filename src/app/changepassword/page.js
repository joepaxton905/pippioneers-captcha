"use client";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import ChangePassword from "./changePassword";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Page = () => {
  // const router = useRouter();
  // useEffect(() => {
  //   const tokenValue = Cookies.get(["logToken"]);
  //   if (!tokenValue) {
  //     router.push("/");
  //   }
  // }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChangePassword />
    </Suspense>
  );
};

export default Page;
