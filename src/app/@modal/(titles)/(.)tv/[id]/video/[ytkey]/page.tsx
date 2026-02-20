import ViewVideo from "@/app/(details)/_src/components/media/ViewVideo";
import InterceptedMediaModal from "@/app/@modal/(titles)/_src/components/InterceptedMediaModal";

export default function VideoPage({
  params,
}: PageProps<"/tv/[id]/video/[ytkey]">) {
  const videoParam = params.then(({ ytkey }) => ({ id: ytkey }));

  return (
    <InterceptedMediaModal>
      <ViewVideo param={videoParam} />
    </InterceptedMediaModal>
  );
}
