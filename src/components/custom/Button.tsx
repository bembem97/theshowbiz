"use client";

import { Route } from "next";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";

type ButtonActionProps = React.ComponentProps<typeof Button> & {
  route: Route;
};

export function ButtonBack(props: Omit<ButtonActionProps, "route">) {
  const router = useRouter();
  return (
    <Button variant="outline" {...props} onClick={() => router.back()}>
      {props.children || (
        <>
          <ChevronLeftIcon />
          Go Back
        </>
      )}
    </Button>
  );
}

export function ButtonReplace({
  children,
  route,
  ...props
}: ButtonActionProps) {
  const router = useRouter();
  return (
    <Button variant="outline" {...props} onClick={() => router.replace(route)}>
      {children}
    </Button>
  );
}

export function ButtonRedirect({
  children,
  route,
  ...props
}: ButtonActionProps) {
  const router = useRouter();
  return (
    <Button variant="outline" {...props} onClick={() => router.push(route)}>
      {children}
    </Button>
  );
}
