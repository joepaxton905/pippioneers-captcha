"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "../models/user";
import connectDB from "../utils/connectdb";
connectDB();
export async function verifyEmail(code) {
  console.log(code);
  const cookieStore = cookies();
  const codeToken = cookieStore.get("codeToken").value;
  // console.log(codeToken);

  if (!codeToken) {
    return { status: "error", message: "Invalid token" };
  }

  if (!code) {
    return {
      status: "error",
      message: "Enter verification code",
    };
  }

  const { code: verification_code, email } = jwt.verify(
    codeToken,
    process.env.codeToken
  );

  if (code !== verification_code) {
    return { status: "error", message: "Invalid verification code" };
  }

  const updateEmail = await User.updateOne(
    { email: email },
    {
      verifyEmail: true,
    }
  );

  return { status: "ok", message: "Verified" };
}
