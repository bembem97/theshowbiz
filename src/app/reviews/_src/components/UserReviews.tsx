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
          async ({ content, createdAt, id, username, dbUserId, reaction }) => {
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

            const isActiveReaction = () => {
              return reaction.find(({ userId }) => userId === sessionUserId);
            };

            return (
              <Item
                render={<article />}
                key={id}
                variant="outline"
                className="gap-0 border-b p-0"
              >
                <ItemHeader className="p-2 pb-1">
                  <header className="text-muted-foreground flex items-start gap-x-1.5 gap-y-1">
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
                  </header>
                </ItemHeader>

                <ItemContent className="p-2 pt-1">
                  <p>{content}</p>
                </ItemContent>

                <ItemFooter className="space-between h-11.25 border-t p-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-x-1">
                      <IsHelpfulButton
                        reviewId={id}
                        userId={sessionUserId}
                        className={cn({
                          "text-primary":
                            isActivePos === true && isActiveReaction(),
                        })}
                      />
                      <span className="text-xs">{posRev.count} Helpful</span>
                    </div>

                    <div className="flex items-center gap-x-1">
                      <IsNotHelpfulButton
                        reviewId={id}
                        userId={sessionUserId}
                        className={cn({
                          "text-primary":
                            isActiveNeg === false && isActiveReaction(),
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
