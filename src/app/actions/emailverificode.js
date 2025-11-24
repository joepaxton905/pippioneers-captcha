"use server";
import shortid from "short-id";
import { createCookie } from "./setcookie";
import { sendMail } from "./sendMail";
import jwt from "jsonwebtoken";

export async function emailVerifiCode(email) {
  const code = shortid.generate();
  console.log(code);

  const codeToken = jwt.sign({ code, email }, process.env.codeToken);
  const name = "codeToken";
  await createCookie(name, codeToken);
  const html = `
           <!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 30px;
            color: #333;
        }
        .message-container {
            background-color: #fff;
            border-radius: 10px;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
        }
        .code {
            font-weight: bold;
            color: #2d7ff9;
        }
        .expire-note {
            font-style: italic;
            font-size: 0.9em;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="message-container">
        <p>Please authenticate your account using the given code:</p>
        <p class="code">${code}</p>
        <p class="expire-note">Please note that this code will expire after five hours.</p>
        <p>Sincerely,</p>
        <p>${process.env.NEXT_PUBLIC_companyName}</p>
    </div>
</body>
</html>
 
            `;

  const subject = "Email Verification";
  await sendMail(email, subject, html);

  return { status: "ok", message: "Email verification code sent" };
}
