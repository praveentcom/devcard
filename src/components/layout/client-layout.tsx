"use client";

import { HomeIcon, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "passport-ui/avatar";
import { Button } from "passport-ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "passport-ui/navigation-menu";
import { PageLayout } from "passport-ui/page-layout";
import { PrefetchLink } from "passport-ui/prefetch-link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "passport-ui/sidebar";
import { ThemeButton } from "passport-ui/theme-button";

import { profile } from "@/data/profile";

import { getNavigationItems } from "../helpers/config";
import { ScrollRestoration } from "../helpers/scroll-restoration";
import { URLS } from "../helpers/urls";
import { Footer } from "./footer";

function NameWidget({ showPicture }: { showPicture: boolean }) {
  return (
    <PrefetchLink href={URLS.HOME()}>
      <div className="flex items-center gap-2">
        <Avatar className={showPicture ? "" : "hidden md:block"} monochrome>
          <AvatarImage src={profile.image} />
          <AvatarFallback>
            {profile.firstName.charAt(0)}
            {profile.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h3>
          {profile.firstName} {profile.lastName}
        </h3>
      </div>
    </PrefetchLink>
  );
}

export function ClientLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile, toggleSidebar } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <PageLayout
      header={
        <div className="flex items-center justify-between -mx-2 md:mx-0">
          <div className="flex items-center gap-2">
            <Button
              data-slot="mobile-sidebar-trigger"
              variant="outline"
              className="md:hidden ml-1.5"
              disabled={!isMobile}
              onClick={() => {
                toggleSidebar();
              }}
            >
              <MenuIcon />
              <span className="sr-only">Open sidebar</span>
            </Button>
            <NameWidget showPicture={false} />
          </div>
          <div className="flex items-center gap-3">
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList className="gap-2">
                {getNavigationItems().map((link, index) => {
                  return (
                    <NavigationMenuItem key={`desktop-menu-item-${index}`}>
                      <NavigationMenuLink asChild>
                        <PrefetchLink href={link.href}>
                          {link.label}
                        </PrefetchLink>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="w-8">
              <ThemeButton minimal variant="ghost" align="end" size="medium" />
            </div>
          </div>
        </div>
      }
      headerOptions={{
        variant: "relaxed",
        sticky: true,
        blurred: true,
        revealStylesOnScroll: true,
      }}
      footer={<Footer />}
      footerOptions={{
        variant: "relaxed",
      }}
      sidebar={
        <Sidebar
          variant="sidebar"
          side="left"
          collapsible={true}
          blurred={false}
          mobileOnly={true}
        >
          <SidebarHeader className="group-data-[state=collapsed]:hidden">
            <div className="meta-container p-0.5">
              <NameWidget showPicture={true} />
            </div>
          </SidebarHeader>
          <SidebarContent className="min-w-64">
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === URLS.HOME()}
                    >
                      <PrefetchLink
                        href={URLS.HOME()}
                        className="font-medium"
                        onClick={handleLinkClick}
                      >
                        <HomeIcon />
                        Home
                      </PrefetchLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {getNavigationItems().map((link, index) => {
                    const normalizedPathname = pathname.replace(/\/$/, "");
                    const normalizedHref = link.href.replace(/\/$/, "");
                    const isActive = normalizedPathname === normalizedHref;

                    return (
                      <SidebarMenuItem key={`mobile-menu-item-${index}`}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <PrefetchLink
                            key={`mobile-menu-item-${index}`}
                            href={link.href}
                            onClick={handleLinkClick}
                            className="font-medium"
                          >
                            <link.Icon />
                            {link.label}
                          </PrefetchLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      }
    >
      <ScrollRestoration />
      {children}
    </PageLayout>
  );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ClientLayoutInner>{children}</ClientLayoutInner>
    </SidebarProvider>
  );
}
