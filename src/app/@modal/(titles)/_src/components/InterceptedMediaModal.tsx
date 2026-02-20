import { ButtonBack } from "@/components/custom/Button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import React from "react";

export default function InterceptedMediaModal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Dialog open={true}>
      <DialogContent
        showCloseButton={false}
        className="flex h-[calc(100dvh-0.5rem)] w-[calc(100vw-0.5rem)] max-w-full flex-col gap-y-2 bg-transparent p-0 ring-0 sm:max-w-screen"
      >
        <ButtonBack className="ml-auto w-max shrink-0 grow-0">
          <XIcon />
        </ButtonBack>
        <div
          className={cn(
            "relative mx-auto h-[calc(100dvh-0.5rem)] w-[calc(100vw-0.5rem)] max-w-6xl shrink grow basis-full overflow-clip bg-black",
            className,
          )}
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
