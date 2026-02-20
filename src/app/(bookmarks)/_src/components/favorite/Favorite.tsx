import SpinnerProgress from "@/components/custom/SpinnerProgress";
import React from "react";
import FavoriteSession from "./FavoriteSession";

export default async function Favorite() {
  return (
    <React.Suspense fallback={<SpinnerProgress />}>
      <FavoriteSession />
    </React.Suspense>
  );
}
