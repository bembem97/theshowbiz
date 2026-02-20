"use client";

import { Button } from "@/components/ui/button";
import { signInGoogle } from "./action-client";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";
// import { signInGoogle } from "./action-server";

export function GoogleSignIn(props: React.ComponentProps<typeof Button>) {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const r = searchParams.get("r") || "";
  return (
    <>
      <Button
        disabled={isPending}
        variant="outline"
        onClick={() => startTransition(async () => await signInGoogle(r))}
        {...props}
      >
        Sign In with Google {isPending && <Spinner />}
      </Button>
    </>
  );
}
