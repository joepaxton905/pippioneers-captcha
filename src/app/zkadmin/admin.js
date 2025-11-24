"use client";
import { useEffect } from "react";
import { MDBTable, MDBBtn, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useRouter } from "next/navigation";
// import { getClients } from "../actions/getClients";
import { getClients } from "./action/getCl";
import Cookies from "js-cookie";

const Admin = ({ clients }) => {
  const router = useRouter();

  // console.log(clients.firstname);

  // useEffect(() => {
  //   async function OKOK() {
  //     const data = await getClients();
  //     const uuu = JSON.parse(data);
  //     console.log(uuu);
  //     // JSON.parse(jsonString);
  //   }

  //   OKOK();
  // }, []);
  let num = 1;
  return (
    <MDBTable hover responsive>
      <MDBTableHead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {clients.map((data) => {
          const handleNext = () => {
            Cookies.set("email", data.email, { expires: 7 });
            router.push("/zkadmin/zkprofile");
          };
          return (
            <tr key={data._id}>
              <th scope="row">{num++}</th>
              <td>
                {data.firstname} {data.lastname}
              </td>
              <td>{data.email}</td>
              <td>
                <MDBBtn
                  onClick={handleNext}

                  // onClick={() => {
                  //   router.push(
                  //     `/zkadmin/zkprofile?email=${encodeURIComponent(
                  //       data.email
                  //     )}`
                  //   );
                  //   // router.push("/zkadmin/zkprofile");
                  // }}
                >
                  More
                </MDBBtn>
              </td>
            </tr>
          );
        })}
      </MDBTableBody>
    </MDBTable>
  );
};

export default Admin;
