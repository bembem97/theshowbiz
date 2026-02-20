import SpinnerProgress from "@/components/custom/SpinnerProgress";
import React from "react";
import RatingsSession from "./RatingsSession";

export default async function Ratings() {
  return (
    <React.Suspense fallback={<SpinnerProgress />}>
      <RatingsSession />
    </React.Suspense>
  );
}
