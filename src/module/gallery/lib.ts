import { VideoProps } from "@/types/galleries";

export function getTrailerVideo(data: VideoProps[]) {
  return data
    .filter(({ official, type }) => {
      if (!official) return false;
      if (type === "Trailer") return true;
      if (type === "Teaser") return true;
      if (type === "Clip") return true;
    })
    .sort((a, b) => {
      const typeCompare = b.type.localeCompare(a.type);
      if (typeCompare !== 0) return typeCompare;

      return (
        Number(new Date(b.published_at)) - Number(new Date(a.published_at))
      );
    })
    .slice(0, 1)
    .map(({ id, key, name }) => ({ id, key, name }))[0];
}
