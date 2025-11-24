"use client";
import { useEffect, useState } from "react";
import { MDBIcon, MDBBtn, MDBInput, MDBRadio } from "mdb-react-ui-kit";
import Cookies from "js-cookie";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Withdraw } from "../actions/withdraw";

const WithdrawComp = () => {
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

  // Create mailto link for support
  const companyEmail = process.env.NEXT_PUBLIC_companyEmail;
  const mailtoLink = `mailto:${companyEmail}?subject=Withdrawal Support&body=Hello,%20I%20need%20assistance%20with%20my%20withdrawal.`;

  const email = Cookies.get(["email"]);

  const [myUser, setMyUser] = useState([]);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [withdrawMethq, setWithdrawMethq] = useState();
  const [theRemit, setTheRemit] = useState("");
  const [activeTab, setActiveTab] = useState("bitcoin");

  const nyTime = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!withdrawAmount || !theRemit || !withdrawAddress) {
      showToast("error", "Please fill in all required fields!");
      return;
    }

    const data = {
      WithdrawAmount: withdrawAmount,
      withdrawMethq,
      nyTime,
      WithdrawAddress: withdrawAddress,
      theRemit,
    };

    const resp = await Withdraw(data);

    if (resp === true) {
      showToast("success", "Withdrawal pending!").then(() => {
        window.location.reload();
      });
    } else {
      showToast("error", "Withdrawal failed. Please try again!");
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
    return Toast.fire({ icon, title });
  };

  const paymentMethods = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      icon: "bitcoin",
      label: "BTC",
      color: "#f7931a",
      description: "Fast and secure cryptocurrency transactions",
    },
    {
      id: "ethereum",
      name: "Ethereum",
      icon: "ethereum",
      label: "ETH",
      color: "#627eea",
      description: "Smart contract capable digital currency",
    },
    {
      id: "usdt",
      name: "USDT",
      icon: "dollar-sign",
      label: "USDT",
      color: "#26a17b",
      description: "Stable cryptocurrency pegged to USD",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: "university",
      label: "BANK",
      color: "#2c3782",
      description: "Traditional banking wire transfer",
    },
  ];

  // Filter payment methods based on isNcp
  const filteredPaymentMethods = isNcp
    ? paymentMethods.filter(method => method.id !== "bank")
    : paymentMethods;

  // If active tab is "bank" and isNcp is true, set active tab to "bitcoin"
  useEffect(() => {
    if (isNcp && activeTab === "bank") {
      setActiveTab("bitcoin");
      setWithdrawAddress("BTC");
    }
  }, [isNcp, activeTab]);

  return (
    <div className="withdraw-container">
      <div className="withdraw-header">
        <h1>Withdraw Funds</h1>
        <p>Request a withdrawal to your preferred payment method</p>
      </div>

      <div className="payment-methods-container">
        <div className="payment-methods-tabs">
          {filteredPaymentMethods.map((method) => (
            <div
              key={method.id}
              className={`payment-method-tab ${activeTab === method.id ? "active" : ""}`}
              onClick={() => {
                setActiveTab(method.id);
                setWithdrawAddress(method.label);
              }}
            >
              <div className="tab-icon" style={{ backgroundColor: method.color }}>
                <MDBIcon fab={method.id === "bitcoin" || method.id === "ethereum"} fas={method.id !== "bitcoin" && method.id !== "ethereum"} icon={method.icon} />
              </div>
              <div className="tab-info">
                <h3>{method.name}</h3>
                <p>{method.description}</p>
              </div>
              {activeTab === method.id && (
                <div className="active-indicator">
                  <MDBIcon fas icon="check-circle" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="withdraw-form-container">
          <div className="withdraw-form">
            <h2>
              <MDBIcon
                fab={activeTab === "bitcoin" || activeTab === "ethereum"}
                fas={activeTab !== "bitcoin" && activeTab !== "ethereum"}
                icon={filteredPaymentMethods.find(m => m.id === activeTab)?.icon}
                style={{ color: filteredPaymentMethods.find(m => m.id === activeTab)?.color }}
              />
              {filteredPaymentMethods.find(m => m.id === activeTab)?.name} Withdrawal
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Amount (USD)</label>
                <div className="amount-input">
                  <MDBIcon fas icon="dollar-sign" />
                  <input
                    type="number"
                    placeholder="Enter amount to withdraw"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  {activeTab === "bank" ? "IBAN / Account Number" : `${filteredPaymentMethods.find(m => m.id === activeTab)?.name} Address`}
                </label>
                <div className="address-input">
                  <MDBIcon fas icon={activeTab === "bank" ? "university" : "wallet"} />
                  <input
                    type="text"
                    placeholder={activeTab === "bank" ? "Enter your bank account details" : `Enter your ${filteredPaymentMethods.find(m => m.id === activeTab)?.name} address`}
                    value={theRemit}
                    onChange={(e) => setTheRemit(e.target.value)}
                    required
                  />
                </div>
              </div>

              {activeTab === "bank" && !isNcp && (
                <div className="form-group">
                  <label>SWIFT/BIC Code</label>
                  <div className="swift-input">
                    <MDBIcon fas icon="university" />
                    <input
                      type="text"
                      placeholder="Enter SWIFT/BIC code"
                    />
                  </div>
                </div>
              )}

              <div className="form-notice">
                <MDBIcon fas icon="exclamation-circle" />
                <p>Withdrawals are typically processed within 24-48 hours. A confirmation email will be sent once processed.</p>
              </div>

              <button type="submit" className="withdraw-button">
                <MDBIcon fas icon="money-bill-wave" className="me-2" />
                Request Withdrawal
              </button>
            </form>
          </div>

          <div className="withdraw-info">
            <div className="info-card">
              <div className="info-header">
                <MDBIcon fas icon="shield-alt" />
                <h3>Secure Transactions</h3>
              </div>
              <p>All withdrawals are processed through our secure payment gateway with industry-standard encryption.</p>
            </div>

            <div className="info-card">
              <div className="info-header">
                <MDBIcon fas icon="question-circle" />
                <h3>Need Help?</h3>
              </div>
              <p>If you encounter any issues with your withdrawal, please contact our support team.</p>
              <a href={mailtoLink} className="support-link">
                <MDBIcon fas icon="headset" className="me-2" />
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .withdraw-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .withdraw-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .withdraw-header h1 {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #151b46 0%, #2c3782 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .withdraw-header p {
          color: #666;
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .payment-methods-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          overflow: hidden;
          margin-bottom: 30px;
        }

        .payment-methods-tabs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
          padding: 20px;
        }

        .payment-method-tab {
          display: flex;
          align-items: center;
          padding: 15px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .payment-method-tab:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .payment-method-tab.active {
          background: rgba(44, 55, 130, 0.05);
          border-color: #2c3782;
        }

        .tab-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          color: white;
        }

        .tab-info {
          flex: 1;
        }

        .tab-info h3 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
          margin-bottom: 4px;
        }

        .tab-info p {
          font-size: 0.8rem;
          color: #666;
          margin: 0;
        }

        .active-indicator {
          margin-left: 10px;
          color: #2c3782;
        }

        .withdraw-form-container {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          padding: 0 20px 20px;
        }

        .withdraw-form {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .withdraw-form h2 {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 8px;
          color: #444;
        }

        .amount-input,
        .address-input,
        .swift-input {
          display: flex;
          align-items: center;
          background: #f7f9fc;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 10px;
          padding: 0 15px;
          transition: all 0.3s ease;
        }

        .amount-input:focus-within,
        .address-input:focus-within,
        .swift-input:focus-within {
          border-color: #2c3782;
          box-shadow: 0 0 0 2px rgba(44, 55, 130, 0.1);
        }

        .amount-input i,
        .address-input i,
        .swift-input i {
          color: #2c3782;
          margin-right: 10px;
        }

        .amount-input input,
        .address-input input,
        .swift-input input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 15px 0;
          font-size: 1rem;
          outline: none;
          width: 100%;
        }

        .form-notice {
          display: flex;
          align-items: flex-start;
          padding: 12px 15px;
          background: rgba(33, 150, 243, 0.08);
          border-radius: 8px;
          margin-bottom: 25px;
        }

        .form-notice i {
          color: #2196f3;
          margin-right: 10px;
          margin-top: 3px;
        }

        .form-notice p {
          font-size: 0.85rem;
          color: #444;
          margin: 0;
        }

        .withdraw-button {
          width: 100%;
          padding: 15px 20px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #151b46 0%, #2c3782 100%);
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .withdraw-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(44, 55, 130, 0.3);
        }

        .withdraw-info {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .info-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .info-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }

        .info-header i {
          font-size: 1.5rem;
          color: #2c3782;
          margin-right: 10px;
        }

        .info-header h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
        }

        .info-card p {
          font-size: 0.9rem;
          color: #555;
          margin-bottom: 15px;
        }

        .support-link {
          display: inline-flex;
          align-items: center;
          color: #2c3782;
          font-weight: 500;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .support-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 992px) {
          .withdraw-form-container {
            grid-template-columns: 1fr;
          }

          .payment-methods-tabs {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 576px) {
          .payment-methods-tabs {
            grid-template-columns: 1fr;
          }

          .withdraw-header h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default WithdrawComp;
