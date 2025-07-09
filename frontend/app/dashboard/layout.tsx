'use client'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { useUserProfile } from "@/lib/hooks/user.queries";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useUserProfile()

  if(isLoading) {
    return null
  }

  if (!user) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Unauthorized Access</h1>
        <a href="/auth/login" className="mt-4">
          <Button>Log In</Button>
        </a>
        <p className="mt-2">Please log in to access the dashboard.</p>
      </div>
    )
  }

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
