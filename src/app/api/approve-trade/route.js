import { NextResponse } from "next/server";
import User from "@/app/models/user";
import connectDB from "@/app/utils/connectdb";
import { sendMail } from "@/app/actions/sendMail";

connectDB();

export async function POST(req) {
  try {
    const { email, tradeId } = await req.json();

    if (!email || !tradeId) {
      return NextResponse.json({
        success: false,
        message: "Email and trade ID are required"
      }, { status: 400 });
    }

    // First, find the trade to get its lot size
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found"
      }, { status: 404 });
    }

    // Find the specific trade in the user's placeOder array
    const trade = user.placeOder.find(order => order._id.toString() === tradeId);

    if (!trade) {
      return NextResponse.json({
        success: false,
        message: "Trade not found"
      }, { status: 404 });
    }

    // Calculate the profit amount (lot size * 6)
    const profitAmount = parseFloat((trade.takeProfit).toFixed(2));

    // Calculate new balance (current balance + profit)
    const newBalance = user.totalBalance + profitAmount;

    // Now update the trade with the calculated profit amount and update the user's balance
    const result = await User.updateOne(
      {
        email: email,
        "placeOder._id": tradeId
      },
      {
        $set: {
          "placeOder.$.orderStatus": "Profit",
          "placeOder.$.amountWonOrLost": `$${profitAmount}`,
          totalBalance: newBalance
        }
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({
        success: false,
        message: "Trade not found or already processed"
      }, { status: 404 });
    }

    // Send email notification about successful trade
    const emailSubject = "Trade Completed Successfully - Profit Earned!";
    const emailHtml = `
      <html>
        <body>
          <h2>Congratulations! 🎉</h2>
          <p>Your trade has been successfully completed and resulted in a profit.</p>
          <ul>
            <li><strong>Trade ID:</strong> ${tradeId}</li>
            <li><strong>Profit Amount:</strong> $${profitAmount}</li>
            <li><strong>New Balance:</strong> $${newBalance.toFixed(2)}</li>
          </ul>
          <p>Thank you for trading with us!</p>
        </body>
      </html>
    `;

    await sendMail(email, emailSubject, emailHtml).catch(error => {
      console.error("Failed to send trade completion email:", error);
    });




    return NextResponse.json({
      success: true,
      message: "Trade marked as Profit successfully"
    }, { status: 200 });

  } catch (error) {
    console.error("Error processing trade as profit:", error);
    return NextResponse.json({
      success: false,
      message: "Server error"
    }, { status: 500 });
  }
}