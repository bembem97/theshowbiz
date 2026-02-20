import MovieTitleDetails from "../../_src/components/titles/MovieTitleDetails";
import { getMovieDetailsAPI } from "../../_src/lib/getMovieDetails";

export const generateMetadata = async ({
  params,
}: PageProps<"/movie/[id]">) => {
  const { id } = await params
  const data = await getMovieDetailsAPI(id);

  return {
    title: data.details.title
  }
}

export default async function DetailsPage({
  params,
}: PageProps<"/movie/[id]">) {
  return (
    <div className="@container/details">
      {params.then(({ id }) => (
        <MovieTitleDetails paramId={id} />
      ))}
    </div>
  );
}
