import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = React.ComponentProps<typeof Image>;

export function BackdropImage({ className, src, alt, ...props }: Props) {
  return (
    <Image
      alt={alt}
      src={src}
      placeholder="blur"
      blurDataURL="/backdrop.png"
      data-slot="backdrop-image"
      fill
      quality={85}
      sizes="(max-width: 64rem) 100vw, (max-width: 36rem) 85vw, 70vw"
      className={cn(
        "object-cover text-center align-middle text-xs italic",
        className,
      )}
      {...props}
    />
  );
}

export function PosterImage({
  className,
  alt,
  ...props
}: React.ComponentProps<typeof Image>) {
  return (
    <Image
      alt={alt}
      data-slot="poster-image"
      placeholder="blur"
      blurDataURL="/poster.png"
      className={cn(
        "block object-cover object-center text-center align-middle text-xs italic",
        className,
      )}
      {...props}
    />
  );
}
