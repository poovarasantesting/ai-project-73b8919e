import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Home, Settings, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {/* Mobile menu button - only visible on small screens */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar} 
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        {collapsed ? <Menu /> : <X />}
      </Button>

      <div
        className={cn(
          "flex flex-col h-screen bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300",
          collapsed ? "w-0 -translate-x-full" : "w-64",
          "md:translate-x-0 md:w-64",
          "fixed md:sticky top-0 left-0 z-40",
          className
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold">My App</h1>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-auto p-3 space-y-1">
          <SidebarItem to="/" icon={<Home className="mr-2 h-5 w-5" />}>
            Home
          </SidebarItem>
          <SidebarItem to="/profile" icon={<User className="mr-2 h-5 w-5" />}>
            Profile
          </SidebarItem>
          <SidebarItem to="/settings" icon={<Settings className="mr-2 h-5 w-5" />}>
            Settings
          </SidebarItem>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
              <User className="h-6 w-6 text-slate-500 dark:text-slate-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">john@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface SidebarItemProps {
  to: string;
  icon?: ReactNode;
  children: ReactNode;
}

function SidebarItem({ to, icon, children }: SidebarItemProps) {
  return (
    <Link
      to={to}
      className="flex items-center p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}