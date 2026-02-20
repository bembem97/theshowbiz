"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { NavListItem } from "./nav-list";
import { usePathname } from "next/navigation";

export default function NavLink({
  className,
  href,
  ...props
}: React.ComponentProps<typeof NavListItem>) {
  const pathname = usePathname();
  const [clientPathname, setClientPathname] = React.useState("");
  
  React.useEffect(() => {
    setClientPathname(pathname);
  }, [pathname]);
  
  return (
    <NavListItem
      href={href}
      className={cn(
        { "text-primary": clientPathname === href }, 
        className
      )}
      {...props}
    />
  );
}
