"use server";
import { cookies } from "next/headers";
import User from "@/app/models/user";
import { sendMail } from "@/app/actions/sendMail";
import { Locaa } from "@/app/utils/locaa";

export async function autoProfit(data) {
  //   console.log(data);

  const cookieStore = cookies();
  const email = cookieStore.get("email").value;
  const user = await User.findOne({ email: email });

  const { totalBalance, firstname } = user;

  const nyTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const kkk = Locaa(data.result);
  console.log(kkk);

  const subject = "DTS Trade Result";

  if (data.resulttype === "LOSS") {
    const newBalmi = totalBalance - Number(data.stake);
    console.log(newBalmi);

    const balUpmi = await User.updateOne(
      { email: email },
      {
        $set: { totalBalance: newBalmi },
      }
    );

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DTS Trading Results</title>
  <style>
    body {
      font-family: 'Helvetica', Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f0f0f5;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 30px auto;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border: 2px solid #e0e0e0;
    }
    .header {
      background-color: #007BFF;
      padding: 20px;
      color: white;
      text-align: center;
      border-bottom: 4px solid #0056b3;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 20px;
      color: #444;
    }
    .content h2 {
      color: #007BFF;
      font-size: 22px;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
      margin: 15px 0;
    }
    .details {
      margin: 20px 0;
      background-color: #f9f9f9;
      border-left: 6px solid #007BFF;
      padding: 15px;
      border-radius: 5px;
    }
    .details p {
      margin: 5px 0;
      font-size: 16px;
    }
    .result-status {
      font-size: 24px;
      font-weight: bold;
      margin-top: 20px;
      text-align: center;
    }
    .result-profit {
      color: #28a745;
    }
    .result-loss {
      color: #dc3545;
    }
    .result-stale {
      color: #ffc107;
    }
    .footer {
      background-color: #f0f0f5;
      padding: 15px;
      text-align: center;
      font-size: 12px;
      color: #555;
    }
    .footer a {
      color: #007BFF;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>DTS Auto-Trading Results</h1>
    </div>
    <div class="content">
      <h2>Hi ${firstname},</h2>
      <p>We are pleased to inform you that your recent DTS trading session has concluded. Below are the details of your trade:</p>
      
      <div class="details">
        <p><strong>Date:</strong> ${nyTime}</p>
        <p><strong>Amount Invested:</strong> $${Locaa(data.stake)}</p>
        <p><strong>Trade Result: </strong> ${data.resulttype}</p>
        <p><strong>Total Loss: </strong> -$${Locaa(data.stake)}</p>
      </div>
<p>If you have any questions or would like to discuss your trading strategy, feel free to reach out to our support team. We're here to help you make the most of your investments!</p>
</div>
<div class="footer">
      <p>&copy; 2024 DTS Auto-Trading Bot. All rights reserved.</p>
      <p><a href="#">Unsubscribe</a> | <a
      href="mailto:${
        process.env.NEXT_PUBLIC_companyEmail
      }?subject=Help!&body=Hello,%20I%20would%20like%20to%20talk%20to%20you."
      >Contact Support</a
    ></p>
    </div>
  </div>
</body>
</html>
`;

    const autoProfit = await User.updateOne(
      { email: email },
      {
        $push: {
          autoProfit: {
            result: data.result,
            stake: data.stake,
            resulttype: data.resulttype,
            date: nyTime,
          },
        },
      }
    );

    await sendMail(email, subject, html);
    return true;
  }

  const newBal = Number(data.result) + totalBalance;

  const balUp = await User.updateOne(
    { email: email },
    {
      $set: { totalBalance: newBal },
    }
  );

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DTS Trading Results</title>
  <style>
    body {
      font-family: 'Helvetica', Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f0f0f5;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 30px auto;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border: 2px solid #e0e0e0;
    }
    .header {
      background-color: #007BFF;
      padding: 20px;
      color: white;
      text-align: center;
      border-bottom: 4px solid #0056b3;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 20px;
      color: #444;
    }
    .content h2 {
      color: #007BFF;
      font-size: 22px;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
      margin: 15px 0;
    }
    .details {
      margin: 20px 0;
      background-color: #f9f9f9;
      border-left: 6px solid #007BFF;
      padding: 15px;
      border-radius: 5px;
    }
    .details p {
      margin: 5px 0;
      font-size: 16px;
    }
    .result-status {
      font-size: 24px;
      font-weight: bold;
      margin-top: 20px;
      text-align: center;
    }
    .result-profit {
      color: #28a745;
    }
    .result-loss {
      color: #dc3545;
    }
    .result-stale {
      color: #ffc107;
    }
    .footer {
      background-color: #f0f0f5;
      padding: 15px;
      text-align: center;
      font-size: 12px;
      color: #555;
    }
    .footer a {
      color: #007BFF;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>DTS Auto-Trading Results</h1>
    </div>
    <div class="content">
      <h2>Hi ${firstname},</h2>
      <p>We are pleased to inform you that your recent DTS trading session has concluded. Below are the details of your trade:</p>
      
      <div class="details">
        <p><strong>Date:</strong> ${nyTime}</p>
        <p><strong>Amount Invested:</strong> $${Locaa(data.stake)}</p>
        <p><strong>Trade Result: </strong> ${data.resulttype}</p>
        <p><strong>Total Profit: </strong> $${Locaa(data.result)}</p>
      </div>
<p>If you have any questions or would like to discuss your trading strategy, feel free to reach out to our support team. We're here to help you make the most of your investments!</p>
</div>
<div class="footer">
      <p>&copy; 2024 DTS Auto-Trading Bot. All rights reserved.</p>
      <p><a href="#">Unsubscribe</a> | <a
      href="mailto:${
        process.env.NEXT_PUBLIC_companyEmail
      }?subject=Help!&body=Hello,%20I%20would%20like%20to%20talk%20to%20you."
      >Contact Support</a
    ></p>
    </div>
  </div>
</body>
</html>
`;

  // if (data.resulttype === "PROFIT") { }

  const autoProfit = await User.updateOne(
    { email: email },
    {
      $push: {
        autoProfit: {
          result: data.result,
          stake: data.stake,
          resulttype: data.resulttype,
          date: nyTime,
        },
      },
    }
  );
  await sendMail(email, subject, html);

  return true;
}

// <p>Thank you for trusting DTS with your investments!</p>

// <p>Thank you for choosing DTS for your trading needs. We look forward to your continued success!</p>
//

// <div class="result-status result-[RESULT_TYPE]">[RESULT_MESSAGE]</div>;
