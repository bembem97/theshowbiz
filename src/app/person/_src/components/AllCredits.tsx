import { extFetch } from "@/lib/fetch";
import {
  // BaseCreditProps,
  // BaseCreditProps,
  BaseCreditProps,
  StarDetailsProps,
} from "../types/star-credit-types";
import { API_KEY, API_URL } from "@/lib/constant";
import getAllCredits from "../lib/getAllCredits";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemSeparator, ItemTitle } from "@/components/ui/item";
import Link from "next/link";
import { PosterImage } from "@/components/ui/image";
import { DateBadge } from "@/components/custom/Badge";

interface AllCreditsProps {
  params: Promise<{ starId: string }>;
}

interface TimelineProps { 
  data:{
    upcoming: BaseCreditProps[];
    previous: BaseCreditProps[];
  }
}

export default async function AllCredits({ params }: AllCreditsProps) {
  const { starId } = await params;
  const r = await extFetch<
    Pick<StarDetailsProps, "combined_credits" | "known_for_department">
  >(
    `${API_URL}person/${starId}?language=en-US&api_key=${API_KEY}&append_to_response=combined_credits`,
  );
  const credits = getAllCredits({
    data: r.combined_credits,
    knownFor: r.known_for_department,
  });
  
  return (
    <div className="space-y-4 p-2">
      <h2>All Credits</h2>

      {credits.map(({ department, timePeriod }, deptIdx) => (
        <section key={deptIdx} aria-labelledby={`dept-${deptIdx}`}>
          <h3 id={`dept-${deptIdx}`} className="capitalize">
            {department}
          </h3>

          <Timeline data={timePeriod} />
        </section>        
      ))}
    </div>
  );
}

function Timeline({ data }: TimelineProps) {
  const credits = data as {
    upcoming: BaseCreditProps[];
    previous: BaseCreditProps[];
  };

  return <div> 
    <Accordion defaultValue={["previous"]}>
      <AccordionItem value="upcoming">
        <AccordionTrigger>
          <h4>Upcoming</h4>
        </AccordionTrigger>

        <AccordionContent className="**:[a]:underline-offset-0 **:[a]:no-underline">
          <ul>
            {credits.upcoming.map((value, index) => (
              <CreditItem key={index} data={value} />
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="previous">
        <AccordionTrigger>
          <h4>Previous</h4>
        </AccordionTrigger>

        <AccordionContent className="**:[a]:underline-offset-0 **:[a]:no-underline">
          <ul>
            {credits.previous.map((value, index) => (
              <CreditItem key={index} data={value} />
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion> 
  </div>
}

function CreditItem({ data }: { data: BaseCreditProps }) {
  const { poster, title, year, role, episodeCount } = data
  return  <li>
    <>
      <Link href={poster.href}>
        <Item
          render={<article />}
          size="xs"
          className="hover:bg-muted w-fit transition-colors"
        >
          <ItemMedia>
            <PosterImage
              src={poster.src}
              width={200}
              height={300}
              alt={title}
              className="w-7 rounded-sm"
            />
          </ItemMedia>
          <ItemContent className="gap-y-0">
            <ItemTitle>
              <h3 className="line-clamp-1 text-sm">{title}</h3>
            </ItemTitle>
            <div className="flex h-5 items-center gap-x-1">
              <ItemDescription className="pr-1 mb-0!">{role}</ItemDescription>
              {year && <ItemSeparator orientation="vertical" />}
              <dl className="flex h-[inherit] items-center gap-x-1">
                <div className="flex items-center gap-x-1 pr-1">
                  <dt className="sr-only">Date</dt>
                  <dd className="text-muted-foreground">
                    <DateBadge className="px-0" value={year} />
                  </dd>
                </div>
                {episodeCount && (
                  <>
                    <ItemSeparator orientation="vertical" />
                    <div className="text-muted-foreground flex items-center gap-x-1">
                      <dt>Episodes: </dt>
                      <dd>{episodeCount}</dd>
                    </div>
                  </>
                )}
              </dl>
            </div>
          </ItemContent>
        </Item>
      </Link>
    </>
  </li>
}