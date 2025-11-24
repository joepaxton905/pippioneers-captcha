"use server";
// import connectDB from "../utils/connectdb";
import User from "@/app/models/user";
// connectDB();

export async function getClients() {
  try {
    const clients = await User.find();

    console.log("///////////////////////////////////////////");
    // const ppp = clients.Object.entries();

    const ooo = JSON.stringify(clients);
    // console.log(ooo);

    // console.log(typeof clients);

    return ooo;
  } catch (error) {
    console.log(error);
  }
}
