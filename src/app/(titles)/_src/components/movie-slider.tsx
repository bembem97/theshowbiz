import { TitleDetailsPoster } from "@/module/poster";
import {
  getActionMovies,
  getAnimatedAdventureMovies,
  getComedyMovies,
  getFamilyMovies,
  getFantasyMovies,
  getHorrorMovies,
  getMysteryMovies,
  getSciFiMovies,
  getThrillerMovies,
  getWesternMovies,
} from "../lib/movie-api";
import { TitleSliderItem } from "@/module/carousel-slider/slider-item";
import SliderContainer from "@/module/carousel-slider/slider-container";

export async function ActionMovies() {
  const data = await getActionMovies();

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

export async function AnimatedAdventureMovies() {
  const data = await getAnimatedAdventureMovies();

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

export async function ComedyMovies() {
  const data = await getComedyMovies();

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

export async function FamilyMovies() {
  const data = await getFamilyMovies();

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

export async function FantasyMovies() {
  const data = await getFantasyMovies();

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

export async function HorrorMovies() {
  const data = await getHorrorMovies();

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

export async function MysteryMovies() {
  const data = await getMysteryMovies();

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

export async function SciFiMovies() {
  const data = await getSciFiMovies();

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

export async function ThrillerMovies() {
  const data = await getThrillerMovies();

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

export async function WesternMovies() {
  const data = await getWesternMovies();

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
