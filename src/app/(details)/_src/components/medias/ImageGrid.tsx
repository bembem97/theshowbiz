import { cn } from "@/lib/utils";
import React from "react";

type ImageGridProps = React.ComponentProps<"div">;

export default function ImageGrid({
  children,
  className,
  ...props
}: ImageGridProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} {...props}>
      {children}
    </div>
  );
}
