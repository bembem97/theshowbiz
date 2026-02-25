import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ReviewItems from "./ReviewItems";

export default async function ReviewsSession() {
  const cookies = await auth.api.getSession({
    headers: await headers(),
  });

  if (!cookies) {
    return redirect("/signin");
  }

  const { session } = cookies;

  return <ReviewItems userId={session.userId} />;
}
