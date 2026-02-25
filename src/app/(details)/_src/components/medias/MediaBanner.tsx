import { ButtonBack } from "@/components/custom/Button";
import { BackdropImage } from "@/components/ui/image";
import getTitleDetailsAPI from "../../lib/getTitleMedias";

interface MediaLayoutProps {
  params: Promise<{
    titleId: string;
  }>;
  media_type: "movie" | "tv";
  subtext: string;
  gallery_type: "videos" | "photos";
}

export default async function MediaBanner({
  media_type,
  params,
  gallery_type,
  subtext,
}: MediaLayoutProps) {
  const { titleId } = await params;
  const { backdrop_path, title } = await getTitleDetailsAPI({
    titleId,
    media_type,
    gallery_type,
  });

  return (
    <div className="scanlines relative isolate min-h-44 space-y-2 border-b p-2">
      <BackdropImage
        alt={title}
        src={backdrop_path}
        className="-z-10 brightness-50"
      />
      <ButtonBack className="border-white text-white hover:bg-white/15 hover:text-white" />
      <h1 className="text-white">{title}</h1>
      <h2 className="typography-span text-xs text-white">{subtext}</h2>
    </div>
  );
}
