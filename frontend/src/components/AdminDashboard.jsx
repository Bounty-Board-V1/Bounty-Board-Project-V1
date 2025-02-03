/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Users,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Menu,
} from "lucide-react";

export function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        className={`bg-white shadow-md transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-0 -ml-64"
        } md:ml-0 md:w-64 min-w-[240px]`}
      >
        <SidebarHeader>
          <h2 className="text-2xl font-bold px-4 py-6 text-center text-primary">
            Admin Dashboard
          </h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  to="/admin"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-primary transition-colors"
                >
                  <LayoutDashboard className="mr-3 h-5 w-5" />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  to="/admin/users"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-primary transition-colors"
                >
                  <Users className="mr-3 h-5 w-5" />
                  Manage Users
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  to="/admin/projects"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-primary transition-colors"
                >
                  <FolderKanban className="mr-3 h-5 w-5" />
                  Manage Projects
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  to="/admin/settings"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-primary transition-colors"
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-2 px-2 sm:py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Admin Dashboard
            </h1>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto py-4 px-2 sm:py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
