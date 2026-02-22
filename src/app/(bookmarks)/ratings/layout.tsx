import React from "react";

export default function LayoutRatings({ children }: LayoutProps<"/ratings">) {
  return (
    <>
      <div className="scanlines border-b bg-slate-300 px-2 py-4 dark:bg-black">
        <h1>Your Ratings</h1>
        <h2 className="text-sm">
          This page compiles a list of titles you have rated, providing a
          convenient overview of all your ratings.
        </h2>
      </div>
      {children}
    </>
  );
}
