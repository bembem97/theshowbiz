import React from "react";

export default function LayoutFavorite({
  children,
}: LayoutProps<"/favorites">) {
  return (
    <>
      <div className="scanlines border-b bg-slate-300 px-2 py-4 dark:bg-black">
        <h1>Your Favorite</h1>
        <h2 className="text-sm">
          Your favorite movie/show is the place to track the titles you like the
          most
        </h2>
      </div>
      {children}
    </>
  );
}
