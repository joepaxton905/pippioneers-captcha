"use server";
import User from "../models/user";
import { authUser } from "./authUser";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function LoggedFinalChangePassword(data) {
  const { newPassword, confirmNewPassword } = await data;

  // console.log(data);

  const cookieStore = cookies();

  const logToken = cookieStore.get("logToken").value;
  // console.log(codeToken);

  const { email } = jwt.verify(logToken, process.env.LOGTOKEN);

  if (!email) {
    return { status: "error", message: "Unauthorized" };
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
