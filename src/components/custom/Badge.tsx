import {
  CalendarIcon,
  FilmIcon,
  HourglassIcon,
  SquareArrowUpIcon,
  StarIcon,
  TvIcon,
} from "lucide-react";
import { Badge } from "../ui/badge";
import React from "react";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<typeof Badge> {
  value: number | string | null | undefined;
}

export function DateBadge({ value, className, ...props }: Props) {
  if (!value) {
    return null;
  }

  return (
    <Badge
      variant="ghost"
      className={cn("leading-none text-black dark:text-white", className)}
      {...props}
    >
      <CalendarIcon className="text-primary" />
      {value}
    </Badge>
  );
}

export function VoteCountBadge({ value, className, ...props }: Props) {
  if (!value) {
    return null;
  }

  return (
    <Badge
      variant="ghost"
      aria-label={`${value} users voted`}
      className={cn(
        "inline-flex items-center leading-none text-black dark:text-white",
        className,
      )}
      {...props}
    >
      <SquareArrowUpIcon className="text-green-600 dark:text-green-400" />
      <span className="text-xs leading-none text-inherit">{value}</span>
      <span className="text-[0.625rem] text-inherit">(Users)</span>
    </Badge>
  );
}

export function ScoreBadge({ value, className, children, ...props }: Props) {
  if (!value && !Boolean(children)) {
    return null;
  }

  return (
    <Badge
      variant="ghost"
      className={cn(
        "inline-flex items-center leading-none text-black dark:text-white",
        className,
      )}
      {...props}
    >
      <StarIcon className="text-yellow-600 dark:text-yellow-400" />

      {children && !value ? (
        children
      ) : (
        <>
          <span className="text-xs leading-none text-black dark:text-white">
            {value}
          </span>
          /10
        </>
      )}
    </Badge>
  );
}

export function TimeDurationBadge({ value, className, ...props }: Props) {
  if (!value) {
    return null;
  }

  return (
    <Badge
      variant="ghost"
      className={cn("leading-none text-black dark:text-white", className)}
      {...props}
    >
      <HourglassIcon className="text-primary" />
      {value}
    </Badge>
  );
}

export function MediaTypeBadge({ value, className, ...props }: Props) {
  if (!value) {
    return null;
  }

  return (
    <Badge
      variant="ghost"
      className={cn(
        "leading-none text-black capitalize dark:text-white",
        className,
      )}
      {...props}
    >
      <FilmIcon className="text-primary" />
      {value}
    </Badge>
  );
}

export function CertificationBadge({ value, className, ...props }: Props) {
  if (!value) {
    return null;
  }

  return (
    <Badge
      variant="ghost"
      className={cn(
        "leading-none tracking-wider text-black capitalize dark:text-white",
        className,
      )}
      {...props}
    >
      {value}
    </Badge>
  );
}

export function SeasonBadge({ value, className, ...props }: Props) {
  if (!value) {
    return null;
  }

  return (
    <Badge
      variant="ghost"
      className={cn(
        "leading-none text-black capitalize dark:text-white",
        className,
      )}
      {...props}
    >
      <TvIcon className="text-primary" />
      {value}
    </Badge>
  );
}
