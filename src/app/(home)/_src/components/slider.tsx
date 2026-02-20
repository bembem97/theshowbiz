import SliderContainer from "@/module/carousel-slider/slider-container";
import {
  getOnlyNetflixShows,
  getPopularMovies,
  getPopularShows,
  getPopularStars,
  getUpcomingMovies,
  getUpcomingShows,
} from "../lib/slider-api";
import {
  PersonSliderItem,
  TitleSliderItem,
} from "@/module/carousel-slider/slider-item";
import { PersonDetailsPoster, TitleDetailsPoster } from "@/module/poster";

export async function PopularMovies() {
  const data = await getPopularMovies();

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

export async function PopularShows() {
  const data = await getPopularShows();

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

export async function UpcomingMovies() {
  const data = await getUpcomingMovies();

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

export async function UpcomingShows() {
  const data = await getUpcomingShows();

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

export async function NetflixShows() {
  const data = await getOnlyNetflixShows();

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

export async function PopularStars() {
  const data = await getPopularStars();

  return (
    <SliderContainer>
      {data.map((value) => (
        <PersonSliderItem key={value.id}>
          <PersonDetailsPoster data={value} />
        </PersonSliderItem>
      ))}
    </SliderContainer>
  );
}
