import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Heart, LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar() {
  const { pathname } = useLocation();

  const links = [
    { name: "Property", href: "/property", icon: LayoutDashboard },
    {
      name: "Favourites",
      href: "/favourite",
      icon: Heart,
    },
  ];

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex justify-center mb-4">
            <img src="/logo.svg" alt="logo" className="h-24 w-24" />
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => {
                return (
                  <SidebarMenuItem key={link.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        pathname === link.href ||
                        pathname.startsWith(`${link.href}/`)
                      }
                      className="data-[active=true]:bg-indigo-600 data-[active=true]:text-white "
                    >
                      <Link to={link.href}>
                        <link.icon />
                        <span>{link.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
