import { API_KEY, API_URL } from "@/lib/constant";
import { extFetch } from "@/lib/fetch";
import { ShowbizApiResponse } from "@/types/showbiz";
import { NextRequest } from "next/server";
import getShowbiz from "./_src/lib";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const getQuery = searchParams.get("query") || "";
  const query = encodeURIComponent(getQuery);

  try {
    const response = await extFetch<ShowbizApiResponse>(
      `${API_URL}search/multi?query=${query}&api_key=${API_KEY}&include_adult=false&language=en-US&page=1`,
    );
    const { results } = response;

    const data = getShowbiz(results);
    return Response.json(data);
  } catch (err) {
    if (err instanceof Error) {
      return Response.json({ message: err.message, name: err.name });
    } else {
      return Response.json("Unknown error has occured.");
    }
  }
}
