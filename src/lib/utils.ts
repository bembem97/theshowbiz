import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_IMG } from "./constant";
import { ImageProps, VideoProps } from "@/types/galleries";
import { Route } from "next";
import {
  PhotoProps,
  VideoCollectionProps,
} from "@/app/(details)/_src/type/media-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImagePathname = (
  src: string | null,
  type: "poster" | "backdrop" | "avatar" | "default" = "poster",
): string => {
  if (src === null) {
    switch (type) {
      case "poster":
        return "/poster.png";
      case "backdrop":
        return "/backdrop.png";
      case "avatar":
        return "/avatar.png";
      default:
        return "/poster.png";
    }
  }

  return `${API_IMG}${src}`;
};

export const getVoteAverage = (value: number | null) =>
  typeof value === "number" ? Number(value.toFixed(1)) : null;

export function getPrettyDate({
  date,
  style = "short",
}: {
  date: Date | string | null | undefined;
  style?: "year" | "long" | "short";
}) {
  const _date: string | Date | null | undefined =
    typeof date === "string" ? new Date(date) : date;

  if (!(_date instanceof Date) || isNaN(_date.getTime())) {
    return null; // Invalid date
  }

  // todo: "Prettifying" Date Format
  const option = (value: undefined | string) => {
    switch (value) {
      case "year":
        return { year: "numeric" };
      case "short":
        return { day: "numeric", month: "short", year: "numeric" };
      case "long":
        return { day: "numeric", month: "long", year: "numeric" };
      default:
        return undefined;
    }
  };

  const opts = option(style) as Intl.DateTimeFormatOptions;
  const formatter = new Intl.DateTimeFormat("en-US", opts).format(_date);

  return formatter;
}

export function getReadableTime(time: number) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  if (time % 60 === 0) return `${hours}h`;

  return `${hours}h ${minutes}m`;
} // input: 90; output: 1h 30m;

export function getNumberCompact(num: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
} // input: 1400; output: 1.4k;

export function getUSDCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
} // input: 10000; output: $10,000;

export const getYTThumbnail = (key: string) =>
  `https://i.ytimg.com/vi/${key}/hqdefault.jpg`;

export function getPhotoProps({
  data,
  media_type,
  id,
  slice = 20,
}: {
  data: ImageProps[];
  media_type: "movie" | "tv";
  id: number;
  slice?: number;
}): PhotoProps[] {
  return data
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, slice)
    .map(({ file_path, height, width }) => ({
      file_path: getImagePathname(
        file_path,
        width > height ? "backdrop" : "poster",
      ),
      href: `/${media_type}/${id}/imageviewer${file_path}` as Route,
      aspect: width > height ? "aspect-4/3" : "aspect-2/3",
      type: width > height ? "backdrop" : "poster",
    }));
}

export function getTitleVideos({
  data,
  media_type,
  id,
  slice = 20,
}: {
  data: VideoProps[];
  media_type: "movie" | "tv";
  slice?: number;
  id: number;
}): VideoCollectionProps[] {
  return data
    .map(({ key }) => ({
      thumbnail: getYTThumbnail(key),
      href: `/${media_type}/${id}/video/${key}` as Route,
    }))
    .slice(0, slice);
}
