import SpinnerProgress from "@/components/custom/SpinnerProgress";
import { Suspense } from "react";
import {
  ActionMovies,
  AnimatedAdventureMovies,
  ComedyMovies,
  FamilyMovies,
  FantasyMovies,
  HorrorMovies,
  MysteryMovies,
  SciFiMovies,
  ThrillerMovies,
  WesternMovies,
} from "../_src/components/movie-slider";
import Section from "@/components/custom/Section";

export default function MoviesPage() {
  return (
    <div className="space-y-8 py-4">
      <h1 className="ml-2">Explore the World of Movies</h1>

      <Section title="Action Hits">
        <Suspense fallback={<SpinnerProgress />}>
          <ActionMovies />
        </Suspense>
      </Section>
      <Section title="Animated Adventures">
        <Suspense fallback={<SpinnerProgress />}>
          <AnimatedAdventureMovies />
        </Suspense>
      </Section>
      <Section title="Comedy Favorites">
        <Suspense fallback={<SpinnerProgress />}>
          <ComedyMovies />
        </Suspense>
      </Section>
      <Section title="Family Picks">
        <Suspense fallback={<SpinnerProgress />}>
          <FamilyMovies />
        </Suspense>
      </Section>
      <Section title="Fantasy Epics">
        <Suspense fallback={<SpinnerProgress />}>
          <FantasyMovies />
        </Suspense>
      </Section>
      <Section title="Horror Nights">
        <Suspense fallback={<SpinnerProgress />}>
          <HorrorMovies />
        </Suspense>
      </Section>
      <Section title="Mystery & Suspense">
        <Suspense fallback={<SpinnerProgress />}>
          <MysteryMovies />
        </Suspense>
      </Section>
      <Section title="Sci-Fi Futures">
        <Suspense fallback={<SpinnerProgress />}>
          <SciFiMovies />
        </Suspense>
      </Section>
      <Section title="Thriller Essentials">
        <Suspense fallback={<SpinnerProgress />}>
          <ThrillerMovies />
        </Suspense>
      </Section>
      <Section title="Western Classics">
        <Suspense fallback={<SpinnerProgress />}>
          <WesternMovies />
        </Suspense>
      </Section>
    </div>
  );
}
