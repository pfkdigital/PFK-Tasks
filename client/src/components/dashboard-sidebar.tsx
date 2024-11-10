import * as React from "react"
import { Folder, Home, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getProjects, getUser } from "@/util/api"
import { UserType } from "@/types/user"
import { LogoutButton } from "./sign-out-button"
import Link from "next/link"
import { ProjectType } from "@/types/project"

export default async function DashboardSidebar() {
  const user: UserType = await getUser()
  const projects: ProjectType[] = await getProjects()

  if (!user || !projects) return null

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-3 px-3 py-4">
            <Avatar className="border-primary border-2">
              <AvatarImage src={user.displayImageUrl || "https://github.com/shadcn.png"} alt={user.username} />
              <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{user.username}</span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
          </div>
          <Separator />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard" className="flex items-center gap-3">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard/profile" className="flex items-center gap-3">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <Separator className="my-4" />
          <div className="px-3 py-2">
            <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Projects</h3>
            <SidebarMenu>
              {projects?.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/project/${project.id.toLowerCase()}`} className="flex items-center gap-3">
                      <Folder className="h-4 w-4" />
                      <span>{project.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        </SidebarContent>
        <SidebarFooter className="p-3">
          <LogoutButton />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  )
}