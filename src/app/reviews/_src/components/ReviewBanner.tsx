import React from "react";
import { getReviewTitleApi } from "../api";
import { BackdropImage } from "@/components/ui/image";
import { ImageLink } from "@/components/custom/Link";
import { Route } from "next";

export default async function ReviewBanner({
  mediaType,
  params,
}: {
  mediaType: "movie" | "tv";
  params: Promise<{ titleId: string }>;
}) {
  const { titleId } = await params;
  const { backdrop_path, poster_path, title, year } = await getReviewTitleApi({
    mediaType,
    titleId,
  });

  return (
    <div className="scanlines relative isolate min-h-48 border-b">
      <BackdropImage
        alt={title}
        src={backdrop_path}
        className="-z-10 blur-xs brightness-50"
      />

      <div className="flex shrink grow flex-col items-center gap-2 p-2 2xl:flex-row 2xl:items-stretch">
        <ImageLink
          href={`/${mediaType}/${titleId}` as Route}
          alt={title}
          src={poster_path}
          className="4xl:w-52 aspect-2/3 w-32 shrink-0 grow-0 rounded-md border shadow-sm 2xl:w-40"
        />

        <div className="flex flex-col items-center gap-y-1 2xl:items-start">
          <h1>{title}</h1>
          <span className="typography-h4">{year}</span>
        </div>
      </div>
    </div>
  );
}
