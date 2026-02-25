import React from "react";

export default function LayoutReviews({ children }: LayoutProps<"/reviews">) {
  return (
    <>
      <div className="scanlines border-b bg-slate-300 px-2 py-4 dark:bg-black">
        <h1>Your Reviews</h1>
        <h2 className="text-sm">
          Your reviews is the place to track the titles you reviewed.
        </h2>
      </div>
      {children}
    </>
  );
}
