import { TitleDetailsPoster } from "@/module/poster";
import {
  getActionAndAdventureShows,
  getAnimatedShows,
  getComedyShows,
  getCrimeShows,
  getDocumentaryShows,
  getDramaShows,
  getKidsAndFamilyShows,
  getMysteryShows,
  getRealityShows,
  getSciFiAndFantasyShows,
  getTalkShows,
} from "../lib/tv-api";
import { TitleSliderItem } from "@/module/carousel-slider/slider-item";
import SliderContainer from "@/module/carousel-slider/slider-container";

export async function ActionAndAdventureShows() {
  const data = await getActionAndAdventureShows();

  return (
    <SliderContainer>
      {data.map((value) => (
        <TitleSliderItem key={value.id}>
          <TitleDetailsPoster data={value} />
        </TitleSliderItem>
      ))}
    </SliderContainer>
  );
}

export async function AnimatedShows() {
  const data = await getAnimatedShows();

  return (
    <SliderContainer>
      {data.map((value) => (
        <TitleSliderItem key={value.id}>
          <TitleDetailsPoster data={value} />
        </TitleSliderItem>
      ))}
    </SliderContainer>
  );
}

export async function ComedyShows() {
  const data = await getComedyShows();

  return (
    <SliderContainer>
      {data.map((value) => (
        <TitleSliderItem key={value.id}>
          <TitleDetailsPoster data={value} />
        </TitleSliderItem>
      ))}
    </SliderContainer>
  );
}

export async function CrimeShows() {
  const data = await getCrimeShows();

  return (
    <SliderContainer>
      {data.map((value) => (
        <TitleSliderItem key={value.id}>
          <TitleDetailsPoster data={value} />
        </TitleSliderItem>
      ))}
    </SliderContainer>
  );
}

export async function DocumentaryShows() {
  const data = await getDocumentaryShows();

  return (
    <SliderContainer>
      {data.map((value) => (
        <TitleSliderItem key={value.id}>
          <TitleDetailsPoster data={value} />
        </TitleSliderItem>
      ))}
    </SliderContainer>
  );
}

export async function DramaShows() {
  const data = await getDramaShows();

  return (
    <SliderContainer>
      {data.map((value) => (
        <TitleSliderItem key={value.id}>
          <TitleDetailsPoster data={value} />
        </TitleSliderItem>
      ))}
    </SliderContainer>
  );
}

export async function KidsAndFamilyShows() {
  const data = await getKidsAndFamilyShows();

  return (
    <SliderContainer>
      {data.map((value) => (
        <TitleSliderItem key={value.id}>
          <TitleDetailsPoster data={value} />
        </TitleSliderItem>
      ))}
    </SliderContainer>
  );
}

export async function MysteryShows() {
  const data = await getMysteryShows();

  return (
    <SliderContainer>
      {data.map((value) => (
        <TitleSliderItem key={value.id}>
          <TitleDetailsPoster data={value} />
        </TitleSliderItem>
      ))}
    </SliderContainer>
  );
}

export async function RealityShows() {
  const data = await getRealityShows();

  return (
    <SliderContainer>
      {data.map((value) => (
        <TitleSliderItem key={value.id}>
          <TitleDetailsPoster data={value} />
        </TitleSliderItem>
      ))}
    </SliderContainer>
  );
}

export async function SciFiAndFantasyShows() {
  const data = await getSciFiAndFantasyShows();

  return (
    <SliderContainer>
      {data.map((value) => (
        <TitleSliderItem key={value.id}>
          <TitleDetailsPoster data={value} />
        </TitleSliderItem>
      ))}
    </SliderContainer>
  );
}

export async function TalkShows() {
  const data = await getTalkShows();

  return (
    <SliderContainer>
      {data.map((value) => (
        <TitleSliderItem key={value.id}>
          <TitleDetailsPoster data={value} />
        </TitleSliderItem>
      ))}
    </SliderContainer>
  );
}
