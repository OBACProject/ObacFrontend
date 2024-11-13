import React, { useState } from "react";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface DropMenuProps {
  menuName: string;
  menuIcon: React.ReactNode;
  href: string;
}

export default function DropMenu(menuData: DropMenuProps[]) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>About OBAC</NavigationMenuTrigger>
          <NavigationMenuContent>
            {menuData.map((menu) => (
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href={menu.href}
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-md">
                      {menu.menuIcon}
                    </div>
                    <span className="mt-3 text-lg font-bold text-primary">
                      {menu.menuName}
                    </span>
                  </a>
                </li>
              </ul>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
