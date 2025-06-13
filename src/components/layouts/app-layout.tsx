import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/ui/sidebar";

export function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}