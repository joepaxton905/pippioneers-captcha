"use server";
import User from "@/app/models/user";
import { Locaa } from "@/app/utils/locaa";
import { sendMail } from "@/app/actions/sendMail";
import { cookies } from "next/headers";

export async function zkprofilend(email) {
  // console.log(email);

  const aaaa = await User.findOne({ email: email });
  // console.log(myuser.firstname);

  const myuser = aaaa.toObject();

  return myuser;
}

export async function clientDeposit(data) {
  const cookieStore = cookies();
  const email = cookieStore.get("email").value;
  console.log(email);
  console.log(data);

  // console.log(data.depositAmount);

  // const email = data.email;
  const aaaa = await User.findOne({ email: email });
  const { firstname, totalBalance } = aaaa;

  const depositHistory = await User.updateOne(
    { email: email },
    {
      $push: {
        deposit: {
          action: "DEPOSIT",
          depositAmount: Locaa(data.depositAmount),
          depositMethod: data.depositMethod,
          nyTime: data.nyTime,
          status: "completed",
        },
      },
    }
  );

  const newBalance = totalBalance + data.depositAmount * 1;

  const newBalanceStr = await User.updateOne(
    { email: email },
    {
      $set: { totalBalance: newBalance },
    }
  );

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deposit Successful</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #4CAF50; text-align: center;">Deposit Successful</h2>
        <p style="font-size: 16px; color: #333333;">Hello ${firstname},</p>
        <p style="font-size: 16px; color: #333333;">We are pleased to inform you that your deposit of <strong>$${Locaa(
          data.depositAmount
        )}</strong> has been successfully processed.</p>
        <p style="font-size: 16px; color: #333333;">Thank you for choosing our service!</p>
        <p style="font-size: 16px; color: #333333;">Best regards,</p>
        <p style="font-size: 16px; color: #333333;">${
          process.env.NEXT_PUBLIC_companyName
        }</p>
        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;">
        <p style="font-size: 12px; color: #888888; text-align: center;"><i>This is an automated message, please do not reply.</i></p>
    </div>
</body>
</html>`;

  const subject = "Deposit Confirmation";
  await sendMail(email, subject, html);

  return true;
}
