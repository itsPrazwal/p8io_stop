import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative flex-1 w-full h-full overflow-y-auto p-8">
        <SidebarTrigger className="absolute top-5 left-5" />
        {children}
      </main>
    </SidebarProvider>
  )
}