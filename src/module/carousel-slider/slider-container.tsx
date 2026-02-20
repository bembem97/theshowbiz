import {
  Carousel,
  CarouselContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselSlides,
  CarouselViewport,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// const slideStyles = {
//   "--gap": "calc((1 / 2 * 100%) - 0.5rem)",
//   "--gap-md": "calc((4 / 12 * 100%) - 0.5rem)",
//   "--gap-xl": "calc((3 / 12 * 100%) - 0.5rem)",
//   "--gap-3xl": "calc((2 / 10 * 100%) - 0.5rem)",
//   "--gap-4xl": "calc((1 / 6 * 100%) - 0.5rem)",
//   "--gap-5xl": "calc((1 / 7 * 100%) - 0.5rem)",
// } as React.CSSProperties;

export default function SliderContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: React.ReactNode;
}) {
  return (
    <Carousel
      opts={{ slidesToScroll: "auto", dragFree: true }}
      className={cn("@container/slider static", className)}
    >
      <CarouselContainer>
        <CarouselViewport className="p-2">
          <CarouselSlides className="gap-2">{children}</CarouselSlides>
        </CarouselViewport>
      </CarouselContainer>

      <div className="absolute top-0 right-2 hidden items-center gap-x-2 @lg/slider:[@media(hover:hover)]:flex">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
