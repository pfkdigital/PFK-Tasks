import DashboardSidebar from "@/components/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex justify-start">
            <div className="relative ">
                <SidebarProvider>
                    <DashboardSidebar />
                </SidebarProvider>
            </div>
            <section className="w-full px-2">
                {children}
            </section>
        </main>
    )
}

export default Layout;