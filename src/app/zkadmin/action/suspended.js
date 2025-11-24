"use server";
import mongoose from "mongoose";
import User from "@/app/models/user";
import { cookies } from "next/headers";
import { sendMail } from "@/app/actions/sendMail";

export async function suspended() {
  const cookieStore = cookies();
  const email = cookieStore.get("email").value;

  const suspended = await User.updateOne(
    { email: email },
    {
      suspendAccount: true,
    }
  );
 const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Security Alert</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
    <div style="padding: 60px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); padding: 40px 40px 30px; text-align: center;">
                <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                    <div style="font-size: 36px;">🔒</div>
                </div>
                <h1 style="color: white; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">Account Temporarily Suspended</h1>
            </div>

            <!-- Content -->
            <div style="padding: 40px;">
                <div style="text-align: center; margin-bottom: 35px;">
                    <p style="font-size: 18px; color: #2c3e50; margin: 0 0 15px; line-height: 1.6; font-weight: 500;">
                        We've temporarily suspended your account access due to security concerns.
                    </p>
                    <p style="font-size: 16px; color: #7f8c8d; margin: 0; line-height: 1.6;">
                        This is a precautionary measure to protect your account and funds. Our support team will help resolve this quickly.
                    </p>
                </div>

                <!-- Action Button -->
                <div style="text-align: center; margin: 35px 0;">
                    <a href="mailto:${process.env.NEXT_PUBLIC_companyEmail || 'support@company.com'}"
                       style="display: inline-block;
                              background: linear-gradient(135deg, #4285f4 0%, #1a73e8 100%);
                              color: white;
                              padding: 16px 32px;
                              text-decoration: none;
                              border-radius: 50px;
                              font-size: 16px;
                              font-weight: 600;
                              box-shadow: 0 4px 15px rgba(66, 133, 244, 0.3);
                              transition: all 0.3s ease;">
                        Contact Support Team
                    </a>
                </div>

                <!-- Info Box -->
                <div style="background: #f8f9fa; border-left: 4px solid #4285f4; padding: 20px; border-radius: 8px; margin: 30px 0;">
                    <h3 style="color: #2c3e50; font-size: 16px; margin: 0 0 10px; font-weight: 600;">What happens next?</h3>
                    <ul style="color: #5a6c7d; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.6;">
                        <li style="margin-bottom: 8px;">Our security team will review your account</li>
                        <li style="margin-bottom: 8px;">You'll receive an update within 24-48 hours</li>
                        <li>Your funds remain secure during this process</li>
                    </ul>
                </div>
            </div>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666;">
            <p style="margin: 0;">This is an automated message from ${process.env.NEXT_PUBLIC_companyName || 'Your Company'}</p>
        </div>
    </div>
</body>
</html>`


  const subject = "Account Security Alert!"

  // Get user data to personalize the email if needed
  const userData = await User.findOne({ email: email });

  // Send the email notification
  await sendMail(email, subject, html);





  return true;
}

export async function unsuspended() {
  const cookieStore = cookies();
  const email = cookieStore.get("email").value;

  const suspended = await User.updateOne(
    { email: email },
    {
      suspendAccount: false,
    }
  );
  return true;
}

// export async function addUsdt() {
//   const cookieStore = cookies();
//   const email = cookieStore.get("email").value;

//   const usdt = await User.updateOne(
//     { email: email },
//     {
//       usdtAddress: "TGiD5qJ5SNdEtbd4qeVnKRrbRmCe935KZS",
//     }
//   );

//   return true;
// }

export async function KdeleteWith() {
  const cookieStore = cookies();


  const email = cookieStore.get("themail").value;
  const theID = cookieStore.get("theID").value;

  const objectId = new mongoose.Types.ObjectId(theID);

  const result = await User.updateOne(
    { email: email }, // Match the user document
    {
      $pull: {
        deposit: { _id: objectId }, // Remove the deposit with the matching _id
      },
    }
  );

  return true;
}

export async function RefundWith(data) {

  const objectId = new mongoose.Types.ObjectId(data.theID);
  const refundAmount = Number(data.WithdrAmount);

  // Get current user data to access totalBalance
  const userData = await User.findOne({ email: data.email });
  const { totalBalance } = userData;

  // Generate timestamp in NY timezone (consistent with app pattern)
  const nyTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  // Update the depositAmount field of the specific deposit
  const result = await User.updateOne(
    { email: data.email, "deposit._id": objectId }, // Match the user document and specific deposit
    {
      $set: {
        "deposit.$.depositAmount": refundAmount, // Update the depositAmount field of the matched deposit
      },
    }
  );

  // Add refund amount to totalBalance
  const newBalance = totalBalance + refundAmount;
  const updateBalance = await User.updateOne(
    { email: data.email },
    {
      $set: { totalBalance: newBalance },
    }
  );

  // Add refund transaction to history
  const addRefundTransaction = await User.updateOne(
    { email: data.email },
    {
      $push: {
        deposit: {
          action: "REFUND",
          depositAmount: refundAmount,
          depositMethod: "Refund",
          nyTime: nyTime,
          status: "Completed",
        },
      },
    }
  );

  return true;

}




export async function approveID() {
  const cookieStore = cookies();
  const email = cookieStore.get("email").value;
  const userName = await User.findOne({ email: email });
  // console.log("YAAAAHHHHH: ", userName);

  const approve = await User.updateOne(
    { email: email },
    {
      id_verification: "Verified",
    }
  );

  const html = `<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KYC Verification Approved</title>
</head>

<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
        style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
                    style="background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td align="center">
                            <h2 style="color: #28a745; margin-bottom: 10px;">KYC Verification Approved ✅</h2>
                            <p style="color: #333; font-size: 16px; margin-bottom: 20px;">Dear <strong>${userName.firstname}</strong>,</p>
                            <p style="color: #555; font-size: 14px; line-height: 1.5;">We are pleased to inform you that
                                your KYC (Know Your Customer) verification has been successfully approved. You now have
                                full access to our platform.</p>

                            <p style="color: #555; font-size: 14px; margin-top: 20px;">If you have any questions, feel
                                free to contact our support team.</p>
                            <p style="color: #333; font-size: 14px; margin-top: 20px;">Best Regards,<br><strong>${process.env.NEXT_PUBLIC_companyName}</strong></p>
                        </td>
                    </tr>
                </table>
                <p style="color: #777; font-size: 12px; margin-top: 10px;">This is an automated message, please do not
                    reply.</p>
            </td>
        </tr>
    </table>
</body>

</html>`
const subject = "KYC Verified"
await sendMail(email, subject, html)



  return true;
}

export async function denyID() {
  const cookieStore = cookies();
  const email = cookieStore.get("email").value;
  const deny = await User.updateOne(
    { email: email },
    {
      id_verification: "Unverified",
    }
  );

  return true;
}

export async function delProfile(id) {
  // console.log("Neewwwww IDDDDDD :",id);
  const objectId = new mongoose.Types.ObjectId(id);
  const Delete = await User.findByIdAndDelete(id);
  return true


}

export async function getCardDetails(email) {
  const theUser = await User.findOne({ email: email });
  // console.log("THE USER::", theUser);


  return theUser
}
