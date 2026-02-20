"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "../ui/button";

interface Props extends React.ComponentProps<"p"> {
  content: string;
  ContainerProps?: React.HTMLProps<HTMLDivElement>;
  ButtonProps?: React.HTMLProps<HTMLButtonElement>;
  ContainerClassName?: string;
  lineClamp?: number;
}

export default function TextClamp(props: Props) {
  const {
    className,
    content,
    ButtonProps,
    ContainerProps,
    ContainerClassName,
    lineClamp = 5,
    ...rest
  } = props;
  const targetRef = React.useRef<null | HTMLParagraphElement>(null);

  const [collapse, setCollapse] = useState(false);
  const [isButtonShown, setIsButtonShown] = useState(false);

  React.useEffect(() => {
    const target = targetRef.current;

    const resizeObserver = new ResizeObserver(() => {
      if (target) {
        const computedStyles = window.getComputedStyle(target);
        const FONT_SIZE = parseFloat(
          computedStyles.getPropertyValue("font-size"),
        );

        const LINE_HEIGHT_PX = parseFloat(
          computedStyles.getPropertyValue("line-height"),
        );
        const LINE_HEIGHT = Number((LINE_HEIGHT_PX / FONT_SIZE).toFixed(2));
        const CLAMP_HEIGHT = LINE_HEIGHT * FONT_SIZE * lineClamp;

        if (CLAMP_HEIGHT >= target.scrollHeight) {
          setIsButtonShown(false);
        } else {
          setIsButtonShown(true);
        }
      }
    });

    if (target) {
      resizeObserver.observe(target);
    }

    return () => {
      if (target) {
        resizeObserver.unobserve(target);
      }
    };
  }, [setIsButtonShown, lineClamp]);

  return (
    <div
      className={cn("flex flex-col pb-2", ContainerClassName)}
      data-slot="text-clamp"
      {...ContainerProps}
    >
      <p
        {...rest}
        ref={targetRef}
        style={{ "--line": lineClamp } as React.CSSProperties}
        className={cn(
          "grow",
          collapse ? undefined : "line-clamp-(--line)",
          className,
        )}
      >
        {content}
      </p>

      {isButtonShown ? (
        <Button
          onClick={() => setCollapse((collapse) => !collapse)}
          className={cn(
            "float-end grow-0 self-end uppercase",
            ButtonProps?.className,
          )}
          variant="default"
        >
          {collapse ? "Read Less" : "Read More"}
        </Button>
      ) : null}
    </div>
  );
}
