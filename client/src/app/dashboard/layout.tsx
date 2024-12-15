
import DashboardSidebar from "@/components/dashboard-side-bar/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex justify-start">
            <div className="relative ">
                <SidebarProvider>
                    <DashboardSidebar/>
                </SidebarProvider>
            </div>
            <section className="w-full px-4">
                {children}
            </section>
        </main>
    )
}

export default Layout;