"use server";
import User from "../models/user";
import connectDB from "../utils/connectdb";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserBalance() {
  try {
    connectDB();
    
    // Get token from cookies
    const cookieStore = cookies();
    const logToken = cookieStore.get("logToken")?.value;
    
    if (!logToken) {
      return { status: "error", message: "User not authenticated" };
    }
    
    // Decode token to get user email
    const decodedToken = jwt.verify(logToken, process.env.LOGTOKEN);
    const email = decodedToken.email;
    
    // Find user in database
    const user = await User.findOne({ email: email });
    if (!user) {
      return { status: "error", message: "User not found" };
    }
    
    // Return total balance
    return { 
      status: "ok", 
      totalBalance: user.totalBalance || 0 
    };
  } catch (error) {
    console.error("Error fetching user balance:", error);
    return { status: "error", message: "Failed to fetch balance" };
  }
} 