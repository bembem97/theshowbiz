import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Route } from "next";
import Link from "next/link";

interface Props extends React.ComponentProps<"div"> {
  label: string;
  credits: {
    id: number;
    name: string;
  }[];
}

const _className = cva("flex flex-wrap **:data-[slot=badge]:text-base items-center gap-2");

export default function SmallCredit({
  className,
  credits,
  label,
  ...props
}: Props) {
  return (
    <div {...props} className={cn(_className(), className)}>
      <span className="text-foreground text-base font-semibold">{label}</span>
      <div className={cn(_className(), "divide-x")}>
        {credits.map(({ id, name }) => (
          <div key={id} className="not-last-of-type:pr-2">
            <Badge
              variant="link"
              className="min-w-0 px-0.5"
              render={<Link href={`/person/${id}` as Route} />}
            >
              {name}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
