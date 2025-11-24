"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import Zkaprofile from "./zkprofile";
import Spinner from "@/app/overComp/spinner";

const Page = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const tokenValue = Cookies.get("bossToken");
    if (!tokenValue) {
      router.push("/zkadmin");
      } else {
        setIsAuthorized(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <Suspense fallback={<Spinner />}>
    <Zkaprofile />
    </Suspense>
  );
};

export default Page;
