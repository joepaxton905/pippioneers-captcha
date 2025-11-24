"use client";
import k from "./history.module.css";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState("");

  useEffect(() => {
    // Extract the last part of the pathname
    const path = pathname.split("/").pop();
    if (path) {
      setActive(path);
    } else {
      setActive("autotrade"); // Default tab
    }
  }, [pathname]);

  const handleNavigation = (route) => {
    setActive(route);
    router.push(`/history/${route}`);
  };

  return (
    <div className={k.mHeader}>
      <div
        className={`${k.navButton} ${active === "transactions" ? k.navButtonActive : k.navButtonInactive}`}
        onClick={() => handleNavigation("transactions")}
      >
        Transactions
      </div>

      <div
        className={`${k.navButton} ${active === "autotrade" ? k.navButtonActive : k.navButtonInactive}`}
        onClick={() => handleNavigation("autotrade")}
      >
        Auto Trade
      </div>

      <div
        className={`${k.navButton} ${active === "manualtrade" ? k.navButtonActive : k.navButtonInactive}`}
        onClick={() => handleNavigation("manualtrade")}
      >
        Manual Trade
      </div>
    </div>
  );
};

export default Header;
