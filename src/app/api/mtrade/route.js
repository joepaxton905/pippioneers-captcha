import { NextResponse } from "next/server";
import connectDB from "@/app/utils/connectdb";
import User from "@/app/models/user";

export async function POST(req) {
    connectDB();
    const data = await req.json();
    const theUser = await User.findOne({ email: data.email });

    // Reverse the order of the placeOder array
    const reversedOrders = [...theUser.placeOder].reverse();

    return NextResponse.json(reversedOrders, { status: 200 });
}