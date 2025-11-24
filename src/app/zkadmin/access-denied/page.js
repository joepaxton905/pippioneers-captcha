"use client";
import { useRouter } from "next/navigation";

import Link from "next/link";

export default function AccessDenied() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className=" text-center p-8 max-w-md rounded-lg bg-white" style={{width: "90%", margin: "auto"}}>

        <h1 className="mt-5 text-3xl font-bold text-gray-900 mb-3">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          aye, your package nor carry this feature. you gats upgrade if you want am.
        </p>
        <button onClick={() => router.push("/zkadmin/zkprofile")} className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Back</button>
      </div>
    </div>
  );
}
