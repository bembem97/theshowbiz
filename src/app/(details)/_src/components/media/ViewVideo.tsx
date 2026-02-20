import Iframe from "@/components/custom/Iframe";

interface ViewVideoProps {
  param: Promise<{ id: string }>;
}

export default async function ViewVideo({ param }: ViewVideoProps) {
  const { id } = await param;
  return (
    <div className="grid h-full">
      <Iframe src={id} className="aspect-auto h-full self-center" />
    </div>
  );
}
