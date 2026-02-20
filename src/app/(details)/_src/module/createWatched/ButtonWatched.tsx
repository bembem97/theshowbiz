import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";

export default function ButtonWatched(
  props: React.ComponentProps<typeof Button>,
) {
  return (
    <Button variant="outline" {...props}>
      <EyeIcon />
      Add to Watched
    </Button>
  );
}
