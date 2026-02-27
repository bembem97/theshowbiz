"use cache";

import React from "react";
import {
  getMyReaction,
  getNegativeReactions,
  getPositiveReactions,
  getReviews,
} from "../db/read";
import {
  Item,
  ItemContent,
  ItemFooter,
  ItemHeader,
} from "@/components/ui/item";
import { formatDistance } from "date-fns";
import {
  IsHelpfulButton,
  IsNotHelpfulButton,
  ThreadActionDropdown,
} from "./action";
import { GetTitleAndTypeProps } from "../types";
import { cn } from "@/lib/utils";
import { ScoreBadge } from "@/components/custom/Badge";

export default async function UserReviews({
  mediaType,
  titleId,
  sessionUserId,
}: Omit<GetTitleAndTypeProps, "commentId"> & {
  sessionUserId: string | undefined;
}) {
  const reviews = await getReviews({ mediaType, titleId });

  return (
    <div className="space-y-4 divide-y">
      {reviews.length === 0 ? (
        <div className="min-h-36 p-2">
          <p className="text-muted-foreground text-xs italic">
            {"There's no review yet."}
          </p>
        </div>
      ) : (
        reviews.map(
          async ({ content, createdAt, id, username, dbUserId, rating }) => {
            const posRev = await getPositiveReactions({ reviewId: id });
            const negRev = await getNegativeReactions({ reviewId: id });
            const isActivePos = await getMyReaction({
              userId: sessionUserId,
              reviewId: id,
              isHelpful: true,
            });
            const isActiveNeg = await getMyReaction({
              userId: sessionUserId,
              reviewId: id,
              isHelpful: false,
            });

            const isUserReacted = dbUserId === sessionUserId;

            return (
              <Item
                render={<article />}
                key={id}
                variant="outline"
                className="gap-0 border-b p-0"
              >
                <ItemHeader className="p-2 pb-1">
                  <header className="text-muted-foreground flex flex-wrap items-center gap-x-1.5 gap-y-1">
                    <cite className="text-xs font-semibold not-italic">
                      {username}
                    </cite>
                    <span className="text-xs">&bull;</span>
                    <time dateTime={createdAt.toString()} className="text-xs">
                      {formatDistance(new Date(createdAt), new Date(), {
                        addSuffix: true,
                        includeSeconds: true,
                      })}
                    </time>
                    {rating && <span className="text-xs">&bull;</span>}
                    <ScoreBadge
                      value={rating}
                      className="border-none p-0 text-xs leading-0 text-inherit dark:text-inherit"
                    />
                  </header>
                </ItemHeader>

                <ItemContent className="p-2 pt-1">
                  <p>{content}</p>
                </ItemContent>

                <ItemFooter className="space-between h-11.25 border-t p-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-x-1">
                      {/*
                       * //*  Upvote Button
                       */}
                      <IsHelpfulButton
                        reviewId={id}
                        userId={sessionUserId}
                        className={cn({
                          "text-primary": isActivePos === true && isUserReacted,
                        })}
                      />
                      <span className="text-xs">{posRev.count} Helpful</span>
                    </div>

                    <div className="flex items-center gap-x-1">
                      {/*
                       * //*  Downvote Button
                       */}
                      <IsNotHelpfulButton
                        reviewId={id}
                        userId={sessionUserId}
                        className={cn({
                          "text-primary":
                            isActiveNeg === false && isUserReacted,
                        })}
                      />
                      <span className="text-xs">
                        {negRev.count} Not helpful
                      </span>
                    </div>
                  </div>
                  {sessionUserId === dbUserId && (
                    <ThreadActionDropdown
                      commentId={id}
                      mediaType={mediaType}
                      titleId={titleId}
                    />
                  )}
                </ItemFooter>
              </Item>
            );
          },
        )
      )}
    </div>
  );
}
