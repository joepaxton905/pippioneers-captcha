"use client";
import { MDBIcon } from "mdb-react-ui-kit";
import { MDBBtn } from "mdb-react-ui-kit";
import { useRouter } from "next/navigation";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";

import k from "../page.module.css";
const Carousel = () => {
  const router = useRouter();
  return (
    <>
      <div className={k.ovvercarousel}>
        <div className={k.carousel}>
          <p className={k.carouselp} style={{ marginTop: "15px" }}>
            Funding balance
            <span className={k.spanIcon}>
              <MDBIcon far icon="eye" />
            </span>
          </p>
          <p
            className={k.carouselp}
            style={{ fontSize: "1.5rem", fontWeight: "bolder", color: "black" }}
          >
            $443,326.73
          </p>
          <p className={k.carouselp}>
            $100,000 uninvested cash
            <span className={k.spanIcon}>
              <MDBIcon far icon="question-circle" />
            </span>
          </p>
          <div
            className={k.ttss}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
              margin: "auto",
            }}
          >
            {" "}
            <MDBBtn
              color="dark"
              style={{
                color: "white",
                backgroundColor: "black",
                borderRadius: "20px",
              }}
              onClick={() => {
                router.push("/addfunds");
              }}
            >
              Add Funds
            </MDBBtn>
            <MDBBtn
              outline
              color="dark"
              rippleColor="dark"
              style={{ outlineColor: "black", borderRadius: "20px" }}
              onClick={() => {
                router.push("/withdraw");
              }}
            >
              Withdraw
            </MDBBtn>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
