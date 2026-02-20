import { TrailerProps } from "@/module/gallery/types";

export type HeroProps = {
  backdrop_path: string;
  id: number;
  media_type: "tv" | "movie";
  vote_average: number | null;
  release_date: string | null;
  title: string;
  trailer: TrailerProps | null;
};
