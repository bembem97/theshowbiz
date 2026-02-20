import SpinnerProgress from "@/components/custom/SpinnerProgress";
import React from "react";
import WatchlistSession from "./WatchlistSession";

export default async function Watchlist() {
  return (
    <React.Suspense fallback={<SpinnerProgress />}>
      <WatchlistSession />
    </React.Suspense>
  );
}
