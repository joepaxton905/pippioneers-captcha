"use client";
import { useState, useRef, useEffect } from "react";
import Spinner from "../overComp/spinner";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useRouter } from "next/navigation";
import { MDBFile, MDBBtn } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Cookies from "js-cookie";
import { authUser } from "../actions/authUser";
import DriverID from "./driverID";
import DriveriDBK from "./driveriDbK";
import { Suspense } from "react";

export default function AvatarUploadPage() {
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const tokenValue = Cookies.get(["logToken"]);
    if (!tokenValue) {
      router.push("/");
    }
  }, []);

  // from here
  const [userData, setUserData] = useState({});
  useEffect(() => {
    async function getUser() {
      try {
        const data = await authUser();
        const { userData } = data;
        setUserData(userData);
        // console.log(userData.suspendAccount);
        if (userData.suspendAccount === true) {
          router.push("/suspended");
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);
  // end here

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <form
          style={{
            width: "80%",
            margin: "auto",
            marginTop: "50px",
            color: "black",
            fontSize: "bolder",
          }}
          onSubmit={async (event) => {
            event.preventDefault();
            setSpinner(true);

            const file = inputFileRef.current.files[0];

            const response = await fetch(
              `/api/avatar/upload?filename=${file.name}`,
              {
                method: "POST",
                body: file,
              }
            )
              //   Start

              // Handle the first file upload
              // const files = inputFileRef.current.files;
              // const response1 = await fetch(
              //   `/api/avatar/upload?filename=${files[0].name}`,
              //   {
              //     method: "POST",
              //     body: files[0],
              //   }
              // );

              // Handle the second file upload
              // const response2 = await fetch(
              //   `/api/avatar/upload?filename=${files[1].name}`,
              //   {
              //     method: "POST",
              //     body: files[1],
              //   }
              // )
              //   End

              .then((res) => {
                if (res.status == 200) {
                  setSpinner(false);
                  console.log(res);
                  if (res.status == 200) {
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
                      title: "ID Verification pending",
                    });
                    //   .then(() => {
                    //   router.push("/overview");
                    // });
                  }
                }
              });
          }}
        >
          {/* <input name="files" ref={inputFileRef} type="file" multiple required /> */}

          <MDBFile
            ref={inputFileRef}
            name="file"
            label="Select Passport"
            size="sm"
            id="formFileSm"
            type="file"
            required
            // multiple
          />

          {spinner && <Spinner />}

          <MDBBtn
            color="dark"
            style={{
              color: "white",
              backgroundColor: "#2c3782",
              borderRadius: "20px",
              marginTop: "20px",
            }}
          >
            Submit
          </MDBBtn>
          {/* <button type="submit">Upload</button> */}
        </form>

        <div
          style={{
            // border: "solid 1px",
            width: "90%",
            margin: "auto",
            marginTop: "30px",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "#2c3782",
            }}
          >
            Driver, National ID Verification
          </p>
          <DriverID />
          <DriveriDBK />
        </div>
      </>
    </Suspense>
  );
}
