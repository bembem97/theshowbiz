import { ImageLink } from "@/components/custom/Link";
import { PhotoProps, VideoCollectionProps } from "../type/media-types";
import { cn } from "@/lib/utils";
import SliderContainer from "@/module/carousel-slider/slider-container";
import { MediaSliderItem } from "@/module/carousel-slider/slider-item";

interface PhotoSliderProps {
  data: PhotoProps[];
}

interface VideoSliderProps {
  data: VideoCollectionProps[];
}

export function Photos({ data }: PhotoSliderProps) {
  return (
    <SliderContainer>
      {data.map(({ aspect, file_path, href }, i) => (
        <MediaSliderItem key={i}>
          <ImageLink
            alt=""
            href={href}
            className={cn("h-60", aspect)}
            src={file_path}
          />
        </MediaSliderItem>
      ))}
    </SliderContainer>
  );
}

export function Videos({ data }: VideoSliderProps) {
  return (
    <SliderContainer>
      {data.map(({ thumbnail, href }, i) => (
        <MediaSliderItem key={i}>
          <ImageLink
            alt=""
            href={href}
            className={cn("aspect-video h-60")}
            src={thumbnail}
          />
        </MediaSliderItem>
      ))}
    </SliderContainer>
  );
}
