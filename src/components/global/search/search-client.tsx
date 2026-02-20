"use client";
import dynamic from "next/dynamic";

const SearchItems = dynamic(() => import("./panel"), { ssr: false });
export default SearchItems;
