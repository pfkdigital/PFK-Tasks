"use client"

import * as React from "react"
import {Folder, Home, User} from 'lucide-react'

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Separator} from "@/components/ui/separator"
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
import {LogoutButton} from "./sign-out-button"
import Link from "next/link"
import {NoProjects} from "./no-projects"

import pfkTasksClient from "@/client/api-client";
import {useQuery} from "@tanstack/react-query";
import {ProjectType} from "@/types/project";
import {UserType} from "@/types/user";
import {Spinner} from "@/components/loading-spinner/loading-spinner";

export default function DashboardSidebar() {

    const {data: user} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await pfkTasksClient.get('/user');
            return await response.json() as UserType;
        }
    });

    const {data: projects, isLoading} = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const response = await pfkTasksClient.get('/projects');
            return await response.json() as ProjectType[];
        }
    });

    if(isLoading) {
        return null
    }

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-3 px-3 py-4">
                        <Avatar className="border-primary border-2">
                            <AvatarImage src={user?.displayImageUrl || "https://github.com/shadcn.png"}
                                         alt={user?.username}/>
                            <AvatarFallback>{user?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">{user?.username}</span>
                            <span className="text-xs text-muted-foreground">{user?.email}</span>
                        </div>
                    </div>
                    <Separator/>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/dashboard" className="flex items-center">
                                    <Home className="h-4 w-4"/>
                                    <span>Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/dashboard/profile" className="flex items-center gap-3">
                                    <User className="h-4 w-4"/>
                                    <span>Profile</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                    <Separator className="my-4"/>
                    {projects && projects.length > 0 ? (
                        <div className="px-3 py-2">
                            <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Projects</h3>
                            <SidebarMenu>
                                {projects.map((project) => (
                                    <SidebarMenuItem key={project.id}>
                                        <SidebarMenuButton asChild>
                                            <Link href={`/dashboard/project/${project.id}`}
                                                  className="flex items-center gap-3">
                                                <Folder className="h-4 w-4"/>
                                                <span>{project.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </div>
                    ) : (
                        <NoProjects/>
                    )}
                </SidebarContent>
                <SidebarFooter className="p-3">
                    <LogoutButton/>
                </SidebarFooter>
                <SidebarRail/>
            </Sidebar>
        </SidebarProvider>
    )
}