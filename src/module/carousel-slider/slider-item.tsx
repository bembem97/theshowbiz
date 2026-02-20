import { CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export function TitleSliderItem({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <CarouselItem
      data-slot="title-slider-item"
      className={cn(
        "basis-1/2 @sm/slider:basis-1/3 @lg/slider:basis-1/4 @2xl/slider:basis-1/5 @4xl/slider:basis-1/6",
        className,
      )}
    >
      {children}
    </CarouselItem>
  );
}

export function PersonSliderItem({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <CarouselItem
      data-slot="person-slider-item"
      className={cn(
        "basis-1/2 @sm/slider:basis-1/3 @lg/slider:basis-1/4 @2xl/slider:basis-1/5 @4xl/slider:basis-1/6",
        className,
      )}
    >
      {children}
    </CarouselItem>
  );
}

export function InstallmentSliderItem({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <CarouselItem
      className={cn(
        "basis-full @xl/slider:basis-8/10 @2xl/slider:basis-1/2 @7xl/slider:basis-1/3",
        className,
      )}
    >
      {children}
    </CarouselItem>
  );
}

export function MediaSliderItem({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <CarouselItem className={cn("shrink-0 grow-0 basis-auto", className)}>
      {children}
    </CarouselItem>
  );
}
