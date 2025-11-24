"use server";
import User from "../models/user";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Locaa } from "../utils/locaa";
import { sendMail } from "./sendMail";

export async function Withdraw(data) {
  console.log(data);
  const cookieStore = cookies();
  const logToken = cookieStore.get("logToken").value;
  const loggedInUser = await jwt.verify(logToken, process.env.LOGTOKEN).email;
  const ddttaa = await User.findOne({ email: loggedInUser });

  const { WithdrawAmount, theRemit, WithdrawAddress } = data;

  console.log(WithdrawAmount);

  if (!WithdrawAmount || !theRemit || !WithdrawAddress) {
    return false;
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Withdrawal Pending</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #FFA500; text-align: center;">Withdrawal Pending</h2>
        <p style="font-size: 16px; color: #333333;">Dear ${
          ddttaa.firstname
        },</p>
        <p style="font-size: 16px; color: #333333;">We have received your withdrawal request of <strong>$${Locaa(
          data.WithdrawAmount
        )}</strong>. Your request is currently being processed and is pending confirmation.</p>
        <p style="font-size: 16px; color: #333333;">Please allow some time for the processing to complete. If you have any questions or need assistance, feel free to contact our support team.</p>
        <p style="font-size: 16px; color: #333333;">Thank you for your patience!</p>
        <p style="font-size: 16px; color: #333333;">Best regards,</p>
        <p style="font-size: 16px; color: #333333;">${
          process.env.NEXT_PUBLIC_companyName
        }</p>
        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;">
        <p style="font-size: 12px; color: #888888; text-align: center;">This is an automated message, please do not reply.</p>
    </div>
</body>
</html>
`;

  const subject = "Withdrawal Pending";

  await sendMail(loggedInUser, subject, html);

  const newBalance = ddttaa.totalBalance - data.WithdrawAmount * 1;

  const newBalanceStr = await User.updateOne(
    { email: loggedInUser },
    {
      $set: { totalBalance: newBalance },
    }
  );

  const update = await User.updateOne(
    { email: loggedInUser },
    {
      $push: {
        deposit: {
          action: "WITHDRAW",
          depositAmount: data.WithdrawAmount,
          depositMethod: data.WithdrawAddress,
          theRemit: data.theRemit,
          nyTime: data.nyTime,
          status: "Pending",
        },
      },
    }
  );

  return true;
}
// data.WithdrawAmount
