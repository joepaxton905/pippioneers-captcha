"use client";
import { useRouter } from "next/navigation";
import { authUser } from "@/app/actions/authUser";
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import styles from "./topsection.module.css";

const Topsection = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationPosition, setNotificationPosition] = useState({ top: 0, right: 0 });
  const notificationRef = useRef(null);
  const bellButtonRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Add meta tag for theme-color to match status bar with header
    let metaTag = document.querySelector('meta[name="theme-color"]');

    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'theme-color';
      document.head.appendChild(metaTag);
    }

    metaTag.content = '#151b46';

    async function getUser() {
      try {
        setIsLoading(true);
        const data = await authUser();
        const { userData } = data;
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getUser();

    // Close notification panel when clicking outside
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        bellButtonRef.current &&
        !bellButtonRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    // Handle scroll events
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goBack = () => {
    window.history.back();
  };

  const goToProfile = () => {
    router.push("/profile");
  };

  const toggleNotifications = (e) => {
    e.stopPropagation();

    if (bellButtonRef.current) {
      const rect = bellButtonRef.current.getBoundingClientRect();
      setNotificationPosition({
        top: rect.bottom + window.scrollY,
        right: window.innerWidth - rect.right
      });
    }

    setShowNotifications(!showNotifications);
  };

  // Get first letter of first name for avatar
  const userInitial = userData.firstname ? userData.firstname.charAt(0).toUpperCase() : "U";

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <>
      <Head>
        <meta name="theme-color" content="#151b46" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      <div className={styles.headerContainer}>
        <div className={styles.statusBar}></div>
        <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
          <div className={styles.headerGlow}></div>
          <div className={styles.headerPattern}></div>

          <div className={styles.leftSection}>
            <button className={styles.backButton} onClick={goBack} aria-label="Go back">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>

            <div className={styles.logoContainer}>
              <h1 className={styles.logoMain}>
                {process.env.NEXT_PUBLIC_CompanyNameAbv}
                <span className={styles.logoAccent}>
                {process.env.NEXT_PUBLIC_CompanyNameAbSec}
                </span>
              </h1>
            </div>
          </div>

          <div className={styles.rightSection}>
            {isLoading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.skeletonCircle}></div>
                <div className={styles.skeletonText}></div>
              </div>
            ) : (
              <div className={styles.userBadge} onClick={goToProfile}>
                <div className={styles.userAvatar}>
                  {userInitial}
                  <div className={styles.userAvatarGlow}></div>
                </div>
                <div className={styles.userInfo}>
                  <p className={styles.greeting}>{getGreeting()}</p>
                  <p className={styles.userName}>
                    {userData.firstname}
                    <span className={styles.verifiedBadge} title="Verified account">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                    </span>
                  </p>
                </div>
              </div>
            )}

            <button
              className={styles.notificationButton}
              onClick={toggleNotifications}
              ref={bellButtonRef}
              aria-label="Notifications"
              aria-expanded={showNotifications}
            >
              <div className={styles.notificationDot}></div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
          </div>
        </header>
      </div>

      {/* Notification panel */}
      {showNotifications && (
        <div
          ref={notificationRef}
          className={styles.notificationPanel}
          style={{
            top: `${notificationPosition.top}px`,
            right: `${notificationPosition.right}px`,
          }}
        >
          <div className={styles.notificationHeader}>
            <h3 className={styles.notificationTitle}>Notifications</h3>
            <button className={styles.notificationSettingsButton} aria-label="Notification settings">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
          </div>

          <div className={styles.notificationBody}>
            <div className={styles.emptyNotifications}>
              <div className={styles.emptyNotificationIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </div>
              <h4 className={styles.emptyTitle}>No new notifications</h4>
              <p className={styles.emptyText}>
                We'll notify you when something important happens in your account
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Topsection;
