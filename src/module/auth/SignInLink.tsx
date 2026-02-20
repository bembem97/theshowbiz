"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SignInLink({
  label,
  ...props
}: { label?: string } & React.ComponentProps<typeof Button>) {
  const pathname = usePathname();
  const redirectQuery =
    pathname === "/signin" ? null : encodeURIComponent(pathname);

  return (
    <Button
      nativeButton={false}
      variant="outline"
      render={
        <Link
          href={{
            pathname: "/signin",
            query: {
              r: redirectQuery,
            },
          }}
        />
      }
      {...props}
    >
      {label || "Sign In"}
    </Button>
  );
}
