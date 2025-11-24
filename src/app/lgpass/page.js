import Lgpass from "./lgpass";
import { Suspense } from "react";
const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Lgpass />
    </Suspense>
  );
};

export default Page;
