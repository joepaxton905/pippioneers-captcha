import Header from "./header";

const Layout = ({ children }) => {
  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "16px 0"
    }}>
      <h1 style={{
        fontSize: "1.5rem",
        fontWeight: "600",
        margin: "16px 4%",
        color: "#333"
      }}>
        Trading History
      </h1>
      <Header />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
