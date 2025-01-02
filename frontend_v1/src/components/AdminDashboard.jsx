/* eslint-disable no-unused-vars */
import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Users, FolderKanban, LayoutDashboard } from "lucide-react";

export function AdminDashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar className="w-64 bg-gray-100 border-r">
        <SidebarHeader>
          <h2 className="text-2xl font-bold px-4 py-2">Admin Dashboard</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/admin" className="flex items-center">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/admin/users" className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/admin/projects" className="flex items-center">
                  <FolderKanban className="mr-2 h-4 w-4" />
                  Manage Projects
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <div className="flex-1 p-8 overflow-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
