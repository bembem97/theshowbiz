import { BackdropImage } from "@/components/ui/image";
import { HeroProps } from "../types";
import { DateBadge, MediaTypeBadge } from "@/components/custom/Badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Route } from "next";
import { InfoIcon } from "lucide-react";
import { ButtonTrailer } from "@/components/custom/Link";
import DynamicScore from "@/module/poster/score";

const backdropStyles = {
  "--basis": "calc(115% + (var(--slide-spacing) * 2))",
} as React.CSSProperties;

export function HeroItem({
  children,
  src,
}: {
  src: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-slot="hero-item"
      className="relative size-full overflow-hidden lg:rounded-md lg:border"
    >
      <div
        className="scanlines relative flex h-full justify-center select-none"
        data-slot="parallax-layer"
      >
        <BackdropImage
          className="-z-10 block max-w-none shrink-0 grow-0 basis-(--basis) scale-120"
          src={src}
          alt="empty"
          style={backdropStyles}
          priority
          loading="eager"
        />
      </div>

      <div
        data-slot="hero-content"
        className="scanlines absolute inset-0 flex flex-col justify-end gap-x-4 gap-y-4 px-4 py-6 backdrop-brightness-50 xl:px-10"
      >
        {children}
      </div>
    </div>
  );
}

export function HeroContent({
  data,
}: {
  data: Omit<HeroProps, "backdrop_path">;
}) {
  const { id, media_type, release_date, title, trailer, vote_average } = data;

  return (
    <>
      <p className="typography-h1 dark:text-foreground text-left text-white">
        {title}
      </p>
      <div className="flex items-center gap-x-2 *:data-[slot=badge]:text-white">
        <MediaTypeBadge value={media_type} />
        <DateBadge value={release_date} />
        <DynamicScore
          voteAverage={vote_average}
          mediaType={media_type}
          titleId={id}
        />
        {/* <ScoreBadge value={vote_average} /> */}
      </div>
      <div className="flex items-center gap-x-2">
        <ButtonTrailer
          className="dark:data-[slot=trailer-button]:text-foreground data-[slot=trailer-button]:text-white"
          media_type={media_type}
          titleId={id}
          trailer={trailer}
        />
        <Button
          variant="secondary"
          nativeButton={false}
          render={<Link href={`/${media_type}/${id}` as Route} />}
        >
          <InfoIcon />
          More Info
        </Button>
      </div>
    </>
  );
}
