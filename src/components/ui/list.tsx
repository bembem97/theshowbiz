import { cn } from "@/lib/utils";
import { Button } from "./button";

export function List({
  className,
  children,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul data-slot="list" className={cn("relative py-2", className)} {...props}>
      {children}
    </ul>
  );
}

export function ListItem({
  className,
  children,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="list-item"
      className={cn(
        "relative flex w-full items-center px-2 py-4 text-left has-[>button]:px-0 has-[>button]:py-0 [&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    >
      {children}
    </li>
  );
}

export function ListItemButton({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="list-item-button"
      className={cn(
        "min-h-12 shrink grow justify-start rounded-none border-none px-2 py-4",
        className,
      )}
      variant="ghost"
      {...props}
    >
      {children}
    </Button>
  );
}

export function ListItemAvatar({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="list-item-avatar"
      className={cn(
        "mr-1.5 grid h-5 min-w-5 place-items-center overflow-clip rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function ListItemText({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="list-item-text"
      className={cn("flex flex-col gap-y-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}
