"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import Form from "next/form";
import React, { useId } from "react";
import { createComment } from "../db/cud";
import { GetReviewTitleProps } from "../types";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import SignInLink from "@/module/auth/SignInLink";
import { Textarea } from "@/components/ui/textarea";

export default function CommentInput({
  mediaType,
  cookies,
  titleId,
}: GetReviewTitleProps) {
  const commentId = useId();
  const [input, setInput] = React.useState<undefined | string>(undefined);
  const [state, formAction, isPending] = React.useActionState(
    () =>
      input
        ? createComment({ content: input, mediaType, cookies, titleId })
        : null,
    { success: false, message: "" },
  );

  return (
    <Form action={formAction}>
      <FieldSet className="gap-y-2">
        <FieldLegend>Post a comment</FieldLegend>
        <FieldDescription className="sr-only">
          Share your thoughts or feedback on this post.
        </FieldDescription>

        {state && state.success === false && (
          <FieldError className="text-destructive text-sm">
            {state.message}
          </FieldError>
        )}

        <Field>
          <FieldLabel className="sr-only" htmlFor={`comment-${commentId}`}>
            Your comment
          </FieldLabel>
          <Textarea
            onChange={(e) => setInput(e.target.value)}
            id={`comment-${commentId}`}
            placeholder="Leave a review..."
            required
            className="h-12"
            disabled={isPending}
          />
        </Field>

        <Field className="w-max self-end">
          {cookies ? (
            <Button
              type="submit"
              size="lg"
              variant="secondary"
              className="min-w-36"
              disabled={isPending}
            >
              {isPending ? <Spinner /> : "Post"}
            </Button>
          ) : (
            <SignInLink />
          )}
        </Field>
      </FieldSet>
    </Form>
  );
}
