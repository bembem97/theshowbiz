import Reviews from "../_src/components/reviews/Reviews";

export type ReviewSearchParamProps = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default function ReviewsPage({ searchParams }: PageProps<"/reviews">) {
  return (
    <>
      <Reviews searchParams={searchParams} />
    </>
  );
}
