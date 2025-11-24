"use client";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import dynamic from "next/dynamic";
import { MDBBtn } from "mdb-react-ui-kit";
import "react-quill/dist/quill.snow.css";
// Dynamically import Quill to work with Next.js SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { withDeny } from "../../action/withDeny";

const DenyMessage = () => {
  const [name, setName] = useState();
  const [temail, setTemail] = useState();
  const [amnt, setAmnt] = useState();
  const [addr, setAddr] = useState();
  const [value, setValue] = useState("");
  const [theID, setTheID] = useState();

  useEffect(() => {
    setName(Cookies.get(["Name"]));
    setTemail(Cookies.get(["temail"]));
    setAmnt(Cookies.get(["WithdrAmount"]));
    setAddr(Cookies.get(["WithdrAddr"]));
    setTheID(Cookies.get(["theID"]));
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { theID, temail, value };
    const resp = await withDeny(data);
    console.log(resp);
    if (resp) {
      alert("message sent!");
      window.location.reload();
    }
  };

  return (
    <div>
      <MDBBtn onClick={handleSubmit}>Send</MDBBtn>
      <MDBTable responsive>
        <MDBTableHead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            <td>{name}</td>
            <td>${amnt}</td>
            <td>{temail}</td>
            <td>{addr}</td>
          </tr>
        </MDBTableBody>
      </MDBTable>

      <div>
        <form>
          <ReactQuill
            style={{ height: "300px" }}
            value={value}
            onChange={setValue}
          />
          {/* <MDBBtn onClick={handleSubmit}>Send</MDBBtn> */}
        </form>

      </div>

      {/* <button>Seenndd</button> */}
    </div>
  );
};

export default DenyMessage;
