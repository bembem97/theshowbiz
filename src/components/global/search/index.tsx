import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SearchIcon } from "lucide-react";
import React from "react";
import SearchContainer from "./container";

export default function Search(props: React.ComponentProps<typeof Button>) {
  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="outline" size="icon" {...props} />}
      >
        <SearchIcon />
      </DialogTrigger>

      <DialogContent className="3xl:max-h-[calc(100dvh-1rem)] max-h-dvh w-full max-w-md grid-cols-1 grid-rows-1">
        <SearchContainer />
      </DialogContent>
    </Dialog>
  );
}
