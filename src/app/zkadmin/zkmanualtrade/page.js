"use client";
// import ZkmaualTrade from "./zkmaualtrade";
// Start here
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// import { getClients } from "../action/getCl";
import { withReq } from "../action/withReq";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import "../.././globals.css";
import { MDBBtn } from "mdb-react-ui-kit";
import { approvemessage } from "../action/approvemessage";
import { Locaa } from "@/app/utils/locaa";
import { KdeleteWith, RefundWith } from "../action/suspended";

// end here

// im using manual trade as withdrawal for now

const Page = () => {
  const [clients, setClients] = useState([]);

  // start here
  const router = useRouter();
  useEffect(() => {
    const tokenValue = Cookies.get(["bossToken"]);
    if (!tokenValue) {
      router.push("/zkadmin");
    }
  }, []);
  // end here

  useEffect(() => {
    async function DDKKKl() {
      const clientsPPP = await withReq();
      console.log(clientsPPP);

      setClients(clientsPPP);
    }

    DDKKKl();
  }, []);

  let num = 1;

  return (
    <div style={{ height: "300vh" }}>
      {/* <h4>Clients and their Withdrawals</h4> */}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Address</th>
            <th>Deny</th>
            <th>Refund</th>
            <th>Approve</th>
            <th>Delete</th>

          </tr>
        </thead>
        <tbody>
          {clients.map(
            (client, clientIndex) =>
              client.deposit &&
              // Filter deposits where action is "WITHDRAW"
              client.deposit
                .filter((d) => d.action === "WITHDRAW")
                // Sort by latest transaction first (assumes latest deposit is last in the array)
                .reverse()
                .map((d, depositIndex) => (
                  <tr key={`${clientIndex}-${depositIndex}`}>
                    <td>{num++}. </td>
                    <td> {client.firstname}</td>
                    <td>{client.email}</td>
                    <td>${Locaa(d.depositAmount)}</td>
                    <td>{d.depositMethod}</td>
                    <td>{d.theRemit}</td>

                    <td>
                      <MDBBtn
                        color="danger"
                        onClick={() => {
                          Cookies.set("Name", client.firstname);
                          Cookies.set("temail", client.email);
                          Cookies.set("WithdrAmount", d.depositAmount);
                          Cookies.set("WithdrAddr", d.theRemit);
                          Cookies.set("theID", d._id);
                          router.push("/zkadmin/zkmanualtrade/denymessage");
                        }}
                      >
                        Deny
                      </MDBBtn>
                    </td>


                    <td>
                      {" "}
                      <MDBBtn
                        color="warning"
                        onClick={async () => {
                          const email = client.email;
                          const theID = d._id;
                          const WithdrAmount = d.depositAmount;
                          const name = client.firstname;
                          const data = { email, theID, WithdrAmount, name };
                          const resp = await RefundWith(data);
                          console.log(resp);
                          if (resp) {
                            alert("OK DONE");
                            window.location.reload();
                          }
                        }}
                      >
                        Refund
                      </MDBBtn>
                    </td>



                    <td>
                      {" "}
                      <MDBBtn
                        color="success"
                        onClick={async () => {
                          const email = client.email;
                          const theID = d._id;
                          const WithdrAmount = d.depositAmount;
                          const name = client.firstname;
                          const data = { email, theID, WithdrAmount, name };
                          const resp = await approvemessage(data);
                          console.log(resp);
                          if (resp) {
                            alert("OK DONE");
                            window.location.reload();
                          }
                        }}
                      >
                        Approve
                      </MDBBtn>
                    </td>

                    <td>
                      <MDBBtn
                        onClick={async () => {
                          Cookies.set("theID", d._id);
                          Cookies.set("themail", client.email);
                          const resp = await KdeleteWith();
                          alert("Withdrawal Req deleted!");
                          window.location.reload();
                        }}
                      >
                        Delete
                      </MDBBtn>
                    </td>
                  </tr>
                ))
          )}
        </tbody>
      </table>
    </div>
  );
  // return <ZkmaualTrade clients={clients} />
};

export default Page;
