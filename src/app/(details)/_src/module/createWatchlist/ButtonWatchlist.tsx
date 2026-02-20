import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "lucide-react";

export default function ButtonWatchlist(
  props: React.ComponentProps<typeof Button>,
) {
  return (
    <Button variant="outline" {...props}>
      <BookmarkIcon />
      Add to Watchlist
    </Button>
  );
}
