import getStars from "../lib/api";
import { PersonDetailsPoster } from "@/module/poster";
import Navigator from "@/components/custom/Pagination";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default async function Celebrities({
  query,
  totalPages,
}: {
  query: Promise<{ page: string | string[] | undefined }>;
  totalPages: number;
}) {
  const q = await query;
  const { page } = q;

  const toInt = Number(page);
  const IS_FIRST_PAGE = Boolean(page === undefined && Number.isNaN(toInt));
  const IS_WITHIN_RANGE = Boolean(toInt && toInt >= 1 && toInt <= 500);
  const IS_VALID = IS_FIRST_PAGE || IS_WITHIN_RANGE;

  if (IS_VALID === false) {
    notFound();
  }

  const currentPage = IS_WITHIN_RANGE && !Number.isNaN(toInt) ? toInt : 1;
  const stars = await getStars(currentPage);

  return (
    <>
      <div className="@container/grid flex flex-wrap justify-items-center gap-y-4 px-1.5">
        {stars.map((v) => (
          <div
            key={v.id}
            className="shrink-0 grow-0 basis-1/2 p-1 @md/grid:basis-1/3 @2xl/grid:basis-1/4 @4xl/grid:basis-1/5"
          >
            <PersonDetailsPoster data={v} />
          </div>
        ))}
      </div>
      <Separator />
      <Navigator currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
