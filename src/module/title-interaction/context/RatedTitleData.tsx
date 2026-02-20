"use client";

import React from "react";
import { RatedTitleDataProps } from "../types/my-rating";

export const RatedTitleDataContext = React.createContext<RatedTitleDataProps>({
  posterPath: "",
  title: "",
  year: "",
});

export function RatedTitleDataProvider({
  children,
  titleData,
}: {
  children: React.ReactNode;
  titleData: RatedTitleDataProps;
}) {
  return (
    <RatedTitleDataContext value={titleData}>{children}</RatedTitleDataContext>
  );
}
