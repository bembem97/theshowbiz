import React from "react";
import getCreditsAPI from "../lib/getCreditsAPI";
import Identity from "./Identity";
import SpinnerProgress from "@/components/custom/SpinnerProgress";
import AllCredits from "./AllCredits";

interface CelebrityDetailsProps {
  params: Promise<{ starId: string }>;
}

export default async function CelebrityDetails({
  params,
}: CelebrityDetailsProps) {
  const { starId } = await params;
  const { identity, knownFor } = await getCreditsAPI(starId);

  return (
    <>
      <Identity identity={identity} knownFor={knownFor} />

      <React.Suspense fallback={<SpinnerProgress />}>
        <AllCredits params={params} />
      </React.Suspense>
    </>
  );
}
