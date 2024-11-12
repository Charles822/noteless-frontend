import { NavLink, Link } from 'react-router-dom';
import React, { useContext } from "react";
import {
  Settings,
  Send,
  CirclePlus,
  GalleryVerticalEnd,
  Folder 
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import AuthContext from "../context/AuthContext";


function Sidenav() {
  //check to ensure the context is not undefined before accessing its properties
  const authContext = useContext(AuthContext);
  if (!authContext) {
      throw new Error("AuthContext must be used within an AuthProvider");
    }
    
  const { user } = authContext;

  return (
    <aside className="fixed justify-between top-14 w-14 h-auto inset-y-0 left-0 z-0 flex-col border-r bg-background flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to="/"
                end
                className={({ isActive }) => {
                  return isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground';
                }}
              >
                <GalleryVerticalEnd className="h-5 w-5" />
                <span className="sr-only">All Lists</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">All Lists</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to="/create-a-new-list"
                end
                className={({ isActive }) => {
                  return isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground';
                }}
              >
                <CirclePlus className="h-5 w-5" />
                <span className="sr-only">Create List</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Create List</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        { user ? (<TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to="/my-contents"
                end
                className={({ isActive }) => {
                  return isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground';
                }}
              >
                <Folder className="h-5 w-5" />
                <span className="sr-only">My Contents</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">My Contents</TooltipContent>
          </Tooltip>
        </TooltipProvider>) : null
      }
      </nav>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="mailto:charles@voxelai.ai?subject=About%20Noteless"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">Support</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">Ask me anything!</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  )
}

export default Sidenav;



