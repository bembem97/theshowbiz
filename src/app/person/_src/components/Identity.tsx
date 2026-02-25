import { ImageLink } from "@/components/custom/Link";
import { IdentityProps, KnownForProps } from "../types/star-credit-types";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/custom/DescriptionList";
import KnownFor from "./KnownFor";
import TextClamp from "@/components/custom/TextClamp";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

interface PersonIdentityProps {
  identity: IdentityProps;
  knownFor: KnownForProps[];
}

export default function Identity({ identity, knownFor }: PersonIdentityProps) {
  const {
    name,
    profile,
    lifetime: { birthPlace, birthdate, deceased },
    knownForDept,
    bio,
    id,
  } = identity;
  return (
    <div className="identity-layout gap-x-2 gap-y-4 border-b p-2">
      <div className="title justify-self-center @xl/star:justify-self-start">
        <h1>{name}</h1>
      </div>

      <div className="life space-y-1">
        <DescriptionList className="p-0">
          <div>
            <DescriptionTerm>Birth date</DescriptionTerm>
            <DescriptionDetails>{birthdate || "-"}</DescriptionDetails>
          </div>
          {deceased && (
            <div>
              <DescriptionTerm>Deceased</DescriptionTerm>
              <DescriptionDetails>{deceased}</DescriptionDetails>
            </div>
          )}
          <div>
            <DescriptionTerm>Birth place</DescriptionTerm>
            <DescriptionDetails>{birthPlace || "-"}</DescriptionDetails>
          </div>
          <div>
            <DescriptionTerm>Known for</DescriptionTerm>
            <DescriptionDetails className="gap-x-1">
              Well-known in the{" "}
              <span className="leading-0 font-bold tracking-wide text-white">
                {knownForDept}
              </span>{" "}
              community.
            </DescriptionDetails>
          </div>
        </DescriptionList>
      </div>

      <div
        role="group"
        className="group profile relative isolate justify-self-center @xl/star:justify-self-start"
      >
        <ImageLink
          alt={name}
          src={profile.src}
          href={profile.href}
          className="aspect-2/3 w-60 @md/star:w-40 @xl/star:w-48 @4xl/star:w-56"
        />
        <Button
          nativeButton={false}
          variant="secondary"
          className="absolute right-2 bottom-4 z-10 w-max"
          render={<Link href={`/person/${id}/photos`} />}
        >
          Photos
          <PlusIcon />
        </Button>
      </div>

      <div className="known">
        <h2 className="text-sm">Known For</h2>
        <KnownFor data={knownFor} />
      </div>

      <div className="bio">
        <TextClamp content={bio} />
      </div>
    </div>
  );
}
