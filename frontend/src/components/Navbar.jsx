/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import { Button } from "@/components/ui/button";
import { Menu, PlusCircle } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { user } = useAuth(); // Fetch authenticated user data
  const isPoster = user?.role === "Poster"; // Check if the user is a Poster
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-gray-800">
                BountyBoard
              </span>
            </Link>
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
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              to="/my-projects"
                            >
                              <div className="mb-2 mt-4 text-lg font-medium">
                                My Projects
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                View and manage your current projects
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
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
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              to="/team-management"
                            >
                              <div className="text-sm font-medium leading-none">
                                Team Management
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Manage your teams and team members
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
            {isPoster && (
              <Link to="/create-project">
                <Button variant="outline" size="sm" className="mr-4">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Project
                </Button>
              </Link>
            )}
            <div className="ml-4 flex items-center">
              <UserMenu />
            </div>
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

      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink to="/">Home</MobileNavLink>
          <MobileNavLink to="/my-projects">My Projects</MobileNavLink>
          {isPoster && (
            <MobileNavLink to="/create-project">Create Project</MobileNavLink>
          )}
          {isPoster && (
            <MobileNavLink to="/create-post">Create Post</MobileNavLink>
          )}
          <MobileNavLink to="/search">Search Projects</MobileNavLink>
          <MobileNavLink to="/team-management">Team Management</MobileNavLink>
        </div>
      </div>
    </nav>
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
