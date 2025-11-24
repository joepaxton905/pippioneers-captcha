"use client";

import { useEffect, useState } from "react";

const AddToHomeScreen = () => {
  const [prompt, setPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(true);

  useEffect(() => {
    // Capture the install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setPrompt(e);
      setIsInstalled(false);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setPrompt(null);
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Listen for the appinstalled event
    window.addEventListener("appinstalled", handleAppInstalled);

    // Check if the app is installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    } else {
      setIsInstalled(false);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = () => {
    if (prompt) {
      prompt.prompt();
      prompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
          setIsInstalled(true);
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        setPrompt(null);
      });
    }
  };

  // If the app is installed, do not show the install prompt
  if (isInstalled) {
    return null;
  }

  return (
    <div style={styles.promptContainer}>
      <p>Install this app for a better experience.</p>
      <button onClick={handleInstallClick} style={styles.installButton}>
        Install
      </button>
    </div>
  );
};

const styles = {
  promptContainer: {
    position: "fixed",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#fff",
    padding: "10px 20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    zIndex: 1000,
  },
  installButton: {
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AddToHomeScreen;
