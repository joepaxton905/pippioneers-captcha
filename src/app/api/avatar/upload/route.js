"use server";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { userAccess } from "@/app/actions/userAccess";
import User from "@/app/models/user";
import connectDB from "@/app/utils/connectdb";

export async function POST(request) {
  connectDB();
  const isLoggedin = await userAccess();
  const user = isLoggedin.email;

  if (user) {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    // ⚠️ The below code is for App Router Route Handlers only
    const blob = await put(filename, request.body, {
      access: "public",
    });

    // console.log(blob.url);

    const Buser = await User.findOne({ email: user });

    if (Buser.idPhoto1 != "") {
      const addCard = await User.updateOne(
        { email: user },
        {
          $set: {
            // idPhoto1: blob.url,
            idPhoto2: blob.url,
          },
        }
      );
      return NextResponse.json(blob);
    }

    const addCard = await User.updateOne(
      { email: user },
      {
        $set: {
          idPhoto1: blob.url,
          // idPhoto2: blob.url,
        },
      }
    );

    // return "Verification pending";
    return NextResponse.json(blob);
    //   return {status:"ok", message:"ID upload successful"}
  }
}
