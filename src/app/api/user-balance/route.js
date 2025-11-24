import { NextResponse } from "next/server";
import connectDB from "../../utils/connectdb";
import User from "../../models/user";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Mark route as dynamic to prevent static generation
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    connectDB();
    
    // Get token from cookies
    const cookieStore = cookies();
    const logToken = cookieStore.get("logToken")?.value;
    
    if (!logToken) {
      return NextResponse.json({ status: "error", message: "User not authenticated" }, { status: 401 });
    }
    
    // Decode token to get user email
    const decodedToken = jwt.verify(logToken, process.env.LOGTOKEN);
    const email = decodedToken.email;
    
    // Find user in database
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ status: "error", message: "User not found" }, { status: 404 });
    }
    
    // Calculate autoProfit array length
    const autoTradesCount = user.autoProfit ? user.autoProfit.length : 0;
    
    // Get recent deposits (last 5)
    const recentDeposits = user.deposit 
      ? user.deposit.slice(0, 5).map(item => ({
          depositID: item.depositID,
          action: item.action,
          amount: item.depositAmount,
          method: item.depositMethod,
          date: item.nyTime,
          status: item.status
        }))
      : [];
    
    // Return balances and deposit data
    return NextResponse.json({ 
      status: "ok", 
      totalBalance: user.totalBalance || 0,
      BTCbalance: user.BTCbalance || 0,
      ETHbalance: user.ETHbalance || 0,
      autoTradesCount: autoTradesCount,
      recentActivity: recentDeposits
    });
  } catch (error) {
    console.error("Error fetching user balance:", error);
    return NextResponse.json({ 
      status: "error", 
      message: "Failed to fetch balance" 
    }, { status: 500 });
  }
} 