import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import FavoriteItems from "./FavoriteItems";
import { redirect } from "next/navigation";

export default async function FavoriteSession() {
  const cookies = await auth.api.getSession({
    headers: await headers(),
  });

  if (!cookies) {
    return redirect("/signin");
  }

  const { session } = cookies;

  return <FavoriteItems userId={session.userId} />;
}
