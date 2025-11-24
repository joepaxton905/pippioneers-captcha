"use client";
import { useRouter } from "next/navigation";
import Profile from "./profile";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { authUser } from "../actions/authUser";
import { useState } from "react";

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

  return <Profile />;
};

export default Page;
