"use client";

import { AuthProps } from "@/types/_other/session";
import React from "react";

export const AuthSessionContext = React.createContext<AuthProps | null>(null);

export function AuthSessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: AuthProps;
}) {
  return <AuthSessionContext value={session}>{children}</AuthSessionContext>;
}
