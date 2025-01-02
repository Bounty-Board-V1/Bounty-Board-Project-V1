/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// Add a prop to determine if the user is a Poster
export function Navbar({ isPoster = true }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-gray-800">
                BountyBoard
              </span>
            </Link>
            {/* Navigation Links (hidden on mobile) */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white">
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              className="flex h-full w-full select-none flex-col justify-start rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              to="/my-projects"
                            >
                              <div className="mb-2 text-lg font-medium">
                                My Projects
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                View and manage your current projects
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        {isPoster && (
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                to="/create-project"
                              >
                                <div className="text-sm font-medium leading-none">
                                  Create Project
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Start a new project and find collaborators
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        )}
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              to="/search"
                            >
                              <div className="text-sm font-medium leading-none">
                                Search Projects
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Find projects that match your skills and
                                interests
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center">
            {/* User Menu */}
            <div className="ml-4 flex items-center">
              <UserMenu />
            </div>
            {/* Mobile menu button */}
            <div className="ml-2 -mr-2 flex items-center md:hidden">
              <Button
                variant="ghost"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="block h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink to="/">Home</MobileNavLink>
          <MobileNavLink to="/my-projects">My Projects</MobileNavLink>
          {isPoster && (
            <MobileNavLink to="/create-project">Create Project</MobileNavLink>
          )}
          <MobileNavLink to="/search">Search Projects</MobileNavLink>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    >
      {children}
    </Link>
  );
}
