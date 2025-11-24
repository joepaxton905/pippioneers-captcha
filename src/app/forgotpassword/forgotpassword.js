"use client";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBInput } from "mdbreact";
import { useState } from "react";
import { ForgotPasswordEmail } from "../actions/forgotPassword";
import { useRouter } from "next/navigation";
import Spinner from "../overComp/spinner";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [ermsg, setEmsg] = useState();
  const [spinner, setSpinner] = useState(false);
  

  const handleForgotPasswordEmail = async (event) => {
    setSpinner(true);
    event.preventDefault();
    const response = await ForgotPasswordEmail(email);
    // console.log(response);

    if (response.status === "ok") {
      setSpinner(false);
      router.push(`/changepassword?email=${encodeURIComponent(email)}`);
    }

    if (response.status === "error") {
      setSpinner(false);
      setEmsg(response.message);
    }
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <p style={{ textAlign: "center", color: "blue", marginTop: "120px" }}>
        Enter your email
      </p>
      <p style={{ textAlign: "center", color: "red" }}>{ermsg}</p>
      <form>
        <MDBInput
          style={{ border: "solid 1px", marginTop: "40px" }}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {spinner && <Spinner />}
        <button
          className="btn w-100  text-light"
          style={{
            backgroundColor: "#6576ff",
            marginLeft: "0px",
            marginTop: "30px",
          }}
          onClick={handleForgotPasswordEmail}
        >
          Proceed
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
