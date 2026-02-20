import EpisodeInfo from "../EpisodeInfo";
import MainDetails from "../MainDetails";
import Section from "@/components/custom/Section";
import { Separator } from "@/components/ui/separator";
import SliderContainer from "@/module/carousel-slider/slider-container";
import {
  InstallmentSliderItem,
  TitleSliderItem,
} from "@/module/carousel-slider/slider-item";
import SeasonInfo from "../SeasonInfo";
import TitleMetadata from "../Metadata";
import { Photos, Videos } from "../Medias";
import { TitleDetailsPoster } from "@/module/poster";
import { Route } from "next";
import { getShowDetailsAPI } from "../../lib/getShowDetails";
import Reviews from "../Reviews";

export default async function TvShowTitleDetails({
  paramId,
}: {
  paramId: string;
}) {
  const data = await getShowDetailsAPI(paramId);

  return (
    <>
      <MainDetails data={data.details} />

      <Separator />

      <div className="flex flex-col @3xl/details:flex-row">
        <div className="shrink grow basis-full space-y-6 pt-6 @3xl/details:border-r">
          <Section title="Episode">
            <div className="grid grid-cols-1 gap-2 px-2 @2xl/details:grid-cols-2">
              <EpisodeInfo status="last" data={data.episode.latest} />
              <EpisodeInfo status="next" data={data.episode.next} />
            </div>
          </Section>

          <Section title="Seasons">
            <SliderContainer>
              {data.seasons.map((value) => (
                <InstallmentSliderItem key={value.id}>
                  <SeasonInfo data={value} />
                </InstallmentSliderItem>
              ))}
            </SliderContainer>
          </Section>

          <Section
            title="Photos"
            href={
              `/${data.details.media_type}/${data.details.id}/images` as Route
            }
          >
            <Photos data={data.photos} />
          </Section>

          <Section
            title="Trailers"
            href={
              `/${data.details.media_type}/${data.details.id}/videos` as Route
            }
          >
            <Videos data={data.videos} />
          </Section>

          <Section title="Similar to this">
            <SliderContainer>
              {data.similar.map((value) => (
                <TitleSliderItem key={value.id}>
                  <TitleDetailsPoster data={value} />
                </TitleSliderItem>
              ))}
            </SliderContainer>
          </Section>

          <Section title="Reviews">
            <Reviews
              mediaType={data.details.media_type}
              titleId={data.details.id}
            />
          </Section>
        </div>

        <div className="w-full shrink-0 grow-0 border-t @2xl/details:basis-48 @3xl/details:border-t-0 @4xl/details:basis-64">
          <TitleMetadata data={data.metadata} keywords={data.keywords} />
        </div>
      </div>
    </>
  );
}
