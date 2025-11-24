"use client";

import { useState, useEffect } from "react";
import AddToHomeScreen from "./AddToHomeScreenPrompt";

const BlockAccessIfNotInstalled = ({ children }) => {
  const [isInstalled, setIsInstalled] = useState(true);

  useEffect(() => {
    if (!window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(false);
    }
  }, []);

  if (!isInstalled) {
    return <AddToHomeScreen />;
  }

  return children;
};

export default BlockAccessIfNotInstalled;
