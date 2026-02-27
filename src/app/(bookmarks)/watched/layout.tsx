import React from "react";

export default function LayoutWatched({ children }: LayoutProps<"/watched">) {
  return (
    <>
      <div className="scanlines border-b bg-slate-300 px-2 py-4 dark:bg-black">
        <h1>Your Watch History</h1>
        <h2 className="text-sm">
          {
            "Everything you've marked as watched."
            // "Everything you've marked as watched, rated, reviewed, or checked into."
          }
        </h2>
      </div>
      {children}
    </>
  );
}
