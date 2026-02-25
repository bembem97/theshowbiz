"use client";

import React from "react";
import {
  CreateRatingAction,
  // DeleteRatingAction,
  RatingButtons,
  RatingContainer,
  RatingScore,
} from "./components";
import { RatingProps } from "../../types/my-rating";

export default function Rating({
  mediaType,
  titleId,
  defaultValue = 0,
}: RatingProps & { defaultValue?: number }) {
  const [value, setValue] = React.useState<null | number>(defaultValue);

  React.useEffect(() => {
    setValue(defaultValue);
  }, [setValue, defaultValue]);

  return (
    <RatingContainer>
      <RatingScore score={value || null} />
      <RatingButtons defaultValue={value || null} setChange={setValue} />

      <div className="grid w-full grid-cols-1 gap-x-2">
        <CreateRatingAction
          mediaType={mediaType}
          myRate={value || null}
          titleId={titleId}
          dbRating={defaultValue}
        />
      </div>
    </RatingContainer>
  );
}
