"use client";
import { MDBInput, MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import { autoProfit } from "../action/autoProfit";
import { useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const ZKautotrade = () => {
  const [stake, setStake] = useState(0);
  const [result, setResult] = useState(0);
  const [resulttype, setResultType] = useState("PROFIT");

  const handleAutoProfit = async (event) => {
    event.preventDefault();
    const data = {
      stake,
      result,
      resulttype,
    };

    const resp = await autoProfit(data);
    console.log(resp);
    if (resp) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "OK BOSS",
      }).then(() => {
        window.location.reload();
      });

      // router.push("/trade");
    }
  };
  return (
    <div
      style={{
        // border: "solid",
        width: "80%",
        margin: "auto",
        marginTop: "40px",
      }}
    >
      <form>
        <div>
          {/* <label htmlFor="payment-method">Payment Method:</label> */}
          <select
            id="payment-method"
            value={resulttype}
            // onChange={handleSelectChange}
            onChange={(e) => setResultType(e.target.value)}
            className="mb-4"
          >
            <option value="PROFIT" disabled>
              Result type Profit
            </option>
            <option value="PROFIT">PROFIT</option>
            <option value="LOSS">LOSS</option>
            {/* <option value="stale">Stale</option> */}
          </select>
        </div>

        <MDBInput
          wrapperClass="mb-4"
          id="form9Example1"
          label="Stake"
          onChange={(e) => setStake(e.target.value)}
        />
      </form>
      <form>
        <MDBInput
          wrapperClass="mb-4"
          id="form9Example1"
          label="Result"
          onChange={(e) => setResult(e.target.value)}
        />
        <MDBBtn onClick={handleAutoProfit} style={{ width: "100%" }}>
          Submit
        </MDBBtn>
      </form>
    </div>
  );
};

export default ZKautotrade;
