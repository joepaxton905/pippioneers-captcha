"use client";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBInput } from "mdbreact";
import { useState } from "react";
// import k from "./login.module.css";
import k from "./zkadmin.module.css";
// import { handleLogin } from "../actions/login";
// import { zkLogin } from "./action/zklogin";
import { zkLogin } from "./action/zklogin";
import { useRouter } from "next/navigation";
// import { emailVerifiCode } from "../actions/emailverificode";
// import Spinner from "../overComp/spinner";
import Spinner from "../overComp/spinner";

const Login = () => {
  const router = useRouter();
  const [emailB, setemail] = useState("");
  const email = emailB.toLowerCase();

  const [password, setpassword] = useState("");

  const [errmsg, seterrmsg] = useState();

  const [spinner, setSpinner] = useState(false);

  const handleSubmit = async (event) => {
    setSpinner(true);
    event.preventDefault();

    const data = { email, password };
    console.log(data);

    const response = await zkLogin(data);
    console.log(response);

    if (response === true) {
      // console.log(response);
      router.push("/zkadmin/zkclients");
      setSpinner(false);
    }

    if (response === false) {
      setSpinner(false);
    }

    if (response.status === "error") {
      seterrmsg(response.message);
      setSpinner(false);
    }
  };

  return (
    <>
      <div
        className={k.overDiv}
        style={{ width: "100%", fontWeight: "normal", color: "black" }}
      >
        <div
          className={k.formDiv}
          //   style={verify ? { display: "none" } : { display: "block" }}
        >
          <i>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "2rem",
                textAlign: "center",

                color: "#2c3782",
              }}
            >
              Ad
              <span style={{ color: "#6576ff", fontSize: "20px" }}>min</span>
            </p>
          </i>
          <p style={{ textAlign: "center" }}>
            Welcome back! Log in to your account.
          </p>
          <p style={{ textAlign: "center", color: "red" }}>{errmsg}</p>

          <form
            action=""
            className="mt-2 formx"
            // onSubmit={handleSubmit}
          >
            <div className="form-outline">
              <MDBInput
                label="Email"
                onChange={(e) => setemail(e.target.value)}
              />

              <MDBInput
                label="Password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            {spinner && <Spinner />}

            <button
              className="btn   text-light"
              style={{
                backgroundColor: "#2c3782",
                marginLeft: "0px",
                width: "100%",
                marginTop: "10px",
              }}
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
