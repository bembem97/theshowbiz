import { notFound } from "next/navigation";

export interface ApiErrorProps {
  status_code: number | string;
  status_message: string;
}

/**
 * Fetches data with a mandatory timeout.
 * @template T The expected shape of the JSON response
 * @param url The endpoint to hit
 * @param timeout Duration in milliseconds before aborting (default 5000)
 */
export async function extFetch<T>(url: string, timeout: number = 15000) {
  try {
    // 1. Create the signal with a specific timeout
    const response: Response = await fetch(url, {
      signal: AbortSignal.timeout(timeout),
    });

    // Check if the HTTP status is okay (200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: T = await response.json();
    // console.log("Success:", data);
    return data;
  } catch (err: unknown) {
    // 2. Type guard to handle the 'unknown' error type
    if (err instanceof Error) {
      if (err.name === "TimeoutError") {
        // console.error(`Request timed out after ${timeout}ms`);
        throw new Error(`Request timed out after ${timeout}ms`);
      } else if (err.name === "AbortError") {
        // console.error("Request was manually cancelled.");
        throw new Error(`Request was manually cancelled.`);
      } else {
        // console.error("Fetch error:", err.message);
        // throw new Error(`Fetch error: ${err.message}`);
        notFound();
      }
    } else {
      // console.error("An unexpected error occurred", err);
      throw new Error(`An unexpected error occurred. ${err}`);
    }
  }
}

// export async function extFetch<T>(
//   input: string | Request | URL,
//   init?: RequestInit | undefined,
// ) {
//   const response: Response = await fetch(input, init);

//   if (!response.ok) {
//     const error = (await response.json()) as ApiErrorProps;
//     throw new Error(`Code ${error.status_code}. ${error.status_message}`);
//   }

//   const data = await response.json();

//   return data as T;
// }

// export function isApiError(obj: unknown): obj is ApiErrorProps {
//   return (
//     typeof obj === "object" &&
//     obj !== null &&
//     "status_code" in obj &&
//     "status_message" in obj &&
//     typeof (
//       (obj as Record<string, unknown>).status_code === "number" ||
//       typeof (obj as Record<string, unknown>).status_code === "string"
//     ) &&
//     typeof (obj as Record<string, unknown>).status_message === "string"
//   );
// }
