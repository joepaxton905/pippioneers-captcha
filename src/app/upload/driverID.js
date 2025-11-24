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

const DriverID = () => {
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();

  return (
    <div>
      <form
        style={{
          width: "80%",
          margin: "auto",
          //   marginTop: "50px",
          color: "black",
          fontSize: "bolder",
        }}
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            setSpinner(true);

            const file = inputFileRef.current.files[0];

            // Helper function to create a timeout
            function fetchWithTimeout(url, options, timeout = 5000) {
              // Timeout set to 1 minute (60000 ms)
              return Promise.race([
                fetch(url, options),
                new Promise((_, reject) =>
                  setTimeout(
                    () => reject(new Error("Request timed out")),
                    timeout
                  )
                ),
              ]);
            }

            const response = await fetchWithTimeout(
              `/api/avatar/upload?filename=${file.name}`,
              {
                method: "POST",
                body: file,
              },
              5000 // Timeout set to 1 minute (60 seconds)
            )
              //   const response = await fetch(
              //     `/api/avatar/upload?filename=${file.name}`,

              //     {
              //       method: "POST",
              //       body: file,
              //     }
              //   )

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
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <MDBFile
          ref={inputFileRef}
          name="file"
          label="Select Front iD"
          size="sm"
          id="formFileSm"
          type="file"
          required
          // multiple
        />

        {spinner && <Spinner />}
        <MDBBtn
          className="mt-3 mb-5"
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
      </form>
    </div>
  );
};

export default DriverID;
