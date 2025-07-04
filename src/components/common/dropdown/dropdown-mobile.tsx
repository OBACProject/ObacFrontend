import { DropMenuProps } from "@/resource/home/navbarData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function DropDownMobile({
  menuData = [],
}: {
  menuData: DropMenuProps[];
}) {
  return (
    <div className="w-full">
      <NavigationMenu className="w-full max-w-none">
        <Accordion type="single" collapsible className="w-full">
          {menuData.map((menu, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="hover:bg-blue-900 py-1 px-4 rounded-xl duration-300 text-md w-full">
                {menu.menuTopic}
              </AccordionTrigger>
              <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <ul className="flex flex-col gap-2 py-1 px-2 w-full text-white">
                  {menu.menuList.map((item, subIndex) => (
                    <ListItem
                      href={item.href}
                      key={subIndex}
                      title={item.menuName}
                      children={item.menuIcon}
                    />
                  ))}
                </ul>
              </AccordionContent>

            </AccordionItem>
          ))}
        </Accordion>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="w-full">
      <NavigationMenuLink
        asChild
        className="flex gap-0 my-1 items-center w-full"
      >
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md px-5 py-2 leading-none no-underline outline-none transition-colors group hover:bg-zinc-500 duration-300 focus:bg-accent focus:text-accent-foreground w-full",
            className
          )}
          {...props}
        >
          <div className="w-8 h-8 text-white mr-4">{children}</div>
          <div className="text-sm font-medium mt-0.5 leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
