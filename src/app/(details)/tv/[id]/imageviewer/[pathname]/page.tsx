import MainMediaLayout from "@/app/(details)/_src/components/media/MainMediaLayout";
import ViewPhoto from "@/app/(details)/_src/components/media/ViewPhoto";

export default function ImagePage({
  params,
}: PageProps<"/tv/[id]/imageviewer/[pathname]">) {
  return (
    <MainMediaLayout>
      {params.then(({ pathname }) => (
        <ViewPhoto pathname={pathname} />
      ))}
    </MainMediaLayout>
  );
}
