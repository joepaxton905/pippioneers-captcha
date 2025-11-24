"use server";
import User from "@/app/models/user";
import { cookies } from "next/headers";
import { sendMail } from "@/app/actions/sendMail";
export async function withDeny(data) {
  const filter = {
    email: data.temail,
    "deposit._id": data.theID,
  };

  const update = {
    $set: {
      "deposit.$.status": "Failed", // Update the date field using the positional operator
    },
  };

  const options = { new: true }; // Return the modified document

  const result = await User.findOneAndUpdate(filter, update, options);
  //   console.log(result);
  await sendMail(data.temail, "Withdrawal Failed", data.value);
  return true;
}
