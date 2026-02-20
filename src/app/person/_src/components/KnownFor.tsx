import Link from "next/link";
import { KnownForProps } from "../types/star-credit-types";
import { PosterImage } from "@/components/ui/image";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  ItemGroup,
  ItemSeparator,
} from "@/components/ui/item";
import { Alert } from "@/components/ui/alert";

interface KnownForContentProps {
  data: KnownForProps[];
}

export default function KnownFor({ data }: KnownForContentProps) {
  return (
    <ItemGroup>
      {data.length > 0 ? (
        data.map(({ date, poster, role, title, episode_count }, i) => (
          <Item
            key={i}
            render={<li />}
            size="xs"
            className="[li]:hover:bg-muted w-fit p-1 [li]:transition-colors"
          >
            <article className="contents">
              <Link href={poster.href} className="contents">
                <ItemMedia>
                  <PosterImage
                    src={poster.src}
                    width={200}
                    height={300}
                    alt={title}
                    className="w-7 rounded-sm"
                  />
                </ItemMedia>
                <ItemContent className="gap-y-0 py-0">
                  <ItemTitle>
                    <h3 className="line-clamp-1 text-sm">{title}</h3>
                  </ItemTitle>
                  <div className="flex h-5 items-center gap-x-1">
                    <ItemDescription className="pr-1">{role}</ItemDescription>
                    <ItemSeparator orientation="vertical" />
                    <dl className="flex h-[inherit] items-center gap-x-1">
                      <div className="flex items-center gap-x-1 pr-1">
                        <dt className="sr-only">Date</dt>
                        <dd className="text-muted-foreground">{date}</dd>
                      </div>
                      {episode_count && (
                        <>
                          <ItemSeparator orientation="vertical" />
                          <div className="text-muted-foreground flex items-center gap-x-1">
                            <dt>Episodes: </dt>
                            <dd>{episode_count}</dd>
                          </div>
                        </>
                      )}
                    </dl>
                  </div>
                </ItemContent>
              </Link>
            </article>
          </Item>
        ))
      ) : (
        <Alert>No notable credits listed.</Alert>
      )}
    </ItemGroup>
  );
}
