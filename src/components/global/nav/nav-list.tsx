import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import {
  HouseIcon,
  TvIcon,
  FilmIcon,
  SparkleIcon,
  BookmarkIcon,
  EyeIcon,
  HeartIcon,
  StarIcon,
  LucideProps,
  HistoryIcon,
} from "lucide-react";
import Link from "next/link";
import { Route } from "next";

export type ListProps = {
  href: Route;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
};

export type NavListProps = {
  discoveries: ListProps[];
  libraries: ListProps[];
};

export const navList: NavListProps = {
  discoveries: [
    {
      href: "/",
      Icon: HouseIcon,
      label: "Home",
    },
    {
      href: "/shows",
      Icon: TvIcon,
      label: "Shows",
    },
    {
      href: "/movies",
      Icon: FilmIcon,
      label: "Movies",
    },
    {
      href: "/stars",
      Icon: SparkleIcon,
      label: "Stars",
    },
  ],
  libraries: [
    {
      href: "/watchlist",
      Icon: BookmarkIcon,
      label: "Watchlist",
    },
    {
      href: "/favorites",
      Icon: HeartIcon,
      label: "Favorites",
    },
    {
      href: "/ratings",
      Icon: StarIcon,
      label: "Ratings",
    },
    {
      href: "/watched",
      Icon: EyeIcon,
      label: "Watched",
    },
    {
      href: "/history",
      Icon: HistoryIcon,
      label: "History",
    },
  ],
};

export default function NavList({
  children,
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul {...props} className={cn("flex flex-col", className)}>
      {children}
    </ul>
  );
}

export function NavListItem({
  href,
  ...props
}: { href: Route } & React.ComponentProps<typeof BaseListItem>) {
  return (
    <BaseListItem
      ButtonProps={{
        render: <Link href={href} />,
        nativeButton: false,
        ...props.ButtonProps,
      }}
      {...props}
    />
  );
}

export function BaseListItem({
  ButtonProps,
  ButtonClassName,
  Icon,
  label,
  className,
  ...props
}: {
  ButtonProps?: React.ComponentProps<typeof Button>;
  ButtonClassName?: string;
  label: string;
  Icon: React.ReactElement<
    React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >
  >;
} & React.ComponentProps<"li">) {
  return (
    <li {...props} data-slot="base-list-item" className={cn("flex", className)}>
      <Button
        {...ButtonProps}
        variant="ghost"
        className={cn(
          "shrink grow justify-start rounded-none border-none py-4 *:[svg]:mr-2 *:[svg]:block",
          ButtonClassName,
        )}
      >
        {Icon}
        <span className="font-medium text-current">{label}</span>
      </Button>
    </li>
  );
}
