import SpinnerProgress from "@/components/custom/SpinnerProgress";
import React from "react";
import ReviewsSession from "./ReviewsSession";
import { ReviewSearchParamProps } from "@/app/(bookmarks)/reviews/page";

export default async function Reviews({
  searchParams,
}: {
  searchParams: ReviewSearchParamProps;
}) {
  return (
    <React.Suspense fallback={<SpinnerProgress />}>
      <ReviewsSession searchParams={searchParams} />
    </React.Suspense>
  );
}
