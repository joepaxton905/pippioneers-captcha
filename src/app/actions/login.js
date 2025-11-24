"use server";
import User from "../models/user";
import connectDB from "../utils/connectdb";
import { createCookie } from "./setcookie";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { authUser } from "./authUser";
dotenv.config();
connectDB();
export async function handleLogin(data) {
  const { email, password } = data;

  const user = await User.findOne({ email: email });
  if (!user) {
    return { status: "error", message: "User not found" };
  }

  const userPass = await User.findOne({ password: password });
  if (!userPass) {
    return { status: "error", message: "Invalid Password" };
  }
  if (!user.verifyEmail) {
    return { status: "error", message: "Email not verified" };
  }
  //login
  const logToken = jwt.sign({ email }, process.env.LOGTOKEN);
  const name = "logToken";
  await createCookie(name, logToken);
  await authUser();
  //
  return { status: "ok", message: "Login successful!" };
}
