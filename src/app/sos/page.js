const Sos = () => {

    const email = process.env.NEXT_PUBLIC_companyEmail;
    const mailtoLink = `mailto:${email}?subject=Help!&body=Hello,%20I%20would%20like%20to%20talk%20to%20you.`;

    return (  <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Brokerage under Investigation</h1>
        <p style={styles.message}>
        {process.env.NEXT_PUBLIC_CompanyNameAbv} {process.env.NEXT_PUBLIC_CompanyNameAbSec} is currently under Fbi/Sec Investigation.
          {/* Your account has been locked due to strategy/security concern. */}
        </p>
        <p style={styles.subMessage}>
         Try again later.
          {/* Please contact support for assistance or try again later. */}
        </p>
        {/* <button style={styles.button} onClick={() => router.push("/support")}>
          Contact Support
        </button> */}

        {/* <button style={styles.button}>
          <a style={{ color: "white" }} href={mailtoLink}>
            Contact Support
          </a>
        </button> */}
      </div>
    </div> );
}

const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh",
      backgroundColor: "#f8f9fa",
    },
    card: {
      backgroundColor: "#fff",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    heading: {
      fontSize: "2rem",
      marginBottom: "1rem",
    },
    message: {
      fontSize: "1.2rem",
      marginBottom: "0.5rem",
    },
    subMessage: {
      fontSize: "1rem",
      marginBottom: "1.5rem",
      color: "#6c757d",
    },
    button: {
      padding: "0.75rem 1.5rem",
      fontSize: "1rem",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };
 
export default Sos;