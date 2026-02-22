import { cn } from "@/lib/utils";

export default function BannerFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid h-44 animate-pulse grid-cols-1 grid-rows-1 border-b",
        className,
      )}
    >
      <div className="bg-muted" />
    </div>
  );
}
