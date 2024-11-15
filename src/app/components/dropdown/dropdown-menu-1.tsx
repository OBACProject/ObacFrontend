import React, { useState } from "react";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface DropMenuList {
  menuName: string;
  menuIcon: React.ReactNode;
  tab: string;
}

interface DropMenuProps {
  menuTopic: string;
  href: string;
  menuList: DropMenuList[];
}

export default function DropMenu({
  menuData = [],
}: {
  menuData: DropMenuProps[];
}) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="text-white p-4">
        {menuData.map((menu, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuTrigger className="text-xl flex ">
              {menu.menuTopic}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-[#FFFBF8]">
              <ul className="w-[68rem] flex gap-10 p-12">
                {menu.menuList.map((item, index) => (
                  <ListItem
                    key={index}
                    title={item.menuName}
                    children={item.menuIcon}
                  ></ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink
        asChild
        className="flex gap-4 p-2 justify-center items-center"
      >
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="w-10 h-10 text-slate-600">{children}</div>
          <div className="text-lg font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
