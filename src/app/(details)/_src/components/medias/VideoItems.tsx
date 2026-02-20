import { ImageLink } from "@/components/custom/Link";
import ImageGrid from "./ImageGrid";
import { VideoCollectionProps } from "@/app/(details)/_src/type/media-types";
import { cn } from "@/lib/utils";
import getTitleDetailsAPI from "../../lib/getTitleMedias";

interface VideoItemsProps {
  params: Promise<{
    titleId: string;
  }>;
  media_type: "movie" | "tv";
}

export default async function VideoItems({
  media_type,
  params,
}: VideoItemsProps) {
  const { titleId } = await params;
  const { images } = await getTitleDetailsAPI({
    gallery_type: "videos",
    media_type,
    titleId,
  });

  const thumbnails = images as VideoCollectionProps[];

  return (
    <ImageGrid>
      {thumbnails.map(({ href, thumbnail }, i) => (
        <ImageLink
          key={i}
          alt={`title media item ${i + 1}`}
          className={cn("aspect-4/3 h-32 xl:h-44")}
          src={thumbnail}
          href={href}
        />
      ))}
    </ImageGrid>
  );
}
