import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import RatingItems from "./RatingItems";
import { redirect } from "next/navigation";

export default async function RatingsSession() {
  const cookies = await auth.api.getSession({
    headers: await headers(),
  });

  if (!cookies) {
    return redirect("/signin");
  }

  const { session } = cookies;

  return <RatingItems userId={session.userId} />;
}
