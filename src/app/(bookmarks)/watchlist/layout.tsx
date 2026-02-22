import React from "react";

export default function LayoutWatchlist({
  children,
}: LayoutProps<"/watchlist">) {
  return (
    <>
      <div className="scanlines border-b bg-slate-300 px-2 py-4 dark:bg-black">
        <h1>Your Watchlist</h1>
        <h2 className="text-sm">
          Your Watchlist is the place to track the titles you want to watch.
        </h2>
      </div>
      {children}
    </>
  );
}
