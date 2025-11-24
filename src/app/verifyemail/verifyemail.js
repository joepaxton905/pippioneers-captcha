"use client";
import { MDBInput } from "mdbreact";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "sweetalert2/src/sweetalert2.scss";
import k from "../signup/signup.module.css";
import Spinner from "../overComp/spinner";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";
import { verifyEmail } from "../actions/verifyemail";
import { emailVerifiCode } from "../actions/emailverificode";
import { useSearchParams } from "next/navigation";

const Verifyemail = () => {
  const [code, setCode] = useState("");
  const [errmsg, seterrmsg] = useState();
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const handleSubmit = async (event) => {
    setSpinner(true);
    event.preventDefault();

    try {
      const response = await verifyEmail(code);
      console.log(response);

      if (response.status === "ok") {
        router.push("/");
      } else if (response.status === "error") {
        setSpinner(false);
        seterrmsg(response.message);
      }
    } catch (error) {
      setSpinner(false);
      console.error("Error verifying email:", error);
      seterrmsg("An unexpected error occurred. Please try again.");
    }
  };

  const handleEmailRevev = async () => {
    setSpinner(true);
    const response = await emailVerifiCode(email);
    console.log(response);
    if (response.status === "ok") {
      setSpinner(false);
    }
  };

  return (
    <div className={k.formDiv}>
      <p style={{ textAlign: "center", color: "blue", marginTop: "120px" }}>
        Check email for code
      </p>
      <h4 style={{ textAlign: "center", color: "red" }}>{errmsg}</h4>
      <form action="" className="mt-2 formx" onSubmit={handleSubmit}>
        <div className="form-outline">
          <MDBInput
            label="Enter Code"
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        {spinner && <Spinner />}
        <button
          className="btn w-100  text-light"
          style={{ backgroundColor: "#6576ff", marginLeft: "0px" }}
        >
          Verify Email
        </button>
        <p
          style={{
            color: "green",
            textAlign: "center",
            fontSize: "0.8rem",
          }}
          onClick={handleEmailRevev}
        >
          Resend Code
        </p>
      </form>
    </div>
  );
};

export default Verifyemail;
