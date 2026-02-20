import { brunoAceSc } from "@/app/layout";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function BrandName({
  className,
  ...rest
}: Omit<React.ComponentProps<typeof Link>, "href">) {
  return (
    <Link
      {...rest}
      href="/"
      className={cn(
        "text-primary typography-small 2xl:typography-h4 inline-flex items-center",
        brunoAceSc.className,
        className,
      )}
    >
      TheShowbiz
    </Link>
  );
}
