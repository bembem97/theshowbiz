import { signIn } from "@/lib/auth-client";

export const signInGoogle = async (pathname: string) => {
  await signIn.social({
    provider: "google",
    callbackURL: decodeURIComponent(pathname),
  });
};
