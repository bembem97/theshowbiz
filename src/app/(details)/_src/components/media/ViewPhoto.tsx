import { BackdropImage } from "@/components/ui/image";
import { API_IMG } from "@/lib/constant";

interface ViewPhotoProps {
  pathname: string;
}

export default function ViewPhoto({ pathname }: ViewPhotoProps) {
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
