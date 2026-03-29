import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./AppSideBar";
import { Logout } from "./Logout";
import { Button } from "../ui/button";
import { User, Shield } from "lucide-react";

export default function DashboardLayout() {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-slate-50/50">
        <AppSidebar />

        <main className="flex flex-1 flex-col h-full overflow-hidden">
          <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-white/80 px-4 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="cursor-pointer" />
            </div>

            <div className="flex items-center gap-4">
              <Button variant={"outline"}>
                <Shield /> {user?.role}
              </Button>
              <Button variant={"outline"}>
                <User /> <span>{user?.fullName}</span>
              </Button>
              <Logout />
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-2">
            <div className="mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
