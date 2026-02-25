import SpinnerProgress from "@/components/custom/SpinnerProgress";
import React from "react";
import ReviewsSession from "./ReviewsSession";

export default async function Reviews() {
  return (
    <React.Suspense fallback={<SpinnerProgress />}>
      <ReviewsSession />
    </React.Suspense>
  );
}
