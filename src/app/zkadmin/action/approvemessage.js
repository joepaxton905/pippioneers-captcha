"use server";
import { sendMail } from "@/app/actions/sendMail";
import User from "@/app/models/user";
import { Locaa } from "@/app/utils/locaa";
export async function approvemessage(data) {
  console.log(data);

  const userData = await User.findOne({ email: data.email });
  const { totalBalance } = userData;

  console.log(totalBalance);
  console.log(data.WithdrAmount);

  const user_balance = totalBalance - Number(data.WithdrAmount);
  const updateBal = await User.updateOne(
    { email: data.email },
    { $set: { totalBalance: user_balance } }
  );

  const filter = {
    email: data.email,
    "deposit._id": data.theID,
  };

  const update = {
    $set: {
      "deposit.$.status": "Approved", // Update the date field using the positional operator
    },
  };

  const options = { new: true }; // Return the modified document

  const result = await User.findOneAndUpdate(filter, update, options);
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Withdrawal Successful</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color:rgb(13, 0, 255); text-align: center;">Withdrawal Successful</h2>
        <p style="font-size: 16px; color: #333333;">Dear ${data.name},</p>
        <p style="font-size: 16px; color: #333333;">We are pleased to inform you that your withdrawal of <strong>$${Locaa(
          data.WithdrAmount
        )}</strong> has been successfully processed and transferred to your account.</p>
        <p style="font-size: 16px; color: #333333;">If you have any questions or concerns, feel free to contact our support team.</p>
        <p style="font-size: 16px; color: #333333;">Thank you for using our service!</p>
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
  await sendMail(data.email, "Withdrawal Approved", html);

  return true;
}
