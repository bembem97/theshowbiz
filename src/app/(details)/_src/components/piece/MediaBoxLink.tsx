import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import React from "react";

interface Props extends React.ComponentProps<typeof Item> {
  href: Route;
  label: string;
  icon: React.ReactElement<
    React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >
  >;
}

export default function MediaBoxLink({
  className,
  href,
  label,
  icon,
  ...props
}: Props) {
  return (
    <Item
      {...props}
      render={<Link href={href} />}
      variant="outline"
      className={cn(
        "grow flex-col content-center @3xl/details:flex-row @3xl/details:justify-items-start",
        className,
      )}
    >
      <ItemHeader className="justify-center">{icon}</ItemHeader>
      <ItemContent className="grow justify-center">
        <ItemDescription className="text-foreground text-center text-base dark:text-white">
          {label}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}
