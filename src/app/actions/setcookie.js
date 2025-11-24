"use server";
import { cookies } from "next/headers";
export async function createCookie(name, value) {
  cookies().set({
    name: name,
    value: value,
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}
