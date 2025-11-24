"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "../models/user";
import connectDB from "../utils/connectdb";
import { authUser } from "./authUser";
import { sendMail } from "./sendMail";
connectDB();

// Function to send order confirmation email
async function sendOrderConfirmationEmail(userData, orderDetails) {
  const { email } = userData;
  const {
    lotSize,
    CurrencyPair,
    execution,
    price,
    stopLoss,
    takeProfit,
    expiration,
    formattedDate
  } = orderDetails;

  const subject = `Order Confirmation for ${CurrencyPair}`;
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>Order Confirmation</h2>
      <p>Dear Valued Client,</p>
      <p>Your order has been successfully placed with the following details:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Currency Pair:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${CurrencyPair}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Invested Amount:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${lotSize}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Execution Type:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${execution}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Entry Price:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${price}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Stop Loss:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${stopLoss}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Take Profit:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${takeProfit}</td>
        </tr>

        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Order Date:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${formattedDate}</td>
        </tr>
      </table>
      <p style="margin-top: 20px;">Thank you for your trade. We appreciate your business!</p>
      <p style="color: #888; font-size: 0.8em;">This is an automated email. Please do not reply.</p>
    </body>
    </html>
  `;

  try {
    await sendMail(email, subject, html);
    console.log(`Order confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
  }
}

export async function placeOrder(data) {
  const { userData } = await authUser();
  const { totalBalance, email, profitorloss } = userData;

  const {
    lotSize,
    CurrencyPair,
    execution,
    price,
    stopLoss,
    takeProfit,
    expiration,
  } = data;

  // console.log("Pnllllllllllllllllllllllll", takeProfit);


  if (totalBalance < lotSize) {
    return { message: "Insufficient Balance", status: "error" };
  }

  if (!lotSize || !price || !CurrencyPair || !execution) {
    return { message: "Invalid Order", status: "error" };
  }

  if (isNaN(price) || isNaN(stopLoss) || isNaN(takeProfit)) {
    return { message: "Invalid Order", status: "error" };
  }

  const date = new Date();
  const formattedDate = date.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const tradeHistory = await User.updateOne(
    { email: email },
    {
      $push: {
        placeOder: {
          lotSize: lotSize,
          CurrencyPair: CurrencyPair,
          execution: execution,
          price: price,
          stopLoss: stopLoss,
          takeProfit: takeProfit,
          expiration: expiration,
          date: formattedDate,
          orderStatus: "Pending",
          amountWonOrLost: "Pending",
        },
      },
    }
  );

  const user_balance = totalBalance - lotSize;
  const updateBal = await User.updateOne(
    { email: email },
    { $set: { totalBalance: user_balance } }
  );

  // Send order confirmation email
  await sendOrderConfirmationEmail(userData, {
    ...data,
    formattedDate
  });

  return { message: "Order placed successfully!", status: "ok" };
}
