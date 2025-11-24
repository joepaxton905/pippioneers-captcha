"use server";
import User from "../models/user";
import { emailVerifiCode } from "./emailverificode";
import emailValidator from "email-validator";
import connectDB from "../utils/connectdb";
import { FinalChangePassword } from "./changePasswordBckEnd";
connectDB();

export async function ForgotPasswordEmail(email) {
  const user = await User.findOne({ email: email });
  // console.log(user);

  const bozzaa = user?.email;
  if (!bozzaa) {
    return { status: "error", message: "User not found" };
  }

  const response = await emailVerifiCode(bozzaa);

  return {
    status: "ok",
    email: bozzaa,
    message: "Email verification code sent!",
  };
}
