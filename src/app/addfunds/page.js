"use client";
import AddFundsComp from "./addfundsComp";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import { authUser } from "../actions/authUser";
import styles from "./addfunds.module.css";

const AddFunds = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const tokenValue = Cookies.get(["logToken"]);
    if (!tokenValue) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
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

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.spinner}>
          <div className={styles.spinnerInner}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Fund Your Account</h1>
        <p className={styles.pageSubtitle}>Choose your preferred deposit method</p>
      </div>
      <AddFundsComp />
    </div>
  );
};

export default AddFunds;
