"use server";
import User from "../models/user";
import { authUser } from "./authUser";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function FinalChangePassword(data) {
  const { code, newPassword, confirmNewPassword } = await data;

  // console.log(data);

  const cookieStore = cookies();
  const codeToken = cookieStore.get("codeToken").value;
   const logToken = cookieStore.get("codeToken").value;
  // console.log(codeToken);

  if (!codeToken || !logToken) {
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

  if (!newPassword || !confirmNewPassword) {
    return { status: "error", message: "Fill in required details" };
  }

  if (newPassword != confirmNewPassword) {
    return { status: "error", message: "Passwords do not match" };
  }

  if (newPassword.length < 6) {
    return { message: "Passwords should be 6 chars long", status: "error" };
  }

  const resetPass = await User.updateOne(
    { email: email },
    { $set: { password: newPassword } }
  );

  return { status: "ok", message: "Password successfully changed!" };
}
