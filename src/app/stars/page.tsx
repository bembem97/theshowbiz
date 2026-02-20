import React from "react";
import SpinnerProgress from "@/components/custom/SpinnerProgress";
import { Metadata } from "next";
import Celebrities from "./_src/components/Celebrities";

export const metadata: Metadata = {
  title: "Celebrities",
  description: "Here's a list of celebrities",
};

export default async function StarsPage({ searchParams }: PageProps<"/stars">) {
  const urlQuery = searchParams.then((query) => ({ page: query.page }));

  return (
    <>
      <React.Suspense fallback={<SpinnerProgress />}>
        <Celebrities totalPages={500} query={urlQuery} />
      </React.Suspense>
    </>
  );
}
