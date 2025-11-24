"use client";
import k from "../page.module.css";
import { MDBIcon } from "mdb-react-ui-kit";

const Gettingstarted = () => {
  return (
    <>
      <div className={k.Gettingstarted}>
        <div className={k.GettingstartedInner}>
          <p className={k.getsicon}>
            <MDBIcon far icon="envelope" />
          </p>
        </div>
        <div className={k.GettingstartedInner}>
          <p className={k.getsicon}>
            <MDBIcon fas icon="comments-dollar" />
          </p>
        </div>
        <div className={k.GettingstartedInner}>
          <p className={k.getsicon}>
            <MDBIcon fas icon="dollar-sign" />
          </p>
        </div>
      </div>
      <div className={k.getsText}>
        <p className={k.getsTextPar}>Getting help from Customer Support</p>
        <p className={k.getsTextPar}>Reviews from our customers</p>
        <p className={k.getsTextPar}>How to deposit money</p>
      </div>
    </>
  );
};

export default Gettingstarted;
