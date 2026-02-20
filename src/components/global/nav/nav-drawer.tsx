import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon, XIcon } from "lucide-react";
import NavItems from "./nav-items";

export default function NavDrawer(props: React.ComponentProps<typeof Button>) {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="secondary" size="icon" {...props}>
          <MenuIcon />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="**:data-[slot=base-list-item]:py-2">
        <div className="flex justify-end border-b px-2 py-4">
          <DrawerClose>
            <XIcon />
          </DrawerClose>
        </div>
        <DrawerTitle className="sr-only">
          Discover movies, shows, or celebrities; or take a look at your saved
          lists.
        </DrawerTitle>
        <NavItems isMobile />
      </DrawerContent>
    </Drawer>
  );
}
