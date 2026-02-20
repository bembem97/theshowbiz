import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import React from "react";

export default function ButtonFavorite(
  props: React.ComponentProps<typeof Button>,
) {
  return (
    <Button variant="outline" {...props}>
      <HeartIcon />
      Add to Favorite
    </Button>
  );
}
