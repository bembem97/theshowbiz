import { cn } from "@/lib/utils";
import React from "react";

interface IframeProps {
  src: string;
  width?: string;
  height?: string;
  title?: string;
  allow?: string;
  sandbox?: string;
  allowFullScreen?: boolean;
  loading?: "lazy" | "eager";
  style?: React.CSSProperties;
  className?: string;
}

function Iframe({
  src,
  width = "100%",
  height = "500px",
  title = "iframe",
  allow,
  sandbox,
  allowFullScreen = false,
  loading = "lazy",
  style,
  className,
}: IframeProps) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-video w-full overflow-hidden",
        className,
      )}
    >
      <iframe
        src={`https://www.youtube.com/embed/${src}`}
        width={width}
        height={height}
        title={title}
        allow={allow}
        sandbox={sandbox}
        allowFullScreen={allowFullScreen}
        loading={loading}
        style={style}
        className="size-full border-0"
      />
    </div>
  );
}

export default Iframe;
