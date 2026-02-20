import ViewPhoto from "@/app/(details)/_src/components/media/ViewPhoto";
import InterceptedMediaModal from "@/app/@modal/(titles)/_src/components/InterceptedMediaModal";

export default function ImagePage({
  params,
}: PageProps<"/tv/[id]/imageviewer/[pathname]">) {
  return (
    <InterceptedMediaModal>
      {params.then(({ pathname }) => (
        <ViewPhoto pathname={pathname} />
      ))}
    </InterceptedMediaModal>
  );
}
