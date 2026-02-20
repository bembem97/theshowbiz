import React from "react";
import SearchPanel from "./panel";

export default function SearchContainer({
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className="grid min-h-0 grid-cols-1 grid-rows-[max-content_minmax(0,1fr)] gap-y-2"
    >
      <SearchPanel />
    </div>
  );
}
