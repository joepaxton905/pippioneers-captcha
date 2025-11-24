"use client";
import Zkcleints from "./zkcleints";
import { useEffect, useState } from "react";
import { getClients } from "../action/getCl";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { delProfile } from "../action/suspended";
import { MDBTable, MDBBtn, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";


const nZlclients = () => {
    const [clients, setClients] = useState([]);


    // start here
  const router = useRouter();

  let num = 1;
  useEffect(() => {
    const tokenValue = Cookies.get(["bossToken"]);
    if (!tokenValue) {
      router.push("/zkadmin");
    }
  }, []);
  // end here

  if(!clients){
    console.log("looooooooooooooinggggggggg");

    return <div>Loading...</div>

  }


  useEffect(() => {
    async function KKKl() {
      const clientsPPP = await getClients();
      const clientsWW = await JSON.parse(clientsPPP).slice().reverse();
      setClients(clientsWW);
    }

    KKKl();
  }, []);




    return ( <div
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
      </div> );
}

export default nZlclients;