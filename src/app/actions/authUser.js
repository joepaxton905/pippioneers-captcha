"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "../models/user";
import connectDB from "../utils/connectdb";
import qrcode from "qrcode";
import { userAccess } from "./userAccess";
connectDB();
export async function authUser() {
  const cookieStore = cookies();
  const logToken = cookieStore.get("logToken")?.value;

  if (!logToken) {
    throw new Error("No authentication token found");
  }

  const loggedInUser = await jwt.verify(logToken, process.env.LOGTOKEN).email;
  // console.log(loggedInUser);

  const ddttaa = await User.findOne({ email: loggedInUser });

  if (!ddttaa) {
    throw new Error("User not found");
  }

  const userData = ddttaa.toObject();

  //   console.log(ddttaa);
  const { BTCaddress, ETHaddress, usdtAddress } = userData;

  // Generate QR codes only if addresses exist
  const generateQRCode = async (address) => {
    if (!address) return null;
    try {
      return await new Promise((resolve, reject) => {
        qrcode.toDataURL(
          address,
          { errorCorrectionLevel: "H" },
          function (err, data) {
            if (err) reject(err);
            else resolve(data);
          }
        );
      });
    } catch (error) {
      console.error("Error generating QR code:", error);
      return null;
    }
  };

  const [qrCode, ethqrCode, usdtqrCode] = await Promise.all([
    generateQRCode(BTCaddress),
    generateQRCode(ETHaddress),
    generateQRCode(usdtAddress)
  ]);

  return {
    userData: userData,
    qrCode,
    ethqrCode,
    usdtqrCode,
  };
  // return userData, qrCode, ethqrCode;
}
