import { ButtonBack } from "@/components/custom/Button";

export default function MainMediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col">
      <ButtonBack
        variant="ghost"
        className="mr-auto h-auto w-max shrink-0 grow-0 rounded-none border-none py-3"
      />

      <div className="relative shrink grow basis-full overflow-clip">
        {children}
      </div>
    </div>
  );
}
