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

import { DropMenuProps } from "@/resource/home/navbarData";

export default function DropMenu({
  menuData = [],
}: {
  menuData: DropMenuProps[];
}) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="text-white">
        {menuData.map((menu, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuTrigger className="text-base flex ">
              {menu.menuTopic}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="mt-0 bg-white">
              <ul className="w-[68rem] flex gap-5 p-3">
                {menu.menuList.map((item, index) => (
                  <ListItem
                  href={item.href}
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
        className="flex gap-0 justify-center items-center"
      >
        <a
          ref={ref}
          className={cn(
            "block select-none  rounded-md px-5 py-3 leading-none no-underline outline-none transition-colors hover:bg-[#e4f1f8] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="w-10 h-10 text-slate-600">{children}</div>
          <div className="text-md font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
