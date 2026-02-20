import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import WatchedItems from "./WatchedItems";
import { redirect } from "next/navigation";

export default async function WatchedSession() {
  const cookies = await auth.api.getSession({
    headers: await headers(),
  });

  if (!cookies) {
    return redirect("/signin");
  }

  const { session } = cookies;

  return <WatchedItems userId={session.userId} />;
}
