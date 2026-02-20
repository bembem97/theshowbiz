import { cn } from "@/lib/utils";
import { Item, ItemDescription, ItemTitle } from "../ui/item";

type DescriptionListProps = React.ComponentProps<typeof Item>;

interface DescriptionTermProps extends React.ComponentProps<typeof ItemTitle> {
  DTProps?: React.ComponentProps<"dt">;
}

type DescriptionDetailsProps = React.ComponentProps<typeof ItemDescription>;

export function DescriptionList({
  children,
  className,
  ...props
}: DescriptionListProps) {
  return (
    <Item
      {...props}
      className={cn(
        "grid h-max auto-rows-min grid-cols-1 items-start gap-y-0 p-2",
        className,
      )}
      render={<dl />}
    >
      {children}
    </Item>
  );
}

export function DescriptionTerm({
  children,
  className,
  DTProps,
  ...props
}: DescriptionTermProps) {
  return (
    <dt {...DTProps}>
      <ItemTitle
        {...props}
        className={cn("text-muted-foreground py-0.5 text-xs", className)}
      >
        {children}
      </ItemTitle>
    </dt>
  );
}

export function DescriptionDetails({
  children,
  className,
  ...props
}: DescriptionDetailsProps) {
  return (
    <Item
      {...props}
      className={cn(
        "**:[span,div]:text-foreground text-foreground px-0 py-0.5 text-sm **:[span,div]:text-sm **:[span,div]:leading-none @md/star:**:[span,div]:text-xs",
        className,
      )}
      render={<dd />}
    >
      {children}
    </Item>
  );
}
