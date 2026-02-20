// import SpinnerProgress from "@/components/custom/SpinnerProgress";

export default function BannerFallback() {
  return (
    <div className="grid h-44 grid-cols-1 grid-rows-1 border-b animate-pulse">
      {/* <SpinnerProgress /> */}
      <div className="bg-muted" />
    </div>
  );
}
