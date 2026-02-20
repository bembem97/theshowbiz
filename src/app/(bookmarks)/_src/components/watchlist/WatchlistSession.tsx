import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import WatchlistItems from "./WatchlistItems";
import { redirect } from "next/navigation";

export default async function WatchlistSession() {
  const cookies = await auth.api.getSession({
    headers: await headers(),
  });

  if (!cookies) {
    return redirect("/signin");
  }

  const { session } = cookies;

  return <WatchlistItems userId={session.userId} />;
}
