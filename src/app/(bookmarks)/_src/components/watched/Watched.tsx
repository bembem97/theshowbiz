import SpinnerProgress from "@/components/custom/SpinnerProgress";
import React from "react";
import WatchedSession from "./WatchedSession";

export default async function Watched() {
  return (
    <React.Suspense fallback={<SpinnerProgress />}>
      <WatchedSession />
    </React.Suspense>
  );
}
