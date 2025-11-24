import Verifyemail from "./verifyemail";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Verifyemail />
    </Suspense>
  );
};

export default Page;
