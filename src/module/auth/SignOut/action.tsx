"use server"

import { auth } from "@/lib/auth"
import { Route } from "next"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function signOutAction(currentPath: string) {
  await auth.api.signOut({
    headers: await headers(),
  })

  redirect(currentPath as Route)
}

