import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { IUser } from "@/types/user";

export async function getUserFromCookie():Promise<IUser | null> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify<IUser>(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET || ""),
    );
    return payload
  } catch {
    return null;
  }
}
