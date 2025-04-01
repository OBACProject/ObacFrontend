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
      <NavigationMenuList className="text-white  lg:flex md:flex hidden  ">
        {menuData.map((menu, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuTrigger className="  w-full py-0 lg:py-0 md:py-0 sm:py-1 px-4 h-8 md:h-fit lg:h-fit rounded-none duration-300 font-prompt_Light  text-sm lg:text-md md:text-md">
              {menu.menuTopic}
              <NavigationMenuContent className="top-full  bg-zinc-700/30 backdrop-blur-lg rounded-sm">
                <ul className="gap-2 lg:py-0 lg:text-md  md:py-1 py-0 px-0  lg:px-1 md:px-2 text-white  font-prompt_Light">
                  {menu.menuList.map((item, index) => (
                    <ListItem
                      href={item.href}
                      key={index}
                      title={item.menuName}
                      children={item.menuIcon}
                    />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuTrigger>
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
        className="flex gap-0 my-0 lg:my-1 md:my-1   text-start items-center"
      >
        <a
          ref={ref}
          className={cn(
            "block select-none  rounded-md px-1 lg:px-5 py-0 lg:py-2 leading-none no-underline outline-none group hover:bg-gray-700/40 hover:backdrop-blur-sm  focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="w-8 h-4 lg:h-8 md:h-8 text-white mr-4">{children}</div>
          <div className="text-sm font-medium mt-0.5 leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
