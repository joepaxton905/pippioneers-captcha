"use client";
import k from "../page.module.css";

import { MDBIcon } from "mdb-react-ui-kit";
import { useState } from "react";
import { useRouter } from "next/navigation";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  const router = useRouter();
  const [active, setActive] = useState("");
  const handleHome = () => {
    setActive("home");
    router.push("/");
  };
  const handleCards = () => {
    setActive("cards");
    router.push("/trade");
  };
  const handleHistory = () => {
    setActive("history");
    router.push("/history");
  };
  const handleChart = () => {
    setActive("chart");
    router.push("/chart");
  };
  const handleSettings = () => {
    setActive("settings");
    router.push("/settings");
  };

  return (
    <>
      <div className={k.footer}>
        <div
          className={k.box}
          onClick={handleHome}
          style={{
            color: active === "home" ? "#2c3782" : "black",
          }}
        >
          <MDBIcon fas icon="home" className={k.tt} />
          <p>Home</p>
        </div>
        <div
          className={k.box}
          onClick={handleChart}
          style={{
            color: active === "chart" ? "#2c3782" : "black",
          }}
        >
          <MDBIcon fas icon="chart-line" className={k.tt} />
          <p>Chart</p>
        </div>

        <div
          className={k.box}
          onClick={handleCards}
          style={{
            color: active === "cards" ? "#2c3782" : "black",
          }}
        >
          <MDBIcon fas icon="chart-area" className={k.tt} />
          <p>Trade</p>
        </div>

        <div
          className={k.box}
          onClick={handleHistory}
          style={{
            color: active === "history" ? "#2c3782" : "black",
          }}
        >
          <MDBIcon fas icon="history" className={k.tt} />
          <p>History</p>
        </div>

        <div
          className={k.box}
          onClick={handleSettings}
          style={{
            color: active === "settings" ? "#2c3782" : "black",
          }}
        >
          <MDBIcon fas icon="cog" className={k.tt} />
          <p>Settings</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
