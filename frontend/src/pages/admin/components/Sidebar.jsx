/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Briefcase,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: 1, label: "Dashboard", icon: Home, link: "/admin" },
  { id: 2, label: "Users", icon: Users, link: "/admin/users" },
  { id: 3, label: "Projects", icon: Briefcase, link: "/admin/projects" },
  { id: 4, label: "Settings", icon: Settings, link: "/admin/settings" },
];

function Sidebar() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={cn(
        "h-screen bg-white shadow-lg transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between h-16 px-4">
          {isExpanded && (
            <h1 className="text-xl font-bold text-indigo-600">Admin</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn(
              "transition-all duration-300 ease-in-out",
              isExpanded ? "ml-auto" : "mx-auto"
            )}
          >
            {isExpanded ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </div>
        <nav className="flex-1 space-y-2 px-2 py-4">
          {menuItems.map((item) => (
            <Link key={item.id} to={item.link}>
              <span
                className={cn(
                  "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-150 ease-in-out mb-2",
                  location.pathname === item.link
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  !isExpanded && "justify-center"
                )}
              >
                <item.icon className={cn("h-5 w-5", isExpanded && "mr-3")} />
                {isExpanded && (
                  <span className="transition-opacity duration-300">
                    {item.label}
                  </span>
                )}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
