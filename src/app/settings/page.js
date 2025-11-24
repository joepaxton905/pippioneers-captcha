"use client";
import Settings from "./setting";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { authUser } from "../actions/authUser";
import K from "./setting.module.css";
import { MDBIcon } from "mdb-react-ui-kit";

const Page = () => {
  const router = useRouter();
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        setIsAuthChecking(true);
        // Check if user has a valid token
        const tokenValue = Cookies.get("logToken");
        if (!tokenValue) {
          router.push("/");
          return;
        }

        // Check if account is suspended
        const data = await authUser();
        const { userData } = data;

        if (userData?.suspendAccount === true) {
          router.push("/suspended");
          return;
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setAuthError("We couldn't authenticate your account. Please try logging in again or contact support.");
      } finally {
        setIsAuthChecking(false);
      }
    };

    checkAuthentication();
  }, [router]);

  if (isAuthChecking) {
    return (
      <div className={K.container}>
        <div className={K.loadingState}>Verifying your session...</div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className={K.container}>
        <div className={K.errorState}>
          <MDBIcon fas icon="exclamation-triangle" style={{ fontSize: '2rem', color: '#ef4444' }} />
          <div>
            <h3 style={{ color: '#b91c1c', marginBottom: '8px' }}>Authentication Error</h3>
            <p>{authError}</p>
            <button
              onClick={() => router.push('/')}
              style={{
                marginTop: '16px',
                padding: '8px 16px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              Return to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <Settings />;
};

export default Page;
