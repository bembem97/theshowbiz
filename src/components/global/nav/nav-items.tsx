import React from "react";
import NavLink from "./nav-link";
import NavList, { BaseListItem, navList } from "./nav-list";
import { DrawerClose } from "@/components/ui/drawer";

interface NavItemsProps {
  isMobile?: boolean;
}

export default function NavItems({ isMobile }: NavItemsProps) {
  if (isMobile) {
    return (
      <div className="space-y-2 overflow-y-auto pt-4 *:[h2]:ml-2">
        <h2 className="typography-muted">Discover</h2>
        <nav>
          <NavList>
            {navList.discoveries.map(({ Icon, href, label }, i) => (
              <React.Fragment key={i}>
                <React.Suspense
                  fallback={<BaseListItem Icon={<Icon />} label={label} />}
                >
                  <DrawerClose asChild>
                    <NavLink href={href} Icon={<Icon />} label={label} />
                  </DrawerClose>
                </React.Suspense>
              </React.Fragment>
            ))}
          </NavList>
        </nav>
        <h2 className="typography-muted">Library</h2>
        <nav>
          <NavList>
            {navList.libraries.map(({ Icon, href, label }, i) => (
              <React.Fragment key={i}>
                <React.Suspense
                  fallback={<BaseListItem Icon={<Icon />} label={label} />}
                >
                  <DrawerClose asChild>
                    <NavLink href={href} Icon={<Icon />} label={label} />
                  </DrawerClose>
                </React.Suspense>
              </React.Fragment>
            ))}
          </NavList>
        </nav>
      </div>
    );
  }

  return (
    <div className="space-y-2 overflow-y-auto pt-4 *:[h2]:ml-2">
      <h2 className="typography-muted">Discover</h2>
      <nav>
        <NavList>
          {navList.discoveries.map(({ Icon, href, label }, i) => (
            <React.Fragment key={i}>
              <React.Suspense
                fallback={<BaseListItem Icon={<Icon />} label={label} />}
              >
                <NavLink href={href} Icon={<Icon />} label={label} />
              </React.Suspense>
            </React.Fragment>
          ))}
        </NavList>
      </nav>
      <h2 className="typography-muted">Library</h2>
      <nav>
        <NavList>
          {navList.libraries.map(({ Icon, href, label }, i) => (
            <React.Fragment key={i}>
              <React.Suspense
                fallback={<BaseListItem Icon={<Icon />} label={label} />}
              >
                <NavLink href={href} Icon={<Icon />} label={label} />
              </React.Suspense>
            </React.Fragment>
          ))}
        </NavList>
      </nav>
    </div>
  );
}
