"use client";

import { SearchMediaProps } from "@/app/api/search/_src/types";
import SpinnerProgress from "@/components/custom/SpinnerProgress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Route } from "next";
import Link from "next/link";
import React from "react";
import useSWR, { SWRResponse } from "swr";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useDebounce } from "use-debounce";
import { DialogClose } from "@/components/ui/dialog";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function SearchPanel() {
  const [query, setQuery] = React.useState<undefined | string>(undefined);

  const response: SWRResponse = useSWR(
    query
      ? `/api/search?query=${query ? encodeURIComponent(query) : null}`
      : null,
    fetcher,
    { revalidateOnFocus: false },
  );

  return (
    <>
      <SearchInput setQuery={setQuery} />
      <div className="scrollbar-thin h-full overflow-auto">
        <SearchResult query={query} response={response} />
      </div>
    </>
  );
}

export function SearchInput({
  setQuery,
}: {
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const [input, setInput] = React.useState<undefined | string>(undefined);
  const [value] = useDebounce(input, 300);
  const focusRef = React.useRef<null | HTMLInputElement>(null);

  React.useEffect(() => {
    const target = focusRef.current;
    if (target) target.focus();
  }, []);
  React.useEffect(() => setQuery(value), [value, setQuery]);

  return (
    <FieldSet>
      <FieldLegend>Quick Browse</FieldLegend>
      <FieldDescription className="sr-only">
        Search for movies, shows, or celebrities...
      </FieldDescription>

      <Field>
        <FieldLabel className="sr-only" htmlFor="checkout-7j9-card-name-43j">
          Search
        </FieldLabel>
        <Input
          ref={focusRef}
          onChange={(e) => setInput(e.target.value)}
          id="checkout-7j9-card-name-43j"
          placeholder="Type something..."
          required
          className="h-12"
        />
      </Field>
    </FieldSet>
  );
}

export function SearchResult({
  query,
  response,
}: {
  query: string | undefined;
  response: SWRResponse<SearchMediaProps[]>;
}) {
  const { data, error, isLoading } = response;

  if (isLoading) {
    return <SpinnerProgress />;
  }

  if (error instanceof Error) {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>{error.name}</AlertTitle>
        <AlertDescription>
          <p>{error.message}</p>
        </AlertDescription>
      </Alert>
    );
  } else if (typeof error === "string") {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertDescription>
          <p>{error}</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (data === undefined) {
    return (
      <Alert className="bg-inherit">
        <AlertDescription>
          Try searching popular movies, tv shows, celebrities
        </AlertDescription>
      </Alert>
    );
  }

  if (data.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>No search found.</AlertTitle>
        <AlertDescription>
          <p>
            No movies, TV shows, or celebrities matched your search for{" "}
            <span className="text-xs font-semibold text-wrap break-all text-white">
              &quot;{query}&quot;
            </span>
            . Try different keywords or refine your search.
          </p>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ItemGroup className="gap-y-0 pt-4">
      {data.map(({ info, type }, i1) => (
        <React.Fragment key={`${type}-${i1}`}>
          <span className="text-xs font-semibold uppercase">{type}</span>
          {info.map(({ id, media_type, pathname, subtext, title }, i2) => (
            <DialogClose
              key={`${i2}-${media_type}-${id}`}
              nativeButton={false}
              render={
                <Item
                  render={<Link href={`/${media_type}/${id}` as Route} />}
                />
              }
            >
              <>
                <ItemMedia>
                  <Avatar>
                    <AvatarImage src={pathname} />
                    <AvatarFallback>{title.charAt(0)}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent className="gap-1">
                  <ItemTitle>{title}</ItemTitle>
                  <ItemDescription>{subtext}</ItemDescription>
                </ItemContent>
              </>
            </DialogClose>
          ))}
        </React.Fragment>
      ))}
    </ItemGroup>
  );
}
