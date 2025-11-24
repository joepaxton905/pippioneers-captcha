"use client";

// import { Inter } from "next/font/google";
import Header from "./header";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }) => {
  const pathname = usePathname();

  if (pathname === "/zkadmin") {
    return (
      <html lang="en">

        <body >{children}</body>
      </html>
    );
  }



  return (
    <div style={{ overflow: "auto", height: "250vh" }}>
      <Header />
      <div >{children}</div>
    </div>
  );
};

export default Layout;
