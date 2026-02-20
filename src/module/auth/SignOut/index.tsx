"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { signOutAction } from "./action";
import { Button } from "@/components/ui/button";

export default function SignOut() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className={cn("w-full normal-case")}
      onClick={() => {
        signOutAction(pathname);
        router.refresh();
      }}
    >
      Sign Out
    </Button>
  );
}
