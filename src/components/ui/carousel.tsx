"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import { Button } from "./button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

export function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

/**
 * Carousel > CarouselContainer > CarouselViewport > CarouselSlides > CarouselParallax? > CarouselItem
 */

export function Carousel({
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel({ ...opts }, plugins);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto", className)}
      data-slot="carousel-container"
      {...props}
    />
  );
}

export function CarouselSlides(props: React.ComponentProps<"div">) {
  const { className, ...rest } = props;

  return (
    <div
      data-slot="carousel-slides"
      className={cn("flex", className)}
      style={
        {
          touchAction: "pan-y pinch-zoom",
          "--ml": "calc(var(--slide-spacing) * -1)",
        } as React.CSSProperties
      }
      {...rest}
    />
  );
}

export function CarouselViewport({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { carouselRef } = useCarousel();
  return (
    <div
      ref={carouselRef}
      data-slot="carousel-viewport"
      className={cn("overflow-clip", className)}
      {...props}
    />
  );
}

export function CarouselItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "inline-grid min-w-0 shrink-0 grow-0 grid-cols-1 grid-rows-1",
        className,
      )}
      {...props}
    />
  );
}

export function CarouselPrevious(props: React.ComponentProps<typeof Button>) {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      variant="secondary"
      data-slot="carousel-previous"
      size="icon-lg"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeftIcon />
    </Button>
  );
}

export function CarouselNext(props: React.ComponentProps<typeof Button>) {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      variant="secondary"
      data-slot="carousel-next"
      size="icon-lg"
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRightIcon />
    </Button>
  );
}

const TWEEN_FACTOR_BASE = 0.2;

export function CarouselParallax({ children }: { children: React.ReactNode }) {
  const tweenFactor = React.useRef(0);
  const tweenNodes = React.useRef<HTMLElement[]>([]);

  const { api: emblaApi } = useCarousel();

  const setTweenNodes = React.useCallback(
    (emblaApi: EmblaCarouselType): void => {
      if (emblaApi === undefined) return;
      tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
        return slideNode.querySelector(
          "[data-slot=parallax-layer]",
        ) as HTMLElement;
      });
    },
    [],
  );

  const setTweenFactor = React.useCallback((emblaApi: EmblaCarouselType) => {
    if (emblaApi === undefined) return;
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenParallax = React.useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      if (emblaApi === undefined) return;
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
          const tweenNode = tweenNodes.current[slideIndex];
          tweenNode.style.transform = `translateX(${translate}%)`;
        });
      });
    },
    [],
  );

  React.useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenParallax)
      .on("scroll", tweenParallax)
      .on("slideFocus", tweenParallax);
  }, [emblaApi, tweenParallax, setTweenNodes, setTweenFactor]);

  return <>{children}</>;
}
