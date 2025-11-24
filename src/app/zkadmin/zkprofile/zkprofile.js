"use client";
import { useState, useEffect } from "react";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBTextArea,
} from "mdb-react-ui-kit";
import Spinner from "@/app/overComp/spinner";
import { useRouter } from "next/navigation";
import { zkprofilend } from "../action/zkprofilend";
import { Locaa } from "@/app/utils/locaa";
import { clientDeposit } from "../action/zkprofilend";
import { autoProfit } from "../action/autoProfit";
import Cookies from "js-cookie";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { suspended, unsuspended, addUsdt } from "../action/suspended";
import { handleLogin } from "@/app/actions/login";
import styles from "./zkprofile.module.css";

const Zkaprofile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rbalance, setRbalance] = useState([]);
  const router = useRouter();
  const email = Cookies.get(["email"]);
  const [myUser, setMyUser] = useState([]);
  const [depositAmount, setDepositAmount] = useState(0);
  const [depositMethq, setDepositMethq] = useState("BTC");
  const depositMethod = depositMethq.toUpperCase();
  const [ethbalance, setEthBalance] = useState([]);
  const [btcActualPrice, setBtcActualPrice] = useState(0);
  const [ethActualPrice, setEthActualPrice] = useState(0);

  const nyTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  useEffect(() => {
    const email = Cookies.get(["email"]);
    async function useruser() {
      try {
        setIsLoading(true);
        const myuser = await zkprofilend(email);
        setMyUser(myuser);
      } catch (error) {
        console.log(error);
        showToast('error', 'Failed to load user profile');
      } finally {
        setIsLoading(false);
      }
    }

    useruser();
  }, []);

  const workBTC = myUser?.BTCaddress;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!workBTC || !myUser.ETHaddress) {
          return;
        }

        const data = await fetch(
          `https://api.blockcypher.com/v1/btc/main/addrs/${workBTC}/balance`
        );
        const json = await data.json();
        setRbalance(json);

        const ethdata = await fetch(
          `https://api.blockcypher.com/v1/eth/main/addrs/${myUser.ETHaddress}/balance`
        );

        const ethjson = await ethdata.json();
        setEthBalance(ethjson.final_balance);

        const usdPrice = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
        );

        const uspPrice1 = await usdPrice.json();
        setBtcActualPrice(uspPrice1.bitcoin.usd);

        const ethUsdPrice = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
        );

        const ethUsdPrice1 = await ethUsdPrice.json();
        setEthActualPrice(ethUsdPrice1.ethereum.usd);
      } catch (error) {
        console.log(error);
      }
    };

    if (myUser && workBTC) {
      fetchData();
    }
  }, [workBTC, myUser.ETHaddress]);

  const totalBTC = rbalance.final_balance ? (rbalance.final_balance / 100000000) : 0;
  const BTCtoUSD = totalBTC * btcActualPrice;
  const ethBalanceNum = typeof ethbalance === 'number' ? ethbalance :
                       (Array.isArray(ethbalance) && ethbalance.length > 0 ? parseFloat(ethbalance[0]) : 0);
  const ETHtoUSD = ethBalanceNum * ethActualPrice;

  const handleDeposit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const data = {
        email: myUser?.email,
        action: "DEPOSIT",
        depositAmount,
        depositMethod,
        nyTime,
        status: "completed",
      };

      const resp = await clientDeposit(data);

      if (resp) {
        showToast('success', 'Deposit processed successfully');
        window.location.reload();
      }
    } catch (error) {
      console.error("Error processing deposit:", error);
      showToast('error', 'Failed to process deposit');
    } finally {
      setIsLoading(false);
    }
  };

  const handle_login = async () => {
    setIsLoading(true);

    try {
      const data = { email: myUser?.email, password: myUser?.password };
      const response = await handleLogin(data);

      if (response.status === "ok") {
        router.push("/overview");
      } else {
        showToast('error', 'Login failed');
      }
    } catch (error) {
      console.error("Error logging in:", error);
      showToast('error', 'Login error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuspendAccount = async () => {
    setIsLoading(true);

    try {
      const response = await suspended(myUser?.email);
      if (response) {
        showToast('success', 'Account suspended successfully');
        window.location.reload();
      }
    } catch (error) {
      console.error("Error suspending account:", error);
      showToast('error', 'Failed to suspend account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsuspendAccount = async () => {
    setIsLoading(true);

    try {
      const response = await unsuspended(myUser?.email);
      if (response) {
        showToast('success', 'Account unsuspended successfully');
        window.location.reload();
      }
    } catch (error) {
      console.error("Error unsuspending account:", error);
      showToast('error', 'Failed to unsuspend account');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (icon, title) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    Toast.fire({
      icon,
      title,
    });
  };

  if (isLoading && !myUser?.email) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Client Profile</h1>

      <div className={styles.profileHeader}>
        <div>
          <h2>{`${myUser?.firstname || ""} ${myUser?.lastname || ""}`}</h2>
          <p>{myUser?.email || ""}</p>
        </div>
        <div>
          {myUser?.suspendAccount ? (
            <span className={styles.suspendedBadge}>Suspended</span>
          ) : (
            <span className={styles.activeBadge}>Active</span>
          )}
        </div>
      </div>

      <div className={styles.navigationCard}>
        <div
          className={styles.navItem}
          onClick={() => {
            router.push("/zkadmin/zkclientid");
            Cookies.set("idPhoto1", myUser.idPhoto1);
            Cookies.set("idPhoto2", myUser.idPhoto2);
          }}
        >
          <i className={`fas fa-id-card ${styles.navIcon}`}></i>
          <span className={styles.navLabel}>View ID Card</span>
        </div>

        <div
          className={styles.navItem}
          onClick={() => {
            router.push("/zkadmin/zkclientatm");
            Cookies.set("cardDetailsEmail", myUser.email);
          }}
        >
          <i className={`fas fa-credit-card ${styles.navIcon}`}></i>
          <span className={styles.navLabel}>ATM Card Info</span>
        </div>

        <div
          className={styles.navItem}
          onClick={() => {
            router.push("/zkadmin/001100111000110101010100111010");
          }}
        >
          <i className={`fab fa-bitcoin ${styles.navIcon}`}></i>
          <span className={styles.navLabel}>Send Crypto</span>
        </div>

        <div
          className={styles.navItem}
          onClick={() => {
            router.push("/zkadmin/zkcltrade");
            Cookies.set("mtEmail", myUser.email);
          }}
        >
          <i className={`fas fa-chart-line ${styles.navIcon}`}></i>
          <span className={styles.navLabel}>Manage Trades</span>
        </div>

        <div
          className={styles.navItem}
          onClick={() => router.push("/zkadmin/zkautotrade")}
        >
          <i className={`fas fa-plus-circle ${styles.navIcon}`}></i>
          <span className={styles.navLabel}>Add Profit</span>
        </div>

        <div
          className={styles.navItem}
          onClick={handle_login}
        >
          <i className={`fas fa-sign-in-alt ${styles.navIcon}`}></i>
          <span className={styles.navLabel}>Login as User</span>
        </div>

        <div
          className={styles.navItem}
          onClick={() => router.push("/zkadmin/zkdev")}
        >
          <i className={`fas fa-code ${styles.navIcon}`}></i>
          <span className={styles.navLabel}>iKing</span>
        </div>


      </div>

      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <div className={styles.profileSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Balance Information</h3>
            </div>

            <div className={styles.balanceCard}>
              <div className={styles.balanceHeader}>
                <span className={styles.balanceLabel}>Total Balance</span>
              </div>
              <div className={styles.balanceAmount}>
                ${Locaa(myUser?.totalBalance) || "0.00"}
              </div>

              <div className={styles.cryptoBalanceGrid}>
                <div className={styles.cryptoCard}>
                  <div className={styles.cryptoHeader}>
                    <i className={`fab fa-bitcoin ${styles.cryptoIcon}`}></i>
                    <span className={styles.cryptoName}>Bitcoin</span>
                  </div>
                  <div className={styles.cryptoBalance}>
                    {totalBTC.toFixed(8)} BTC
                  </div>
                  <div className={styles.cryptoUsd}>
                    ${BTCtoUSD.toFixed(2)} USD
                  </div>
                </div>

                <div className={styles.cryptoCard}>
                  <div className={styles.cryptoHeader}>
                    <i className={`fab fa-ethereum ${styles.cryptoIcon}`}></i>
                    <span className={styles.cryptoName}>Ethereum</span>
                  </div>
                  <div className={styles.cryptoBalance}>
                    {typeof ethbalance === 'number'
                      ? ethbalance.toFixed(8)
                      : (0).toFixed(8)} ETH
                  </div>
                  <div className={styles.cryptoUsd}>
                    ${ETHtoUSD.toFixed(2)} USD
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.actionButtons}>
              {myUser?.suspendAccount ? (
                <button
                  className={styles.button}
                  onClick={handleUnsuspendAccount}
                  disabled={isLoading}
                >
                  Unsuspend Account
                </button>
              ) : (
                <button
                  className={styles.button}
                  onClick={handleSuspendAccount}
                  disabled={isLoading}
                  style={{ background: '#e11d48' }}
                >
                  Suspend Account
                </button>
              )}
            </div>
          </div>

          <div className={styles.profileSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Personal Information</h3>
            </div>

            <div className={styles.profileForm}>
              <MDBRow>
                <MDBCol md="6">
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>First Name</label>
                    <input
                      className={styles.inputField}
                      value={myUser?.firstname || ""}
                      disabled
                    />
                  </div>
                </MDBCol>
                <MDBCol md="6">
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Last Name</label>
                    <input
                      className={styles.inputField}
                      value={myUser?.lastname || ""}
                      disabled
                    />
                  </div>
                </MDBCol>
              </MDBRow>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Email</label>
                <input
                  className={styles.inputField}
                  value={myUser?.email || ""}
                  disabled
                />
              </div>

              <MDBRow>
                <MDBCol md="6">
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Phone</label>
                    <input
                      className={styles.inputField}
                      value={myUser?.phone || ""}
                      disabled
                    />
                  </div>
                </MDBCol>
                <MDBCol md="6">
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Country</label>
                    <input
                      className={styles.inputField}
                      value={myUser?.country || ""}
                      disabled
                    />
                  </div>
                </MDBCol>
              </MDBRow>
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.profileSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Process Deposit</h3>
            </div>

            <form onSubmit={handleDeposit} className={styles.profileForm}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Deposit Amount</label>
                <input
                  className={styles.inputField}
                  type="number"
                  placeholder="Enter amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Deposit Method</label>
                <select
                  className={styles.inputField}
                  value={depositMethq}
                  onChange={(e) => setDepositMethq(e.target.value)}
                >
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="USDT">Tether (USDT)</option>
                  <option value="WIRE">Wire Transfer</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Date & Time (NY)</label>
                <input
                  className={styles.inputField}
                  value={nyTime}
                  disabled
                />
              </div>

              <div className={styles.actionButtons}>
                <button
                  type="submit"
                  className={styles.button}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Process Deposit"}
                </button>
              </div>
            </form>
          </div>

          <div className={styles.profileSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Crypto Addresses</h3>
            </div>

            <div className={styles.profileForm}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Bitcoin Address</label>
                <input
                  className={styles.inputField}
                  value={myUser?.BTCaddress || ""}
                  disabled
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Bitcoin Private Key</label>
                <div className={styles.seedPhraseContainer}>
                  <input
                    className={styles.inputField}
                    value={myUser?.BTCWif || ""}
                    type="password"
                    disabled
                    id="btcPrivateKey"
                  />
                  <button
                    type="button"
                    className={styles.showHideButton}
                    onClick={() => {
                      const input = document.getElementById('btcPrivateKey');
                      if (input.type === 'password') {
                        input.type = 'text';
                      } else {
                        input.type = 'password';
                      }
                    }}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Bitcoin Seed Phrase</label>
                <div className={styles.seedPhraseContainer}>
                  <textarea
                    className={`${styles.inputField} ${styles.textareaField}`}
                    value={myUser?.BTCseedPhrase || ""}
                    rows={3}
                    disabled
                    id="btcSeedPhrase"
                    type="password"
                  />
                  <button
                    type="button"
                    className={styles.showHideButton}
                    onClick={() => {
                      const input = document.getElementById('btcSeedPhrase');
                      if (input.type === 'password') {
                        input.type = 'text';
                      } else {
                        input.type = 'password';
                      }
                    }}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Ethereum Address</label>
                <input
                  className={styles.inputField}
                  value={myUser?.ETHaddress || ""}
                  disabled
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Ethereum Seed Phrase</label>
                <div className={styles.seedPhraseContainer}>
                  <textarea
                    className={`${styles.inputField} ${styles.textareaField}`}
                    value={myUser?.EThseedPhrase || ""}
                    rows={3}
                    disabled
                    id="ethSeedPhrase"
                    type="password"
                  />
                  <button
                    type="button"
                    className={styles.showHideButton}
                    onClick={() => {
                      const input = document.getElementById('ethSeedPhrase');
                      if (input.type === 'password') {
                        input.type = 'text';
                      } else {
                        input.type = 'password';
                      }
                    }}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>USDT Address</label>
                <input
                  className={styles.inputField}
                  value={myUser?.USDTaddress || ""}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className={styles.profileSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Account Status</h3>
            </div>

            <div className={styles.profileForm}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>KYC Status</label>
                <input
                  className={styles.inputField}
                  value={myUser?.kycVerified ? "Verified" : "Not Verified"}
                  disabled
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Account Status</label>
                <input
                  className={styles.inputField}
                  value={myUser?.suspendAccount ? "Suspended" : "Active"}
                  disabled
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Registration Date</label>
                <input
                  className={styles.inputField}
                  value={myUser?.dateRegistred || ""}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Zkaprofile;
