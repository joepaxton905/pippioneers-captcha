"use client";
import styles from "./profile.module.css";
import { useRouter } from "next/navigation";
import { authUser } from "../actions/authUser";
import { useState, useEffect } from "react";
import { MDBIcon } from "mdb-react-ui-kit";

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [copied, setCopied] = useState({
    btc: false,
    eth: false,
    pamm: false
  });

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

  const initials = `${(userData?.firstname || 'U').charAt(0)}${(userData?.lastname || 'U').charAt(0)}`;
  const isVerified = userData?.id_verification === "Verified";

  const copyToClipboard = (text, type) => {
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      setCopied({ ...copied, [type]: true });
      setTimeout(() => {
        setCopied({ ...copied, [type]: false });
      }, 2000);
    });
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading your profile information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* <div className={styles.header}>
        <h1 className={styles.pageTitle}>My Profile</h1>
        <button
          className={styles.editButton}
          onClick={() => router.push("/settings")}
        >
          <MDBIcon fas icon="cog" className={styles.buttonIcon} />
          Manage Settings
        </button>
      </div> */}

      <div className={styles.profileGrid}>
        {/* Profile Summary Card */}
        <div className={styles.profileCard}>
          <div className={styles.profileBanner}></div>

          <div className={styles.profileContent}>
            <div className={styles.avatarContainer}>
              <div className={styles.avatar}>{initials}</div>
              {isVerified && (
                <div className={styles.verificationBadge}>
                  <MDBIcon fas icon="check" />
                </div>
              )}
            </div>

            <div className={styles.profileInfo}>
              <h2 className={styles.profileName}>
                {userData.firstname} {userData.lastname}
              </h2>
              <p className={styles.profileMeta}>{userData.email}</p>
              <p className={styles.profileMeta}>
                <MDBIcon fas icon="map-marker-alt" className={styles.metaIcon} />
                {userData.country || "Location not specified"}
              </p>

              {isVerified ? (
                <div className={styles.verifiedTag}>
                  <MDBIcon fas icon="shield-alt" className={styles.tagIcon} />
                  Verified Account
                </div>
              ) : (
                <button
                  className={styles.verifyButton}
                  onClick={() => router.push("/upload")}
                >
                  <MDBIcon fas icon="user-shield" className={styles.buttonIcon} />
                  Verify Account
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Data Overview Card */}
        <div className={styles.dataCard}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'personal' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <MDBIcon fas icon="user" className={styles.tabIcon} />
              Personal
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'wallets' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('wallets')}
            >
              <MDBIcon fas icon="wallet" className={styles.tabIcon} />
              Wallets
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'security' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <MDBIcon fas icon="lock" className={styles.tabIcon} />
              Security
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === 'personal' && (
              <div className={styles.personalInfo}>
                <h3 className={styles.sectionTitle}>
                  <MDBIcon fas icon="id-card" className={styles.sectionIcon} />
                  Personal Information
                </h3>

                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Full Name</div>
                    <div className={styles.infoValue}>
                      {userData.firstname} {userData.lastname}
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Email Address</div>
                    <div className={styles.infoValue}>{userData.email}</div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Phone Number</div>
                    <div className={styles.infoValue}>
                      {userData.phone || "Not provided"}
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Country</div>
                    <div className={styles.infoValue}>
                      {userData.country || "Not specified"}
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Member Since</div>
                    <div className={styles.infoValue}>
                      {userData.date || "Not available"}
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Account Status</div>
                    <div className={styles.infoValue}>
                      <span className={isVerified ? styles.statusVerified : styles.statusPending}>
                        {isVerified ? "Verified" : "Pending Verification"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'wallets' && (
              <div className={styles.walletsInfo}>
                <h3 className={styles.sectionTitle}>
                  <MDBIcon fas icon="wallet" className={styles.sectionIcon} />
                  Wallet Addresses
                </h3>

                <div className={styles.walletCard}>
                  <div className={styles.walletHeader}>
                    <MDBIcon fab icon="ethereum" className={styles.cryptoIcon} />
                    <h4 className={styles.walletTitle}>Ethereum Wallet</h4>
                  </div>

                  {userData.ETHaddress ? (
                    <div className={styles.walletAddressContainer}>
                      <p className={styles.walletAddress}>{userData.ETHaddress}</p>
                      <button
                        className={styles.copyAddressBtn}
                        onClick={() => copyToClipboard(userData.ETHaddress, "eth")}
                      >
                        <MDBIcon fas icon={copied.eth ? "check" : "copy"} />
                        {copied.eth ? "Copied" : "Copy"}
                      </button>
                    </div>
                  ) : (
                    <p className={styles.noWalletMessage}>No Ethereum wallet address added</p>
                  )}
                </div>

                <div className={styles.walletCard}>
                  <div className={styles.walletHeader}>
                    <MDBIcon fab icon="bitcoin" className={styles.cryptoIcon} />
                    <h4 className={styles.walletTitle}>Bitcoin Wallet</h4>
                  </div>

                  {userData.BTCaddress ? (
                    <div className={styles.walletAddressContainer}>
                      <p className={styles.walletAddress}>{userData.BTCaddress}</p>
                      <button
                        className={styles.copyAddressBtn}
                        onClick={() => copyToClipboard(userData.BTCaddress, "btc")}
                      >
                        <MDBIcon fas icon={copied.btc ? "check" : "copy"} />
                        {copied.btc ? "Copied" : "Copy"}
                      </button>
                    </div>
                  ) : (
                    <p className={styles.noWalletMessage}>No Bitcoin wallet address added</p>
                  )}
                </div>

                <div className={styles.walletCard}>
                  <div className={styles.walletHeader}>
                    <MDBIcon fas icon="key" className={styles.cryptoIcon} />
                    <h4 className={styles.walletTitle}>PAMM Code</h4>
                  </div>

                  <div className={styles.pammCodeContainer}>
                    <p className={styles.pammCode}>
                      {userData.pammCode || "QU8664U3BFJN"}
                    </p>
                    <button
                      className={styles.copyAddressBtn}
                      onClick={() => copyToClipboard(userData.pammCode || "QU8664U3BFJN", "pamm")}
                    >
                      <MDBIcon fas icon={copied.pamm ? "check" : "copy"} />
                      {copied.pamm ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className={styles.securityInfo}>
                <h3 className={styles.sectionTitle}>
                  <MDBIcon fas icon="shield-alt" className={styles.sectionIcon} />
                  Security Status
                </h3>

                <div className={styles.securityList}>
                  <div className={styles.securityItem}>
                    <div className={styles.securityStatus}>
                      <MDBIcon
                        fas
                        icon={isVerified ? "check-circle" : "times-circle"}
                        className={isVerified ? styles.statusIconSuccess : styles.statusIconDanger}
                      />
                      <div className={styles.securityText}>
                        <h4 className={styles.securityTitle}>Identity Verification</h4>
                        <p className={styles.securityDesc}>
                          {isVerified
                            ? "Your identity has been successfully verified"
                            : "Identity verification is required for full account access"
                          }
                        </p>
                      </div>
                    </div>

                    {!isVerified && (
                      <button
                        className={styles.securityActionBtn}
                        onClick={() => router.push("/upload")}
                      >
                        Verify Now
                      </button>
                    )}
                  </div>

                  <div className={styles.securityItem}>
                    <div className={styles.securityStatus}>
                      <MDBIcon
                        fas
                        icon="check-circle"
                        className={styles.statusIconSuccess}
                      />
                      <div className={styles.securityText}>
                        <h4 className={styles.securityTitle}>Email Verification</h4>
                        <p className={styles.securityDesc}>
                          Your email address has been verified
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.securityItem}>
                    <div className={styles.securityStatus}>
                      <MDBIcon
                        fas
                        icon={userData.phone ? "check-circle" : "times-circle"}
                        className={userData.phone ? styles.statusIconSuccess : styles.statusIconWarning}
                      />
                      <div className={styles.securityText}>
                        <h4 className={styles.securityTitle}>Phone Verification</h4>
                        <p className={styles.securityDesc}>
                          {userData.phone
                            ? "Your phone number has been verified"
                            : "Adding a phone number enhances account security"
                          }
                        </p>
                      </div>
                    </div>

                    {!userData.phone && (
                      <button
                        className={styles.securityActionBtn}
                        onClick={() => router.push("/settings")}
                      >
                        Add Phone
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
