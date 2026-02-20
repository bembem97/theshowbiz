import InterceptedMediaModal from "@/app/@modal/(titles)/_src/components/InterceptedMediaModal";
import ViewProfile from "@/app/person/_src/components/media/ViewProfile";

export default function ImagePage({
  params,
}: PageProps<"/person/[id]/profile/[pathname]">) {
  const _params = params.then((q) => ({ pathname: q.pathname }))
  return (
    <InterceptedMediaModal>
        <ViewProfile params={_params} />
    </InterceptedMediaModal>
  );
}
