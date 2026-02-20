import React from "react";
import {
  CarouselContainer,
  CarouselItem,
  CarouselNext,
  CarouselParallax,
  CarouselPrevious,
  CarouselSlides,
  CarouselViewport,
} from "@/components/ui/carousel";
import { HeroContent, HeroItem } from "./hero-item";
import { HeroProps } from "../types";
import CarouselClient from "./hero-client";

export default function Hero({ data }: { data: HeroProps[] }) {
  return (
    <header>
      <CarouselClient>
        <CarouselContainer className="3xl:[--slide-size:80%] relative [--slide-size:100%] [--slide-spacing:0.5rem]">
          <CarouselViewport className="3xl:p-2 p-0">
            <CarouselSlides className="ml-(--ml)">
              <CarouselParallax>
                {data.map(({ backdrop_path, ...rest }, i) => (
                  <CarouselItem
                    key={i}
                    className="max-h-112 max-w-4xl min-w-0 shrink-0 grow-0 basis-(--slide-size) pl-(--slide-spacing) max-lg:min-h-60 lg:aspect-16/10"
                    style={
                      {
                        transform: "translate3d(0, 0, 0)",
                      } as React.CSSProperties
                    }
                  >
                    <HeroItem src={backdrop_path}>
                      <HeroContent data={rest} />
                    </HeroItem>
                  </CarouselItem>
                ))}
              </CarouselParallax>
            </CarouselSlides>
          </CarouselViewport>
        </CarouselContainer>

        <CarouselPrevious className="3xl:xl:[@media(hover:hover)]:inline-flex absolute top-1/2 left-5 hidden -translate-y-1/2" />
        <CarouselNext className="3xl:xl:[@media(hover:hover)]:inline-flex absolute top-1/2 right-5 hidden -translate-y-1/2" />
      </CarouselClient>
    </header>
  );
}
