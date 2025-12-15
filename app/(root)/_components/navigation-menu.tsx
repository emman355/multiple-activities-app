"use client";
import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { ACTIVITY } from "../_constants";

// Hamburger icon
const HamburgerIcon = (props: React.SVGAttributes<SVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
    />
  </svg>
);

export interface Navbar02NavItem {
  href?: string;
  label: string;
}
export interface Navbar02Props extends React.HTMLAttributes<HTMLElement> {
  navigationLinks?: Navbar02NavItem[];
}

const defaultNavigationLinks: Navbar02NavItem[] = [
  { href: `/${ACTIVITY.ACTIVITY_1.id}`, label: ACTIVITY.ACTIVITY_1.label },
  { href: `/${ACTIVITY.ACTIVITY_2.id}`, label: ACTIVITY.ACTIVITY_2.label },
  { href: `/${ACTIVITY.ACTIVITY_3.id}`, label: ACTIVITY.ACTIVITY_3.label },
  { href: `/${ACTIVITY.ACTIVITY_4.id}`, label: ACTIVITY.ACTIVITY_4.label },
  { href: `/${ACTIVITY.ACTIVITY_5.id}`, label: ACTIVITY.ACTIVITY_5.label },
];

export const Navbar02 = React.forwardRef<HTMLElement, Navbar02Props>(
  ({ navigationLinks = defaultNavigationLinks, ...props }, ref) => {
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768);
        }
      };
      checkWidth();
      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }, []);

    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      },
      [ref]
    );

    return (
      <header
        ref={combinedRef}
        className="sticky top-0 z-50 w-full bg-gray-900/95 backdrop-blur supports-backdrop-filter:bg-gray-900/60 px-4 md:px-6 **:no-underline"
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Mobile menu */}
            {isMobile && (
              <Popover open={menuOpen} onOpenChange={setMenuOpen}>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="bg-gray-700 w-fit"
                >
                  <NavigationMenu>
                    <NavigationMenuList className="flex flex-col items-center">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index}>
                          <Link
                            href={link.href || "#"}
                            className="flex items-center rounded-md px-3 py-2 text-md font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline"
                            onClick={() => setMenuOpen(false)} // close dropdown
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}

            {/* Desktop nav */}
            {!isMobile && (
              <NavigationMenu className="flex">
                <NavigationMenuList className="gap-6">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <Link
                        href={link.href || "#"}
                        className="cursor-pointer"
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>
        </div>
      </header>
    );
  }
);

Navbar02.displayName = "Navbar02";
export { HamburgerIcon };
