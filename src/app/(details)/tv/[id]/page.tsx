import TvShowTitleDetails from "../../_src/components/titles/TvShowTitleDetails";
import { getShowDetailsAPI } from "../../_src/lib/getShowDetails";


export const generateMetadata = async ({
  params,
}: PageProps<"/tv/[id]">) => {
  const { id } = await params
  const data = await getShowDetailsAPI(id);

  return {
    title: data.details.title
  }
}

export default function DetailsPage({ params }: PageProps<"/tv/[id]">) {
  return (
    <div className="@container/details">
      {params.then(({ id }) => (
        <TvShowTitleDetails paramId={id} />
      ))}
    </div>
  );
}
