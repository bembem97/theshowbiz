import React from "react";
import { TitleProps } from "../../types/call-to-action";
import { AuthProps } from "@/types/_other/session";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignInLink from "@/module/auth/SignInLink";
import WatchlistData from "./WatchlistData";
import FavoriteData from "./FavoriteData";
import WatchedData from "./WatchedData";
import SpinnerProgress from "@/components/custom/SpinnerProgress";

export default async function BookmarkActions({
  mediaType,
  titleId,
  pathname,
  date,
  title,
}: TitleProps) {
  return (
    <React.Suspense fallback={<SpinnerProgress />}>
      <CallToActions
        mediaType={mediaType}
        pathname={pathname}
        date={date}
        titleId={titleId}
        title={title}
      />
    </React.Suspense>
  );
}

async function CallToActions({
  mediaType,
  titleId,
  pathname,
  date,
  title,
}: TitleProps) {
  const year = date ? new Date(date).getFullYear() : null;

  const apiSession: AuthProps | null = await auth.api.getSession({
    headers: await headers(),
  });

  if (!apiSession) {
    return (
      <section className="@container/cta space-y-2">
        <SignInLink className="w-full @xl/cta:w-48" />
        <p className="text-muted-foreground text-sm">
          {
            "Sign In to build your personal library and keep track of what you've seen."
          }
        </p>
      </section>
    );
  }

  const { session } = apiSession;

  return (
    <>
      <WatchlistData
        mediaType={mediaType}
        pathname={pathname}
        title={title}
        titleId={titleId}
        userId={session.userId}
        year={year}
      />
      <FavoriteData
        mediaType={mediaType}
        pathname={pathname}
        title={title}
        titleId={titleId}
        userId={session.userId}
        year={year}
      />
      <WatchedData
        mediaType={mediaType}
        pathname={pathname}
        title={title}
        titleId={titleId}
        userId={session.userId}
        year={year}
      />
    </>
  );
}
