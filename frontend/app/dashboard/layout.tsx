import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getUserFromCookie } from "@/lib/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUserFromCookie();
  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Unauthorized Access</h1>
        <p className="mt-2">Please log in to access the dashboard.</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar user={userData} />
      <main className="relative flex-1 w-full h-full overflow-y-auto p-8">
        <SidebarTrigger className="absolute top-5 left-5" />
        {children}
      </main>
    </SidebarProvider>
  );
}
