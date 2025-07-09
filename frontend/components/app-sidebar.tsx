"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { NAVIGATIONS } from "@/lib/constants/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useLogout } from "@/lib/hooks/auth.queries";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserProfile } from "@/lib/hooks/user.queries";

export function AppSidebar() {
  const { data: user } = useUserProfile();
  const { mutate: logout } = useLogout();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroup>
          <h2>P8IO STOP</h2>
        </SidebarGroup>
        <SidebarSeparator />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{user.type} DASHBOARD</SidebarGroupLabel>
          <SidebarSeparator className="mb-4" />
          <SidebarMenu>
            {NAVIGATIONS.filter((item) =>
              user.type === "USER" ? !item.onlyProvider : true,
            ).map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarFooter className="absolute bottom-0 left-0 right-0 p-4">
          <SidebarSeparator />
          <div className="flex items-center justify-between">
            <div
              title={
                user.isCompany
                  ? user.companyName
                  : `${user.firstName} ${user.lastName}`
              }
              className="flex items-center justify-center cursor-pointer hover:scale-120 transition-all h-8 w-8 border border-green-300 bg-green-100 rounded-full text-gray-700 text-xl uppercase"
            >
              {user.isCompany
                ? user.companyName?.substring(0, 1)
                : user.firstName?.substring(0, 1)}
            </div>
            <Dialog>
              <DialogTrigger>
                <Button variant="outline">
                  <LogOut /> Log Out
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Logging Out ?</DialogTitle>
                  <DialogDescription>
                    You will be logged out from your account. Are you sure you
                    want to proceed?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => logout()}>
                    Yes, Log Out
                  </Button>
                  <DialogTrigger>
                    <Button type="button">Cancel</Button>
                  </DialogTrigger>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
