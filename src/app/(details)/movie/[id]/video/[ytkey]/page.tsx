import MainMediaLayout from "@/app/(details)/_src/components/media/MainMediaLayout";
import ViewVideo from "@/app/(details)/_src/components/media/ViewVideo";

export default function VideoPage({
  params,
}: PageProps<"/movie/[id]/video/[ytkey]">) {
  const videoParam = params.then(({ ytkey }) => ({ id: ytkey }));

  return (
    <MainMediaLayout>
      <ViewVideo param={videoParam} />
    </MainMediaLayout>
  );
}
