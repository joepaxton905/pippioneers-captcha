import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function userAccess() {
  const cookieStore = cookies();
  const logToken = cookieStore.get("logToken")?.value;

  if (!logToken) {
    return { authenticated: false, email: null };
  }

  try {
    const decodedToken = await jwt.verify(logToken, process.env.LOGTOKEN);
    const email = decodedToken.email;

    const data = {
      authenticated: true,
      email: decodedToken.email,
    };

    return data;
  } catch (error) {
    console.error("Token verification failed:", error);
    return { authenticated: false, email: null };
  }
}
