"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StarIcon, StarsIcon, XIcon } from "lucide-react";
import React, { use, useState, useTransition } from "react";
import {
  RatingActionProps,
  RatingButtonsProps,
  RatingScoreProps,
} from "../../types/my-rating";
import { useRouter } from "next/navigation";
import { AuthSessionContext } from "../../context/AuthSession";
import { RatedTitleDataContext } from "../../context/RatedTitleData";
import SignInLink from "@/module/auth/SignInLink";
import { Spinner } from "@/components/ui/spinner";
import {
  // deleteRating,
  // upsertRating,
  setRating,
} from "../../action/my-rating/cud";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function RatingButtons({
  className,
  setChange,
  defaultValue = 0,
  ...props
}: RatingButtonsProps) {
  const [ratingValue, setRatingValue] = useState<null | number>(defaultValue);
  const [onHover, setOnHover] = useState<null | number>(null);

  React.useEffect(() => {
    if (setChange) {
      setChange(ratingValue);
    }
  }, [setChange, ratingValue]);

  React.useEffect(() => {
    setRatingValue(defaultValue);
  }, [setRatingValue, defaultValue]);

  return (
    <div className={cn("flex items-center", className)} {...props}>
      {Array.from({ length: 10 }, (_, k) => {
        const index = k + 1;
        return (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            onMouseLeave={() => setOnHover(null)}
            onMouseEnter={() => setOnHover(index)}
            onClick={() =>
              setRatingValue((val) => (val === index ? null : index))
            }
            className="group hover:bg-[unset] dark:hover:bg-[unset]"
          >
            <StarIcon
              className={cn(
                "size-5 transition-transform group-hover:scale-135",
                index <= (onHover! || ratingValue!)
                  ? "fill-amber-400 stroke-amber-400 dark:fill-amber-600 dark:stroke-amber-600"
                  : "stroke-muted fill-muted",
              )}
            />
          </Button>
        );
      })}
    </div>
  );
}

export function RatingScore({ className, score, ...props }: RatingScoreProps) {
  return (
    <div
      className={cn(
        "bg-muted absolute -top-10 z-10 flex min-w-32 justify-center rounded-sm border p-2 shadow-sm",
        className,
      )}
      {...props}
    >
      {score ? (
        <span className="typography-h4 inline-flex items-center gap-x-1 text-white">
          <StarsIcon className="fill-amber-600 stroke-amber-600 dark:fill-amber-400 dark:stroke-amber-400" />
          {score}
        </span>
      ) : (
        <span className="typography-h4 inline-flex items-center gap-x-1 text-white">
          <StarsIcon className="fill-foreground" />
          Rate it
        </span>
      )}
    </div>
  );
}

export function RatingContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative isolate flex flex-col items-center gap-y-8 pt-6 pb-4.5",
        className,
      )}
      {...props}
    />
  );
}

export function CreateRatingAction({
  mediaType,
  titleId,
  dbRating,
  myRate,
}: RatingActionProps & { dbRating: number | null }) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = React.useState<{
    disabled: boolean;
    label: string;
  }>({
    label: "Submit",
    disabled: false,
  });
  const router = useRouter();
  const auth = use(AuthSessionContext);
  const { posterPath, title, year } = use(RatedTitleDataContext);

  if (!auth || auth.session === null) return <SignInLink />;

  const { id: userId } = auth.user;

  function handleRating() {
    startTransition(async () => {
      const result = await setRating({
        userId,
        myRate,
        titleId,
        mediaType,
        posterPath,
        title,
        year,
        dbRating,
      });

      if (result.success) {
        setResult({ disabled: false, label: "Submit" });
      } else {
        setResult({
          disabled: true,
          label: result.error || "Something went wrong.",
        });
      }

      router.refresh();
    });
  }

  return (
    <Button
      disabled={
        isPending ||
        result.disabled ||
        (Boolean(Number(dbRating)) === false &&
          Boolean(Number(myRate)) === false)
      }
      onClick={handleRating}
      variant="secondary"
    >
      {isPending ? <Spinner /> : result.label}
    </Button>
  );
}

// export function DeleteRatingAction({
//   mediaType,
//   myRate,
//   titleId,
// }: RatingActionProps) {
//   const [isPending, startTransition] = React.useTransition();
//   const [result, setResult] = React.useState<{
//     disabled: boolean;
//     label: string;
//   }>({
//     label: "Removie Rating",
//     disabled: false,
//   });
//   const router = useRouter();
//   const auth = use(AuthSessionContext);

//   if (!auth || auth.session === null) return null;

//   const { id: userId } = auth.user;

//   function handleRating() {
//     startTransition(async () => {
//       const result = await deleteRating({
//         userId,
//         titleId,
//         mediaType,
//       });

//       if (result.success) {
//         setResult({ disabled: false, label: "Remove Rating" });
//       } else {
//         setResult({
//           disabled: true,
//           label: result.error || "An error has occured.",
//         });
//       }

//       router.refresh();
//     });
//   }

//   return (
//     <Button
//       disabled={isPending || !Boolean(myRate) || result.disabled}
//       onClick={handleRating}
//       variant="ghost"
//     >
//       {isPending ? <Spinner /> : result.label}
//     </Button>
//   );
// }

export function RatingDialog({
  label,
  children,
}: {
  label: string | number;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="ghost" />}>
        <StarsIcon className="text-primary" />
        {label}
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="isolate">
        <DialogClose
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-2 right-2 z-10"
            />
          }
        >
          <XIcon />
        </DialogClose>
        <DialogTitle className="sr-only">Rate Title</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}
