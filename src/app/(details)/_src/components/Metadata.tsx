import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/custom/DescriptionList";
import {
  BaseMetadataProps,
  MovieMetadataProps,
  ShowMetadataProps,
} from "../type/main-types";
import { Item, ItemContent, ItemMedia } from "@/components/ui/item";
import { Avatar } from "@/components/ui/avatar";
import { BackdropImage } from "@/components/ui/image";
import { KeywordProps } from "@/types/keywords";
import { Badge } from "@/components/ui/badge";

interface Props {
  data: ShowMetadataProps | MovieMetadataProps;
  keywords: KeywordProps[];
}

interface BaseProps {
  data: BaseMetadataProps;
  children: React.ReactNode;
  keywords: KeywordProps[];
}

export default function TitleMetadata({ data, keywords }: Props) {
  if ("budget" in data) {
    const { budget, revenue } = data;
    return (
      <BaseMetadata data={data} keywords={keywords}>
        <DescriptionTerm>Budget</DescriptionTerm>
        <DescriptionDetails>{budget}</DescriptionDetails>

        <DescriptionTerm>Revenue</DescriptionTerm>
        <DescriptionDetails>{revenue}</DescriptionDetails>
      </BaseMetadata>
    );
  }
  const { networks, total_episodes, total_seasons, type } = data;
  return (
    <BaseMetadata data={data} keywords={keywords}>
      <DescriptionTerm>Type</DescriptionTerm>
      <DescriptionDetails>{type}</DescriptionDetails>

      <DescriptionTerm>Total Episodes</DescriptionTerm>
      <DescriptionDetails>{total_episodes}</DescriptionDetails>

      <DescriptionTerm>Total Seasons</DescriptionTerm>
      <DescriptionDetails>{total_seasons}</DescriptionDetails>

      <DescriptionTerm>Networks</DescriptionTerm>
      {networks.map(({ name, id, logo_path }, i) => (
        <DescriptionDetails key={`${id}-${i}`}>
          <Item className="p-0">
            <ItemMedia>
              <Avatar className="overflow-clip">
                <BackdropImage alt={name} src={logo_path} />
              </Avatar>
            </ItemMedia>
            <ItemContent className="gap-y-0">{name}</ItemContent>
          </Item>
        </DescriptionDetails>
      ))}
    </BaseMetadata>
  );
}

function BaseMetadata({ children, data, keywords }: BaseProps) {
  const {
    date,
    // id,
    original_language,
    production_companies,
    production_countries,
    spoken_languages,
    status,
  } = data;
  return (
    <DescriptionList>
      <DescriptionTerm>Release Date</DescriptionTerm>
      <DescriptionDetails>{date}</DescriptionDetails>

      <DescriptionTerm>Status</DescriptionTerm>
      <DescriptionDetails>{status}</DescriptionDetails>

      <DescriptionTerm>Original Language</DescriptionTerm>
      <DescriptionDetails>
        {
          spoken_languages.find(
            ({ iso_639_1 }) => iso_639_1 === original_language,
          )?.english_name
        }
      </DescriptionDetails>

      <DescriptionTerm>Production Companies</DescriptionTerm>
      {production_companies.map(({ name, id, origin_country, logo_path }) => (
        <DescriptionDetails key={id}>
          <Item className="p-0">
            <ItemMedia>
              <Avatar className="overflow-clip">
                <BackdropImage alt={name} src={logo_path} />
              </Avatar>
            </ItemMedia>
            <ItemContent className="gap-y-0">
              <p className="text-xs leading-none">{name}</p>
              <span className="text-xs leading-none">{origin_country}</span>
            </ItemContent>
          </Item>
        </DescriptionDetails>
      ))}

      <DescriptionTerm>Production Countries</DescriptionTerm>
      {production_countries.map(({ name, iso_3166_1 }, i) => (
        <DescriptionDetails key={i}>
          {name} ({iso_3166_1})
        </DescriptionDetails>
      ))}

      <DescriptionTerm>Spoken Languages</DescriptionTerm>
      {spoken_languages.map(({ english_name, iso_639_1 }) => (
        <DescriptionDetails key={iso_639_1}>{english_name}</DescriptionDetails>
      ))}

      {children}

      <DescriptionTerm>Keywords</DescriptionTerm>
      <div className="flex w-full flex-wrap gap-1">
        {keywords.map(({ id, name }, i) => (
          <DescriptionDetails
            key={`${id}-${i}`}
            className="w-max shrink-0 grow-0 basis-auto"
          >
            <Badge variant="outline">{name}</Badge>
          </DescriptionDetails>
        ))}
      </div>
    </DescriptionList>
  );
}
