import SpinnerProgress from "@/components/custom/SpinnerProgress";
import { Suspense } from "react";
import {
  ActionAndAdventureShows,
  AnimatedShows,
  ComedyShows,
  CrimeShows,
  DocumentaryShows,
  DramaShows,
  KidsAndFamilyShows,
  MysteryShows,
  RealityShows,
  SciFiAndFantasyShows,
  TalkShows,
} from "../_src/components/tv-slider";
import Section from "@/components/custom/Section";

export default function ShowsPage() {
  return (
    <div className="space-y-8 py-4">
      <h1 className="ml-2">Explore Tv Shows</h1>

      <Section title="Action & Adventure">
        <Suspense fallback={<SpinnerProgress />}>
          <ActionAndAdventureShows />
        </Suspense>
      </Section>
      <Section title="Animation Picks">
        <Suspense fallback={<SpinnerProgress />}>
          <AnimatedShows />
        </Suspense>
      </Section>
      <Section title="Comedy Central">
        <Suspense fallback={<SpinnerProgress />}>
          <ComedyShows />
        </Suspense>
      </Section>
      <Section title="Crime Stories">
        <Suspense fallback={<SpinnerProgress />}>
          <CrimeShows />
        </Suspense>
      </Section>
      <Section title="Documentary Spotlight">
        <Suspense fallback={<SpinnerProgress />}>
          <DocumentaryShows />
        </Suspense>
      </Section>
      <Section title="Drama Essentials">
        <Suspense fallback={<SpinnerProgress />}>
          <DramaShows />
        </Suspense>
      </Section>
      <Section title="Kids & Family">
        <Suspense fallback={<SpinnerProgress />}>
          <KidsAndFamilyShows />
        </Suspense>
      </Section>
      <Section title="Mystery Vault">
        <Suspense fallback={<SpinnerProgress />}>
          <MysteryShows />
        </Suspense>
      </Section>
      <Section title="Reality Tv">
        <Suspense fallback={<SpinnerProgress />}>
          <RealityShows />
        </Suspense>
      </Section>
      <Section title="Sci-Fi & Fantasy">
        <Suspense fallback={<SpinnerProgress />}>
          <SciFiAndFantasyShows />
        </Suspense>
      </Section>
      <Section title="Talk Shows">
        <Suspense fallback={<SpinnerProgress />}>
          <TalkShows />
        </Suspense>
      </Section>
    </div>
  );
}
