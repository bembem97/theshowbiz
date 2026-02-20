import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignInLink from "../SignInLink";
import { Avatar } from "@/components/ui/avatar";
import { PosterImage } from "@/components/ui/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOut from "../SignOut";

export default async function User() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    return <SignInLink />;
  }

  const { user } = session;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-7">
          <PosterImage
            width={200}
            height={200}
            alt={user.name}
            src={user.image || "/avatar.png"}
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
