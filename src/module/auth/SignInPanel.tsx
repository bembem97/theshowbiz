import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GoogleSignIn } from "./GoogleSignIn";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { permanentRedirect } from "next/navigation";

export default async function SignInPanel({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (session) {
    permanentRedirect("/");
  }

  return (
    <Card
      className={cn("mx-auto w-full max-w-xl bg-transparent", className)}
      {...props}
    >
      <CardContent className="grid grid-cols-1 gap-y-4 p-0 xl:grid-cols-2 xl:divide-x">
        <div className="space-y-4 border-b px-4 pb-4 xl:border-b-0 xl:pb-0">
          <h1>Sign In</h1>
          <GoogleSignIn />
        </div>

        <div className="space-y-2 p-2">
          <div>
            <h2 className="typography-p text-sm">
              Rate and review what you watch
            </h2>
            <p className="text-muted-foreground text-xs">
              Share your opinions, rate movies and shows, and help others
              discover great content through your reviews.
            </p>
          </div>
          <div>
            <h2 className="typography-p text-sm">
              Build and manage your watchlist
            </h2>
            <p className="text-muted-foreground text-xs">
              {
                "Save movies and series to watch later and keep track of what you’ve already seen, all in one place."
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
