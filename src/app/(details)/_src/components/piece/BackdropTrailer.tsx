import { ImageLink } from "@/components/custom/Link";
import { TrailerProps } from "@/module/gallery/types";
import { Route } from "next";

interface BackdropTrailerProps {
  title: string;
  backdrop_path: string;
  media_type: "movie" | "tv";
  id: number;
  trailer: TrailerProps | undefined;
}

export default function BackdropTrailer({
  backdrop_path,
  id,
  media_type,
  title,
  trailer,
}: BackdropTrailerProps) {
  const getPathname = backdrop_path.split("/");
  const pathname = getPathname[getPathname.length - 1];
  if (!trailer || Object.keys(trailer).length === 0)
    return (
      <ImageLink
        alt={title}
        src={backdrop_path}
        href={
          `/${media_type}/${id}${pathname === "backdrop.png" ? "/images" : `/imageviewer${pathname}`}` as Route
        }
      />
    );

  return (
    <ImageLink
      alt={title}
      src={backdrop_path}
      href={`/${media_type}/${id}/video/${trailer.key}` as Route}
    />
  );
}
