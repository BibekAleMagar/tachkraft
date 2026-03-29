import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../../ui/sidebar";
import { AppSidebar } from "../../common/AppSideBar";
import { Logout } from "../../common/Logout";
import { PropertyList } from "../../common/Property";

export default function Dashboard() {
  return (
    <>
      <PropertyList />
    </>
  );
}
