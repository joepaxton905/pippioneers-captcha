"use client";
import { useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { MDBFile } from "mdb-react-ui-kit";
import { MDBBtn } from "mdb-react-ui-kit";
import { useRouter } from "next/navigation";

const VerifyAccount = () => {
  const [basicActive, setBasicActive] = useState("tab1");
  const router = useRouter();

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };


  // START


  // END




  return (
    <>
      <MDBTabs pills className="mb-3" style={{ width: "90", margin: "auto" }}>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab1")}
            active={basicActive === "tab1"}
            style={{ fontSize: "11px" }}
          >
            iD card
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab2")}
            active={basicActive === "tab2"}
            style={{ fontSize: "11px" }}
          >
            Drivers License
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab3")}
            active={basicActive === "tab3"}
            style={{ fontSize: "11px" }}
          >
            Passport
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane
          open={basicActive === "tab1"}
          style={{ width: "80%", margin: "auto" }}
        >
          <MDBFile label="Front" size="sm" id="formFileSm" />
          <MDBFile label="Back" size="sm" id="formFileSm" />
          <MDBBtn
            color="dark"
            style={{
              color: "white",
              backgroundColor: "#2c3782",
              borderRadius: "20px",
              marginTop: "20px",
            }}
            onClick={() => {
              router.push("/addfunds");
            }}
          >
            Submit
          </MDBBtn>
        </MDBTabsPane>

        <MDBTabsPane
          open={basicActive === "tab2"}
          style={{ width: "80%", margin: "auto" }}
        >
          <MDBFile label="Front" size="sm" id="formFileSm" />
          <MDBFile label="Back" size="sm" id="formFileSm" />
          <MDBBtn
            color="dark"
            style={{
              color: "white",
              backgroundColor: "#2c3782",
              borderRadius: "20px",
              marginTop: "20px",
            }}
            onClick={() => {
              router.push("/addfunds");
            }}
          >
            Submit
          </MDBBtn>
        </MDBTabsPane>
        <MDBTabsPane
          open={basicActive === "tab3"}
          style={{ width: "80%", margin: "auto" }}
        >
          <MDBFile label="Passport" size="sm" id="formFileSm" />

          <MDBBtn
            color="dark"
            style={{
              color: "white",
              backgroundColor: "#2c3782",
              borderRadius: "20px",
              marginTop: "20px",
            }}
            onClick={() => {
              router.push("/addfunds");
            }}
          >
            Submit
          </MDBBtn>
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
};

export default VerifyAccount;
