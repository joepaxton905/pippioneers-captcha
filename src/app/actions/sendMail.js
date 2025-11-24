import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// !Important

export async function sendMail(email, subject, html) {
  const transporter = nodemailer.createTransport({
    host:  process.env.DHOST,
    secure: true,

    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.NEXT_PUBLIC_companyName} <${process.env.NEXT_PUBLIC_companyEmail}>`,
    to: email,
    subject: subject,

    html: html,
  });

  console.log("Message sent: %s", info.messageId);
}
