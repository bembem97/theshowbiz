import { ButtonBack } from "@/components/custom/Button";
import getCreditsAPI from "@/app/person/_src/lib/getCreditsAPI";

interface MediaLayoutProps {
  params: Promise<{
    starId: string;
  }>;
}

export default async function StarBanner({
  params,
}: MediaLayoutProps) {
  const { starId } = await params;
  const { identity: star } = await getCreditsAPI(starId);

  return (
    <div className="scanlines relative isolate min-h-44 space-y-2 border-b p-2">
      <div className="scanlines -z-10 absolute inset-0" />
      <ButtonBack />
      <h1>{star.name}</h1>
      <h2 className="text-muted-foreground typography-span text-xs">
        Profile Pictures
      </h2>
    </div>
  );
}
