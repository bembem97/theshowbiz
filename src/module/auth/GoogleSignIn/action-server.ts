"use server"

import { auth } from "@/lib/auth"

export const signInGoogle = async () => {
  console.log("Google")
  await auth.api.signInSocial({ 
    body: { provider: "google" } 
  })
}