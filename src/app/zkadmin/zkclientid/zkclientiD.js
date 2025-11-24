"use client";
// import Image from "next/image";
import Cookies from "js-cookie";
import { MDBBtn } from "mdbreact";
import { useEffect, useState } from "react";
import { approveID, denyID } from "../action/suspended";

const ZkclientiD = () => {
  const [idPhoto1, setIdPhoto1] = useState();
  const [idPhoto2, setIdPhoto2] = useState();

  useEffect(() => {
    // const email = Cookies.get("email");
    setIdPhoto1(Cookies.get("idPhoto1"));
    setIdPhoto2(Cookies.get("idPhoto2"));
  });

  console.log(idPhoto1);

  return (
    <div>
      <img
        src={idPhoto1}
        alt="ID Card Image"
        width="337" // Width in pixels
        height="213" // Height in pixels
        style={{ objectFit: "cover" }} // Optional, to handle cropping or scaling
      />

      <img
        src={idPhoto2}
        alt="ID Card Image"
        width="337" // Width in pixels
        height="213" // Height in pixels
        style={{ objectFit: "cover" }} // Optional, to handle cropping or scaling
      />
      <div>
        <MDBBtn
          onClick={async () => {
            await denyID();
            alert("Denied!");
          }}
        >
          Deny
        </MDBBtn>{" "}
        <MDBBtn
          onClick={async () => {
            await approveID();
            alert("Approved!");
          }}
        >
          Approve
        </MDBBtn>
      </div>
    </div>
  );
};

export default ZkclientiD;
