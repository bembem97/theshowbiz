import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-2">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <div className="flex flex-wrap items-center *:text-sm">
        {/* <ButtonBack variant="link">
          <ChevronLeftIcon className="text-primary size-4" /> Go back to
          previous page
        </ButtonBack> */}
        <span>Return to</span>{" "}
        <Button nativeButton={false} variant="link" render={<Link href="/" />}>
          <HomeIcon className="text-primary size-4" /> Home
        </Button>
      </div>
    </div>
  );
}
