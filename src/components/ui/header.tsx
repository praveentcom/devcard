"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { PrefetchLink } from "@/components/ui/prefetch-link";
import { getNavigationItems, PROFILE_NAME } from "@/lib/helpers/config";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navigationItems = getNavigationItems();
  const isHomePage = pathname === "/";
  const nameHref = isHomePage ? "/about" : "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      const firstFocusableElement = document.querySelector(
        '[role="dialog"] button, [role="dialog"] a',
      );
      if (firstFocusableElement instanceof HTMLElement) {
        firstFocusableElement.focus();
      }
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {isMobileMenuOpen
          ? "Mobile navigation menu opened"
          : "Mobile navigation menu closed"}
      </div>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={cn(
          "transition-[background-color,border-color] duration-200 ease-out will-change-[background-color,border-color]",
          "sticky top-0 z-40 w-full border-b border-border md:border-transparent",
          isScrolled &&
            "md:border-border bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-sm",
        )}
      >
        <div className="page-container py-0">
          <div className="hidden md:flex items-center justify-between py-4 gap-5 h-16">
            <h1 className="text-md font-medium">
              <Link
                href={nameHref}
                aria-label={isHomePage ? "Go to about" : "Go to home"}
              >
                {PROFILE_NAME}
              </Link>
            </h1>
            <div className="flex gap-2 items-center">
              <div className="flex items-center">
                <AnimatedBackground
                  className="rounded-xs bg-card dark:bg-card/50 border border-border/75"
                  transition={{
                    type: "tween",
                    ease: "easeOut",
                    duration: 0.15,
                  }}
                  enableHover={true}
                >
                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href;
                    const isExternal = "external" in item && item.external;

                    if (isExternal) {
                      return (
                        <a
                          key={item.href}
                          data-id={item.href}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "px-3 py-1.5 rounded-xs text-sm font-medium",
                            "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          {item.label}
                        </a>
                      );
                    }

                    return (
                      <PrefetchLink
                        key={item.href}
                        data-id={item.href}
                        href={item.href}
                        className={cn(
                          "px-3 py-1.5 rounded-xs text-sm font-medium",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </PrefetchLink>
                    );
                  })}
                </AnimatedBackground>
              </div>
              <ThemeToggle minimal />
            </div>
          </div>
          <div className="flex items-center justify-between py-2.5 md:hidden">
            <h1 className="text-md font-medium">
              <Link
                href={nameHref}
                aria-label={isHomePage ? "Go to about" : "Go to home"}
              >
                {PROFILE_NAME}
              </Link>
            </h1>
            <div className="flex items-center">
              <ThemeToggle minimal />
              <Button
                variant="ghost"
                size="default"
                onClick={toggleMobileMenu}
                aria-label={"Mobile menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden transition-[visibility,opacity] duration-250 ease-out",
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <button
          type="button"
          className={cn(
            "fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-250 ease-out",
            isMobileMenuOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={toggleMobileMenu}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              toggleMobileMenu();
            }
          }}
          aria-label="Close mobile menu"
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className={cn(
            "fixed inset-x-0 top-0 z-50 bg-background shadow-lg border-b border-border transition-transform duration-250 ease-out will-change-transform",
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full",
          )}
        >
          <div className="page-container py-0">
            <div className="flex items-center justify-between py-2.5 border-b border-border">
              <h1 className="text-md font-medium">Menu</h1>
              <Button onClick={toggleMobileMenu} aria-label="Close mobile menu">
                <X className="size-5" />
              </Button>
            </div>
            <nav className="py-6">
              <div className="section-container">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href;
                  const isExternal = "external" in item && item.external;

                  if (isExternal) {
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={toggleMobileMenu}
                        className={cn(
                          "flex items-center justify-center px-3 py-2 text-sm font-medium rounded-sm transition-[color,background-color] duration-200 ease-out",
                          "text-foreground bg-muted border border-border",
                        )}
                      >
                        {item.label}
                      </a>
                    );
                  }

                  return (
                    <PrefetchLink
                      key={item.href}
                      href={item.href}
                      onClick={toggleMobileMenu}
                      className={cn(
                        "flex items-center justify-center px-3 py-2 text-sm font-medium rounded-sm transition-[color,background-color] duration-200 ease-out",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-foreground bg-muted border border-border",
                      )}
                    >
                      {item.label}
                    </PrefetchLink>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
