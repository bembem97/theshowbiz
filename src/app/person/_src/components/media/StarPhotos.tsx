import { ImageLink } from "@/components/custom/Link";
import { getImagePathname } from "@/lib/utils";
import getCreditsAPI from "@/app/person/_src/lib/getCreditsAPI";
import { Route } from "next";

interface StarProfilesProps {
  params: Promise<{ starId: string; }>
}

export default async function StarPhotos({ params }: StarProfilesProps) {
  const { starId } = await params
  const { images, identity: star } = await getCreditsAPI(starId)
  
  return (
    <div className="grid gap-2 grid-cols-2 @sm/profile:grid-cols-3 @xl/profile:grid-cols-4 @3xl/profile:grid-cols-5 @5xl/profile:grid-cols-6 auto-rows-max">
      {images.map(({ file_path }, i) => (
        <ImageLink
          key={i}
          alt={`${star.name}'s profile`}
          className="aspect-2/3"
          src={getImagePathname(file_path, "poster")}
          href={`/person/${star.id}/profile${file_path}` as Route}
        />
      ))}
    </div>
  )
}