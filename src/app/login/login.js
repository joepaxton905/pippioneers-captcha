"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleLogin } from "../actions/login";
import { emailVerifiCode } from "../actions/emailverificode";
import styles from "./login.module.css";

const Login = () => {
  const router = useRouter();
  const [emailB, setEmail] = useState("");
  const email = emailB.toLowerCase();
  const [password, setPassword] = useState("");
  const [errmsg, setErrMsg] = useState("");
  const [verify, setVerify] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [revev, setRevev] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSpinner(true);

    if (!email || !password) {
      setErrMsg("Please enter both email and password");
      setSpinner(false);
      return;
    }

    const data = { email, password };
    const response = await handleLogin(data);

    if (response.status === "ok") {
      router.push("/overview");
    }

    if (response.status === "error") {
      setErrMsg(response.message);
      setSpinner(false);
    }

    if (response.message === "Email not verified") {
      setRevev("Verify");
      setSpinner(false);
    }
  };

  const handleEmailRevev = async () => {
    setSpinner(true);
    const response = await emailVerifiCode(email);
    if (response.status === "ok") {
      router.push(`/verifyemail?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginLeft}>
          <div className={styles.leftContent}>
            <h1>Welcome Back</h1>
            <p>Log in to access your account and manage your investments with ease.</p>
            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className={styles.featureText}>
                  <h3>Secure Access</h3>
                  <p>Your data is protected with state-of-the-art encryption</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                </div>
                <div className={styles.featureText}>
                  <h3>Real-time Updates</h3>
                  <p>Access your portfolio performance instantly</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                </div>
                <div className={styles.featureText}>
                  <h3>Quick Access</h3>
                  <p>Fast loading times and responsive interface</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.loginRight}>
          <div className={styles.loginBox}>
            <div className={styles.brandHeader}>
              <h2 className={styles.brandName}>
                {process.env.NEXT_PUBLIC_CompanyNameFirstSplit}
                <span className={styles.brandHighlight}>
                  {process.env.NEXT_PUBLIC_CompanyNameSecondSplit}
                </span>
              </h2>
            </div>
            <h3 className={styles.loginTitle}>Sign In</h3>

            {errmsg && (
              <div className={styles.errorMessage}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {errmsg}
                {revev && (
                  <button
                    className={styles.verifyLink}
                    onClick={handleEmailRevev}
                  >
                    {revev} Now
                  </button>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.loginForm}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <div className={styles.inputWithIcon}>
                  <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <input
                    type="email"
                    id="email"
                    value={emailB}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                  />
                 

                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <div className={styles.inputWithIcon}>
                  <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    required
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className={styles.forgotPasswordContainer}>
                <button
                  type="button"
                  className={styles.forgotPasswordLink}
                  onClick={() => router.push("/forgotpassword")}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className={styles.loginButton}
                disabled={spinner}
              >
                {spinner ? (
                  <div className={styles.spinnerContainer}>
                    <div className={styles.spinner}></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className={styles.divider}>
              <span>OR</span>
            </div>

            <div className={styles.registerContainer}>
              <p>Don't have an account?</p>
              <button
                className={styles.registerButton}
                onClick={() => router.push("/signup")}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
