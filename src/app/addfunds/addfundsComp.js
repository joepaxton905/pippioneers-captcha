"use client";
import React, { useState, useEffect } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import Card from "./card";
import { authUser } from "../actions/authUser";
import styles from "./addfunds.module.css";

export default function AddFundsComp() {
  const [isNcp, setIsNcp] = useState(false);

  useEffect(() => {
    async function checkNcp() {
      try {
        const response = await fetch('/api/non-crypto');
        const data = await response.json();
        // console.log("data",data);

        if (!data.isNcpversion) {
          // console.log("VVVVVVNNNN: ", data.isNcpversion);
          setIsNcp(data.isNcpversion)

          // router.push('/zkadmin/access-denied');
        } else {


          setIsNcp(data.isNcpversion)

        }
      } catch (error) {
        console.error('Error checking version:', error);
      } finally {
        // setLoading(false);
      }
    }

    checkNcp();
  }, []);







  const [userData, setUserData] = useState({});
  const [btcQR, setBtcQR] = useState();
  const [ethQR, setEthQR] = useState();
  const [usdtQr, setUsdtQr] = useState();
  const [activeMethod, setActiveMethod] = useState("bitcoin");
  const [copied, setCopied] = useState({
    btc: false,
    eth: false,
    usdt: false
  });
  const [isLoading, setIsLoading] = useState(true);

  // Update activeMethod if isNcp is true and current activeMethod is 'card' or 'bank'
  useEffect(() => {
    if (isNcp && (activeMethod === 'card' || activeMethod === 'bank')) {
      setActiveMethod('bitcoin');
    }
  }, [isNcp, activeMethod]);

  useEffect(() => {
    async function getUser() {
      try {
        setIsLoading(true);
        const data = await authUser();
        const { userData, qrCode, ethqrCode, usdtqrCode } = data;
        setEthQR(ethqrCode);
        setUserData(userData);
        setBtcQR(qrCode);
        setUsdtQr(usdtqrCode);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getUser();
  }, []);

  const copyToClipboard = (text, type) => {
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      setCopied({ ...copied, [type]: true });
      setTimeout(() => {
        setCopied({ ...copied, [type]: false });
      }, 2000);
    });
  };

  const handleMethodChange = (method) => {
    setActiveMethod(method);
  };

  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <div className={styles.spinnerInner}></div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.paymentMethods}>
        {/* Bitcoin Payment Method */}
        <div
          className={`${styles.methodCard} ${activeMethod === 'bitcoin' ? styles.methodActive : ''}`}
          onClick={() => handleMethodChange('bitcoin')}
        >
          <div className={styles.methodHeader}>
            <h3 className={styles.methodTitle}>
              <MDBIcon fab icon="bitcoin" className={styles.methodIcon} />
              Bitcoin
            </h3>
            <MDBIcon fas icon={activeMethod === 'bitcoin' ? "check-circle" : "arrow-right"} />
          </div>

          {activeMethod === 'bitcoin' && (
            <div className={styles.methodContent}>
              <div className={styles.qrContainer}>
                <img
                  src={btcQR}
                  alt="Bitcoin QR Code"
                  className={styles.qrImage}
                />
              </div>

              <div className={styles.addressContainer}>
                <div className={styles.addressLabel}>Bitcoin Address</div>
                <div className={styles.addressValue}>
                  <span>{userData.BTCaddress}</span>
                  <button
                    className={styles.copyButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(userData.BTCaddress, "btc");
                    }}
                  >
                    <MDBIcon fas icon={copied.btc ? "check" : "copy"} />
                    {copied.btc ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ethereum Payment Method */}
        <div
          className={`${styles.methodCard} ${activeMethod === 'ethereum' ? styles.methodActive : ''}`}
          onClick={() => handleMethodChange('ethereum')}
        >
          <div className={styles.methodHeader}>
            <h3 className={styles.methodTitle}>
              <MDBIcon fab icon="ethereum" className={styles.methodIcon} />
              Ethereum
            </h3>
            <MDBIcon fas icon={activeMethod === 'ethereum' ? "check-circle" : "arrow-right"} />
          </div>

          {activeMethod === 'ethereum' && (
            <div className={styles.methodContent}>
              <div className={styles.qrContainer}>
                <img
                  src={ethQR}
                  alt="Ethereum QR Code"
                  className={styles.qrImage}
                />
              </div>

              <div className={styles.addressContainer}>
                <div className={styles.addressLabel}>Ethereum Address</div>
                <div className={styles.addressValue}>
                  <span>{userData.ETHaddress}</span>
                  <button
                    className={styles.copyButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(userData.ETHaddress, "eth");
                    }}
                  >
                    <MDBIcon fas icon={copied.eth ? "check" : "copy"} />
                    {copied.eth ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* USDT Payment Method */}
        {userData.usdtAddress && userData.usdtAddress !== "null" && (
          <div
            className={`${styles.methodCard} ${activeMethod === 'usdt' ? styles.methodActive : ''}`}
            onClick={() => handleMethodChange('usdt')}
          >
            <div className={styles.methodHeader}>
              <h3 className={styles.methodTitle}>
                <MDBIcon fas icon="dollar-sign" className={styles.methodIcon} />
                USDT (TRC20)
              </h3>
              <MDBIcon fas icon={activeMethod === 'usdt' ? "check-circle" : "arrow-right"} />
            </div>

            {activeMethod === 'usdt' && (
              <div className={styles.methodContent}>
                <div className={styles.qrContainer}>
                  <img
                    src={usdtQr}
                    alt="USDT QR Code"
                    className={styles.qrImage}
                  />
                </div>

                <div className={styles.addressContainer}>
                  <div className={styles.addressLabel}>USDT TRC20 Address</div>
                  <div className={styles.addressValue}>
                    <span>{userData.usdtAddress}</span>
                    <button
                      className={styles.copyButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(userData.usdtAddress, "usdt");
                      }}
                    >
                      <MDBIcon fas icon={copied.usdt ? "check" : "copy"} />
                      {copied.usdt ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Credit Card Payment Method - Only show if isNcp is false */}
        {!isNcp && (
          <div
            className={`${styles.methodCard} ${activeMethod === 'card' ? styles.methodActive : ''}`}
            onClick={() => handleMethodChange('card')}
          >
            <div className={styles.methodHeader}>
              <h3 className={styles.methodTitle}>
                <MDBIcon fas icon="credit-card" className={styles.methodIcon} />
                Credit Card
              </h3>
              <MDBIcon fas icon={activeMethod === 'card' ? "check-circle" : "arrow-right"} />
            </div>

            {activeMethod === 'card' && (
              <div className={styles.methodContent}>
                <div className={styles.cardIcons}>
                  <MDBIcon fab icon="cc-visa" className={styles.cardIcon} />
                  <MDBIcon fab icon="cc-mastercard" className={styles.cardIcon} />
                  <MDBIcon fab icon="cc-amex" className={styles.cardIcon} />
                </div>
                <p className={styles.infoText}>
                  Deposit funds instantly using your credit or debit card. Your card details are securely processed.
                </p>
                <Card />
              </div>
            )}
          </div>
        )}

        {/* Bank Transfer Payment Method - Only show if isNcp is false */}
        {!isNcp && (
          <div
            className={`${styles.methodCard} ${activeMethod === 'bank' ? styles.methodActive : ''}`}
            onClick={() => handleMethodChange('bank')}
          >
            <div className={styles.methodHeader}>
              <h3 className={styles.methodTitle}>
                <MDBIcon fas icon="university" className={styles.methodIcon} />
                Bank Transfer
              </h3>
              <MDBIcon fas icon={activeMethod === 'bank' ? "check-circle" : "arrow-right"} />
            </div>

            {activeMethod === 'bank' && (
              <div className={styles.methodContent}>
                <MDBIcon fas icon="info-circle" className={styles.infoIcon} />
                <p className={styles.infoText}>
                  For bank transfers, please contact our support team at{" "}
                  <strong>{process.env.NEXT_PUBLIC_companyEmail}</strong> for detailed instructions.
                </p>
                <p className={styles.infoText}>
                  Our team will guide you through the process and provide the necessary banking details.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
