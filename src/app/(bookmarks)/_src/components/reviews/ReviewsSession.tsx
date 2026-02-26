import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ReviewItems from "./ReviewItems";
import { ReviewSearchParamProps } from "@/app/(bookmarks)/reviews/page";

export default async function ReviewsSession({
  searchParams,
}: {
  searchParams: ReviewSearchParamProps;
}) {
  const cookies = await auth.api.getSession({
    headers: await headers(),
  });

  if (!cookies) {
    return redirect("/signin");
  }

  const { session } = cookies;

  return <ReviewItems searchParams={searchParams} userId={session.userId} />;
}
