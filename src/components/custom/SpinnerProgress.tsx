import { cn } from "@/lib/utils";
import { Item, ItemMedia } from "../ui/item";
import { Spinner } from "../ui/spinner";

export default function SpinnerProgress({
  className,
  ...props
}: React.ComponentProps<typeof Item>) {
  return (
    <Item className={cn("items-center justify-center", className)} {...props}>
      <ItemMedia>
        <Spinner />
      </ItemMedia>
    </Item>
  );
}
