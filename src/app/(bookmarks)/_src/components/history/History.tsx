import SpinnerProgress from "@/components/custom/SpinnerProgress";
import React from "react";
import HistorySession from "./HistorySession";

export default async function History() {
  return (
    <React.Suspense fallback={<SpinnerProgress />}>
      <HistorySession />
    </React.Suspense>
  );
}
