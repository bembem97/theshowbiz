import { Metadata } from "next";
import { getApi } from "./_src/lib/hero-api";
import Hero from "./_src/components/hero-carousel";
import Section from "@/components/custom/Section";
import { Suspense } from "react";
import {
  PopularMovies,
  NetflixShows,
  PopularShows,
  PopularStars,
  UpcomingMovies,
  UpcomingShows,
} from "./_src/components/slider";
import SpinnerProgress from "@/components/custom/SpinnerProgress";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage() {
  const res = await getApi();

  return (
    <div className="@container/home space-y-8">
      <Hero data={res} />

      <div className="space-y-8 **:data-[slot=carousel-viewport]:px-2">
        <Section title="Most Watched Films">
          <PopularMovies />
        </Section>
        <Section title="Binge-Worthy Series">
          <Suspense fallback={<SpinnerProgress />}>
            <PopularShows />
          </Suspense>
        </Section>
        <Section title="Coming Soon to Theaters">
          <Suspense fallback={<SpinnerProgress />}>
            <UpcomingMovies />
          </Suspense>
        </Section>
        <Section title="New Shows to Watch For">
          <Suspense fallback={<SpinnerProgress />}>
            <UpcomingShows />
          </Suspense>
        </Section>
        <Section title="Stars of the Spotlight">
          <Suspense fallback={<SpinnerProgress />}>
            <PopularStars />
          </Suspense>
        </Section>
        <Section title="Netflix Must-Watch Shows">
          <Suspense fallback={<SpinnerProgress />}>
            <NetflixShows />
          </Suspense>
        </Section>
      </div>
    </div>
  );
}
