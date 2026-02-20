import { cn } from "@/lib/utils";
import React from "react";
import { ModeToggle } from "../mode-toggle";
import Search from "../search";
import BrandName from "../logo";
import NavDrawer from "../nav/nav-drawer";
import User from "@/module/auth/session/User";
import { Button } from "@/components/ui/button";

export default function Header({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      {...props}
      className={cn("sticky top-0 z-10 border-b bg-inherit", className)}
    >
      <div className="mx-auto flex w-full items-stretch justify-items-center gap-x-1.5 p-2">
        <NavDrawer className="4xl:hidden inline-flex" />
        <BrandName className="mr-auto" />
        <Search />
        <React.Suspense
          fallback={
            <Button variant="outline" disabled>
              Sign In
            </Button>
          }
        >
          <User />
        </React.Suspense>
        <ModeToggle />
      </div>
    </header>
  );
}
