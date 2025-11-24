"use server";
import { createCookie } from "@/app/actions/setcookie";
// import User from "@/app/models/user";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
import { handleLogin } from "@/app/actions/login";
// import connectDB from "@/app/utils/connectdb";
// connectDB();

export async function zkLogin(data) {
  const email = data.email;
  // const password = data.password

  if (process.env.bossEmail !== data.email) {
    return { status: "error", message: "fvck off! if you aint my boss!" };
  }

  if (process.env.bossPassword !== data.password) {
    return { status: "error", message: "wrong password! fvck off!" };
  }

  const logToken = jwt.sign({ email }, process.env.LOGTOKEN);
  const name = "logToken";
  await createCookie(name, logToken);

  // const Ldata = {email, password}
  // await handleLogin(Ldata)

  const name1 = "bossToken";
  const bossToken = jwt.sign({ email }, process.env.bossEmail);
  await createCookie(name1, bossToken);



  return true;
}
