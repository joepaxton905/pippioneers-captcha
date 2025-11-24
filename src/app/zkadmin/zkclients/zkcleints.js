"use client";
import { useEffect } from "react";
import { MDBTable, MDBBtn, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useRouter } from "next/navigation";
// import { getClients } from "./action/getCl";
import Cookies from "js-cookie";
import { delProfile } from "../action/suspended";

const Zkcleints = ({ clients }) => {
  const router = useRouter();
  let num = 1;
  // style={{ overflow: "auto", height: "150vh" }}

  if(!clients){
    return <div>Loading...</div>

  }




  return (
    <div
      style={{
        height: "300vh",
      }}
    >
      <MDBTable hover responsive>
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
            <th scope="col">Delete</th>
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
                <td>{data.phone}</td>
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

                <td>
                  <MDBBtn style={{backgroundColor:"red"}}
                    onClick={async()=>{
                     const resp = await delProfile(data._id)
                     if(resp){
                      window.location.reload();
                     }



                    }}


                  >
                    Delete
                  </MDBBtn>
                </td>
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default Zkcleints;
