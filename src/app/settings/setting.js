"use client";
import K from "./setting.module.css";
import { useRouter } from "next/navigation";
import { authUser } from "../actions/authUser";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { MDBIcon } from "mdb-react-ui-kit";

const Settings = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  const email = process.env.NEXT_PUBLIC_companyEmail;
  const mailtoLink = `mailto:${email}?subject=Help!&body=Hello,%20I%20would%20like%20to%20talk%20to%20you.`;

  const handleLogout = () => {
    Cookies.remove("logToken");
    router.push("/");
  };

  // Extract first letters for avatar
  const firstNameLetter = userData?.firstname || "U";
  const lastNameLetter = userData?.lastname || "U";
  const isVerified = userData?.id_verification === "Verified";

  // Settings menu sections
  const accountMenuItems = [
    {
      id: "profile",
      label: "Your Profile",
      icon: "user-circle",
      onClick: () => router.push("/profile"),
    },
    {
      id: "funds",
      label: "Add Funds",
      icon: "wallet",
      onClick: () => router.push("/addfunds"),
    },
    {
      id: "withdraw",
      label: "Withdraw Funds",
      icon: "money-bill-wave",
      onClick: () => router.push("/withdraw"),
    },
    {
      id: "history",
      label: "Transaction History",
      icon: "history",
      onClick: () => router.push("/history"),
    },
  ];

  const securityMenuItems = [
    {
      id: "changepass",
      label: "Change Password",
      icon: "lock",
      onClick: () => router.push("/lgpass"),
    },
    {
      id: "forgotpass",
      label: "Reset Password",
      icon: "key",
      onClick: () => router.push("/changepassword"),
    },
  ];

  const supportMenuItems = [
    {
      id: "support",
      label: "Contact Support",
      icon: "headset",
      href: mailtoLink,
    },
    {
      id: "logout",
      label: "Logout",
      icon: "sign-out-alt",
      onClick: handleLogout,
      className: K.logoutItem,
    },
  ];

  if (isLoading) {
    return (
      <div className={K.container}>
        <div className={K.loadingState}>Loading your settings...</div>
      </div>
    );
  }

  return (
    <div className={K.container}>
      <h1 className={K.pageTitle}>Account Settings</h1>

      <div className={K.settingsWrapper}>
        {/* Profile card section */}
        <div className={K.profileCard}>
          <div className={K.avatarWrapper}>
            <div className={K.avatar}>
              {firstNameLetter.charAt(0)}{lastNameLetter.charAt(0)}
            </div>
          </div>

          <div className={K.profileInfo}>
            {isVerified ? (
              <div className={`${K.badge} ${K.badgeVerified}`}>
                <MDBIcon fas icon="check-circle" />
                <span>Verified</span>
              </div>
            ) : (
              <div className={`${K.badge} ${K.badgeUnverified}`} onClick={() => router.push("/upload")} style={{cursor: "pointer"}}>
                <MDBIcon fas icon="exclamation-circle" />
                <span>Not Verified</span>
              </div>
            )}

            <h2 className={K.fullName}>
              {userData.firstname} {userData.lastname}
            </h2>
            <p className={K.email}>{userData.email}</p>
            {userData.phone && (
              <p className={K.phone}>{userData.phone}</p>
            )}
          </div>
        </div>

        {/* Menu items section */}
        <div>
          <div className={K.menuCard}>
            <h3 className={K.sectionTitle}>Account</h3>
            <ul className={K.menuList}>
              {accountMenuItems.map(renderMenuItem)}
            </ul>
          </div>

          <div className={K.menuCard} style={{marginTop: '24px'}}>
            <h3 className={K.sectionTitle}>Security</h3>
            <ul className={K.menuList}>
              {securityMenuItems.map(renderMenuItem)}
            </ul>
          </div>

          <div className={K.menuCard} style={{marginTop: '24px'}}>
            <h3 className={K.sectionTitle}>Support</h3>
            <ul className={K.menuList}>
              {supportMenuItems.map(renderMenuItem)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to render menu items
const renderMenuItem = (item) => (
  <li
    key={item.id}
    className={`${K.menuItem} ${item.className || ''}`}
    onClick={item.onClick}
  >
    <div className={K.menuItemContent}>
      <div className={K.menuIconWrapper}>
        <MDBIcon fas icon={item.icon} className={K.menuIcon} />
      </div>
      {item.href ? (
        <a href={item.href} style={{ color: 'inherit', textDecoration: 'none' }}>
          {item.label}
        </a>
      ) : (
        item.label
      )}
    </div>
    <MDBIcon fas icon="chevron-right" className={K.menuArrow} />
  </li>
);

export default Settings;
