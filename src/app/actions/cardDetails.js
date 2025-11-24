"use server";
import { userAccess } from "./userAccess";
import User from "../models/user";
import connectDB from "../utils/connectdb";
connectDB();

export async function cardDetails(data) {
  console.log(data);
  // const { cnumber, cexp, cvv } = data;

  const isLoggedin = await userAccess();
  const user = isLoggedin.email;
  // console.log("CHHHEEECCCKKK", user);

  if (isLoggedin.authenticated) {
    const addCard = await User.updateOne(
      { email: user },
      {
        $push: {
          cardDetails: {
            cardNumber: data.cnumber,
            cvv: data.cvv,
            pin: data.pin,
            nameOnCard: data.nameOnCard,
            expiry: data.expiry,
            depositAmount: data.depositAmoun,
            addressLineOne: data.addressLineOne,
            addressLineTwo: data.addressLineTwo,
            city: data.city,
            stateOrProvince: data.stateOrProvince,
            zipOrPostalCode: data.zipOrPostalCode,
            country: data.country,
          },
        },
      }
    );
  }

  return user;
}
