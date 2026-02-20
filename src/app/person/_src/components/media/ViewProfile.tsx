import { BackdropImage } from "@/components/ui/image";
import { API_IMG } from "@/lib/constant";

interface ViewProfileProps {
  params: Promise<{pathname: string}>;
}

export default async function ViewProfile({ params }: ViewProfileProps) {
  const { pathname } = await params
  return (
    <>
      <BackdropImage
        alt=""
        className="object-contain"
        src={`${API_IMG}/${pathname}`}
      />
    </>
  );
}
