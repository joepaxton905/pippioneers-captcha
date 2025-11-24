import { NextResponse } from "next/server";
import User from "@/app/models/user";
import connectDB from "@/app/utils/connectdb";

export async function POST(req) {
    connectDB();
    const data = await req.json();
    const theUser = await User.findOne({ email: data.email });



    return NextResponse.json(theUser.cardDetails, { status: 200 });
}