import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-2">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p>
        Return to{" "}
        <Link href="/" className="underline">
          home
        </Link>
      </p>
    </div>
  );
}
