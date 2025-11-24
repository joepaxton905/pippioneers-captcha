"use client";
import k from "./zkadmin.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [active, setActive] = useState("manualtrade");

  const handleTransactions = () => {
    setActive("transactions");
    router.push("/zkadmin/zkmanualtrade");
  };

  const handleManualTrade = () => {
    setActive("manualtrade");
    router.push("/zkadmin/zkclients");
    // /zkadmin/zkprofile
  };

  const handleAutoTrade = () => {
    setActive("autotrade");
    router.push("/zkadmin/zkautotrade");
  };

  return (
    <div className={k.mHeader}>
      <div
        onClick={handleTransactions}
        style={{
          backgroundColor: active === "transactions" ? "green" : "#2c3782",
        }}
      >
        {" "}
        <p>Widr Req</p>
      </div>

      <div
        onClick={handleManualTrade}
        style={{
          backgroundColor: active === "manualtrade" ? "green" : "#2c3782",
        }}
      >
        {" "}
        <p>All clients</p>
      </div>

      {/* <div
        onClick={handleAutoTrade}
        style={{
          backgroundColor: active === "autotrade" ? "green" : "#2c3782",
        }}
      >
        {" "}
        <p>Auto</p>
      </div> */}
    </div>
  );
};

export default Header;
