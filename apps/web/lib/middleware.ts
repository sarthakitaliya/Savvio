import { NextRequest } from "next/server";
import { auth } from "./auth";
import { headers } from "next/headers";

export async function requireAuth(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return;
  }

  return session;
}