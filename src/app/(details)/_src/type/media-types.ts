import { Route } from "next";

export interface PhotoProps {
  file_path: string;
  href: Route;
  aspect: string;
  type: "poster" | "backdrop";
}

export interface VideoCollectionProps {
  thumbnail: string;
  href: Route;
}
