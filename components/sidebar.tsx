"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  MenuIcon,
  ShieldCheckIcon,
} from "lucide-react";

import Logo from "./logo";
import { Button, buttonVariants } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const routes = [
  {
    name: "Home",
    href: "",
    icon: HomeIcon,
  },
  {
    name: "workflows",
    href: "Workflows",
    icon: Layers2Icon,
  },
  {
    name: "Credentials",
    href: "credentials",
    icon: ShieldCheckIcon,
  },
  {
    name: "Billing",
    href: "billing",
    icon: CoinsIcon,
  },
];
function DesktopSidebar() {
  const pathname = usePathname();
  const activePathname =
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0];

  return (
    <div
      className=" hidden md:block w-[280px]  h-screen overflow-hidden
        bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground
        border-r-2 border-separate">
      <div className=" flex items-center justify-center gap-2 border-b-[1px] p-4 border-separate ">
        <Logo />
      </div>
      <div className="p-2"> TODO CREDIT</div>
      <div className="flex flex-col p-2 gap-y-0.5 ">
        {routes.map((route) => (
          <Link
            className={buttonVariants({
              variant:
                activePathname.href === route.href
                  ? "sidebarItemActive"
                  : "sidebarItem",
            })}
            key={route.href}
            href={route.href}>
            <route.icon size={20} />
            {route.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DesktopSidebar;

export const MobileSidebar = () => {
  const [isOpen, setOpen] = React.useState(false);
  const pathname = usePathname();
  const activePathname =
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0];
  return (
    <div className="block border-separate  bg-background md:hidden">
      <nav className=" container flex items-center justify-between  px-1">
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-[400px] sm:w-[540px] space-y-4"
            side="left">
            <Logo />
            <div className="flex flex-col gap-1">
              {routes.map((route) => (
                <Link
                  onClick={() => setOpen(false)}
                  className={buttonVariants({
                    variant:
                      activePathname.href === route.href
                        ? "sidebarItemActive"
                        : "sidebarItem",
                  })}
                  key={route.href}
                  href={route.href}>
                  <route.icon size={20} />
                  {route.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};
