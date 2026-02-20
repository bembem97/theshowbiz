import React from "react";
import CommentInput from "./CommentInput";
import UserReviews from "./UserReviews";
import { auth } from "@/lib/auth";
import { AuthProps } from "@/types/_other/session";
import { headers } from "next/headers";
import { Separator } from "@/components/ui/separator";

export default async function ThreadSession({
  mediaType,
  params,
}: {
  mediaType: "movie" | "tv";
  params: Promise<{
    titleId: string;
  }>;
}) {
  const { titleId } = await params;
  const cookies: AuthProps | null = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="space-y-4 pb-4">
      <div className="px-2">
        <CommentInput
          mediaType={mediaType}
          titleId={Number(titleId)}
          cookies={cookies}
        />
      </div>
      <Separator />
      <div className="px-2">
        <UserReviews
          sessionUserId={cookies ? cookies.session.userId : undefined}
          mediaType={mediaType}
          titleId={Number(titleId)}
        />
      </div>
    </div>
  );
}
