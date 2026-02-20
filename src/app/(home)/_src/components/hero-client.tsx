"use client";

import { Carousel } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

export default function CarouselClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const plugin = React.useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    }),
  );

  return (
    <Carousel plugins={[plugin.current]} opts={{ loop: true, align: "start" }}>
      {children}
    </Carousel>
  );
}
