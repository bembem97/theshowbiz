"use client";

import { PhotoProps } from "@/app/(details)/_src/type/media-types";
import { ImageLink } from "@/components/custom/Link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import ImageGrid from "../ImageGrid";

interface ImageTabsListProps {
  data: PhotoProps[];
}

export default function ImageTabslist({ data }: ImageTabsListProps) {
  const [filter, setFilter] = useState("all");

  const images = useMemo(() => {
    if (filter === "all") return data;

    return data.filter(({ type }) => type === filter);
  }, [data, filter]);

  return (
    <Tabs defaultValue="all">
      <TabsList variant="line" className="mb-4 w-full xl:w-max">
        <TabsTrigger value="all" onClick={() => setFilter("all")}>
          Show all images
        </TabsTrigger>
        <TabsTrigger value="backdrop" onClick={() => setFilter("backdrop")}>
          Backdrops
        </TabsTrigger>
        <TabsTrigger value="poster" onClick={() => setFilter("poster")}>
          Posters
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <ImageGrid>
          {images.map(({ aspect, file_path, href }, i) => (
            <ImageLink
              key={i}
              alt={`title media item ${i + 1}`}
              className={cn("h-32 xl:h-44", aspect)}
              src={file_path}
              href={href}
            />
          ))}
        </ImageGrid>
      </TabsContent>
      <TabsContent value="backdrop">
        <ImageGrid>
          {images.map(({ aspect, file_path, href }, i) => (
            <ImageLink
              key={i}
              alt={`title media item ${i + 1}`}
              className={cn("h-32 xl:h-44", aspect)}
              src={file_path}
              href={href}
            />
          ))}
        </ImageGrid>
      </TabsContent>
      <TabsContent value="poster">
        <ImageGrid>
          {images.map(({ aspect, file_path, href }, i) => (
            <ImageLink
              key={i}
              alt={`title media item ${i + 1}`}
              className={cn("h-32 xl:h-44", aspect)}
              src={file_path}
              href={href}
            />
          ))}
        </ImageGrid>
      </TabsContent>
    </Tabs>
  );
}
