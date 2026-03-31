"use server";

import { auth0 } from "./auth";

export async function getAccessToken() {
  return await auth0.getAccessToken();
}
