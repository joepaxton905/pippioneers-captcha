"use server";
import User from "@/app/models/user";

export async function withReq() {
  const clients = await User.find({}, "firstname email deposit -_id").lean();
  // console.log(clients);

  return clients;
}
