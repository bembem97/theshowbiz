import { PhotoProps } from "@/app/(details)/_src/type/media-types";
import ImageTabslist from "./client/ImageTabslist";
import getTitleDetailsAPI from "../../lib/getTitleMedias";

interface ImageItemsProps {
  params: Promise<{
    titleId: string;
  }>;
  media_type: "movie" | "tv";
}

export default async function ImageItems({
  media_type,
  params,
}: ImageItemsProps) {
  const { titleId } = await params;
  const { images } = await getTitleDetailsAPI({
    gallery_type: "photos",
    media_type,
    titleId,
  });

  return (
    <>
      {!images || images.length === 0 ? (
        <p className="text-muted-foreground italic">{"No available image."}</p>
      ) : (
        <ImageTabslist data={images as PhotoProps[]} />
      )}
    </>
  );
}
