import { MDBSpinner } from "mdb-react-ui-kit";

export default function Spinner() {
  return (
    <div className="text-center">
      <MDBSpinner grow color="primary">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    </div>
  );
}
