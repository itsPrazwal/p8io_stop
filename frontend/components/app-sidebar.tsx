import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { NAVIGATIONS } from "@/lib/constants/navigation";
import { IUser } from "@/types/user";

export function AppSidebar({ user }: { user: IUser }) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>P8IO STOP</SidebarGroupLabel>
          <SidebarGroupContent>
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
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <SidebarSeparator />
          <h3>
            {user.isCompany
              ? `${user.companyName} (${user.firstName})`
              : `${user.firstName} ${user.lastName}`}
          </h3>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
