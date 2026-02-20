import ThreadSession from "./ThreadSession";

export default function Thread({
  mediaType,
  params,
}: {
  mediaType: "movie" | "tv";
  params: Promise<{
    titleId: string;
  }>;
}) {
  return <ThreadSession mediaType={mediaType} params={params} />;
}
