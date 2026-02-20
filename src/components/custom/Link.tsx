import { BackdropImage } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { TrailerProps } from "@/module/gallery/types";
import { PlayIcon } from "lucide-react";
import { Route } from "next";

export function ImageLink({
  className,
  href,
  src,
  alt,
  ...props
}: { src: string; alt: string } & React.ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      href={href}
      className={cn(
        "group scanlines hover:flicker isolate inline-grid overflow-clip rounded-md border",
        className,
      )}
    >
      <BackdropImage
        src={src}
        alt={alt}
        className="transition-all group-hover:scale-105 group-hover:brightness-75 group-hover:grayscale-75"
      />
    </Link>
  );
}

export function ButtonTrailer({
  media_type,
  titleId,
  trailer,
  ...props
}: {
  media_type: "movie" | "tv";
  titleId: number;
  trailer: TrailerProps | null;
} & React.ComponentProps<typeof Button>) {
  if (!trailer) {
    return null;
  }

  return (
    <Button
      data-slot="trailer-button"
      nativeButton={false}
      render={
        <Link
          href={`/${media_type}/${titleId}/video/${trailer.key}` as Route}
        />
      }
      variant="outline"
      {...props}
    >
      <PlayIcon />
      Trailer
    </Button>
  );
}
