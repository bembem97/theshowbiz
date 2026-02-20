import { cn } from "@/lib/utils";
import React from "react";

export default async function Footer({
  className,
  ...props
}: React.ComponentProps<"footer">) {
  "use cache";
  return (
    <footer
      {...props}
      className={cn(
        "grid min-h-10 place-items-center border-t p-4 text-sm font-medium",
        className,
      )}
    >
      &copy; {new Date().getFullYear()} TheShowbiz. All rights reserved.
    </footer>
  );
}
