"use client";
import { MDBInput } from "mdbreact";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Spinner from "../overComp/spinner";
import { LoggedFinalChangePassword } from "../actions/changePasswordBckEndLogged";
const Lgpass = () => {
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmPassword] = useState();
  const [spinner, setSpinner] = useState(false);
  const [ermsg, setEmsg] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  // console.log(email);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSpinner(true);
    const data = {
      newPassword,
      confirmNewPassword,
    };
    const response = await LoggedFinalChangePassword(data);
    // console.log(response);
    if (response.status === "ok") {
      setSpinner(false);
      router.push("/");
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
        Reset password
      </p>{" "}
      <p style={{ textAlign: "center", color: "red" }}>{ermsg}</p>
      <form
        action=""
        className="mt-2 formx"
        //   onSubmit={handleSubmit}
      >
        <div className="form-outline">
          <MDBInput
            style={{ border: "solid 1px", marginTop: "30px" }}
            label="New password"
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <MDBInput
            style={{ border: "solid 1px", marginTop: "30px" }}
            label="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {spinner && <Spinner />}
        <button
          className="btn w-100  text-light"
          style={{
            backgroundColor: "#6576ff",
            marginLeft: "0px",
            marginTop: "30px",
          }}
          onClick={handleSubmit}
        >
          Change password
        </button>
      </form>
    </div>
  );
};

export default Lgpass;
