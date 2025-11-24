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

    // Calculate the loss amount (lot size * 6) with a negative sign
    const lossAmount = parseFloat((trade.lotSize).toFixed(2));

    // Calculate new balance (current balance - loss amount's absolute value)
    // Note: lossAmount is already negative, so we add it to reduce the balance
    // const newBalance = user.totalBalance - trade.lotSize;

    // Now update the trade with the calculated loss amount and update the user's balance
    const result = await User.updateOne(
      {
        email: email,
        "placeOder._id": tradeId
      },
      {
        $set: {
          "placeOder.$.orderStatus": "Loss",
          "placeOder.$.amountWonOrLost": `-$${Math.abs(trade.lotSize)}`,
          // totalBalance: newBalance
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
    const emailSubject = "Trade Completed - Loss Incurred";
    const emailHtml = `
      <html>
        <body>
          <h2>Trade Outcome Notification 📊</h2>
          <p>Your recent trade has resulted in a loss.</p>
          <ul>
            <li><strong>Trade ID:</strong> ${tradeId}</li>
            <li><strong>Loss Amount:</strong> $${Math.abs(trade.lotSize)}</li>
            <li><strong>Balance:</strong> $${user.totalBalance.toFixed(2)}</li>
          </ul>
          <p>We recommend reviewing your trading strategy and risk management.</p>
          <p>Thank you for your continued trust.</p>
        </body>
      </html>
    `;

    await sendMail(email, emailSubject, emailHtml).catch(error => {
      console.error("Failed to send trade completion email:", error);
    });

    return NextResponse.json({
      success: true,
      message: "Trade marked as Loss successfully"
    }, { status: 200 });

  } catch (error) {
    console.error("Error processing trade as loss:", error);
    return NextResponse.json({
      success: false,
      message: "Server error"
    }, { status: 500 });
  }
}