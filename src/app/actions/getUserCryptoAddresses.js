"use server";

import connectDB from '../utils/connectdb';
import User from "../models/user";

export async function getUserCryptoAddresses(email, password) {
  try {
    // Connect to database
    await connectDB();

    // Find user by email and password
    const user = await User.findOne({ email, password });

    // Check if user exists
    if (!user) {
      return {
        status: "error",
        message: "Invalid credentials or user not found"
      };
    }

    // Return crypto addresses
    return {
      status: "ok",
      BTCaddress: user.BTCaddress,
      usdtAddress: user.usdtAddress
    };
  } catch (error) {
    console.error("Error fetching crypto addresses:", error);
    return {
      status: "error",
      message: "An unexpected error occurred"
    };
  }
}