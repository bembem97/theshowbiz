import { ImageLink } from "@/components/custom/Link";
import { getImagePathname } from "@/lib/utils";
import getCreditsAPI from "@/app/person/_src/lib/getCreditsAPI";
import { Route } from "next";

interface PhotosProps {
  params: Promise<{ starId: string }>;
}

export default async function Photos({ params }: PhotosProps) {
  const { starId } = await params;
  const { images, identity: star } = await getCreditsAPI(starId);

  return (
    <div className="grid auto-rows-max grid-cols-2 gap-2 @sm/profile:grid-cols-3 @xl/profile:grid-cols-4 @3xl/profile:grid-cols-5 @5xl/profile:grid-cols-6">
      {!images || images.length === 0 ? (
        <p className="text-muted-foreground italic">No photos</p>
      ) : (
        images.map(({ file_path }, i) => (
          <ImageLink
            key={i}
            alt={`${star.name}'s profile`}
            className="aspect-2/3"
            src={getImagePathname(file_path, "poster")}
            href={`/person/${star.id}/profile${file_path}` as Route}
          />
        ))
      )}
    </div>
  );
}
