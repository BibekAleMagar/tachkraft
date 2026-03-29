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
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);

                return (
                  <SidebarMenuItem
                    key={link.name}
                    className={`rounded ${isActive ? "bg-indigo-600 text-white hover:bg-indigo-600" : ""}`}
                  >
                    <SidebarMenuButton asChild>
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
