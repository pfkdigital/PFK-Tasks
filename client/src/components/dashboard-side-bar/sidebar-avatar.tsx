"use client"

import React from 'react';
import {SidebarHeader} from "@/components/ui/sidebar";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Separator} from "@/components/ui/separator";
import {useQuery} from "@tanstack/react-query";
import pfkTasksClient from "@/client/api-client";
import {UserType} from "@/types/user";

function SidebarAvatar() {

    const {data: currentUser} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await pfkTasksClient.get('/user');
            return await response.json() as UserType;
        }
    });

    return (
        <SidebarHeader>
            <div className="flex items-center gap-3 px-3 py-4">
                <Avatar className="border-primary border-2">
                    <AvatarImage src={currentUser?.displayImageUrl || "https://github.com/shadcn.png"}
                                 alt={currentUser?.username}/>
                    <AvatarFallback>{currentUser?.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold">{currentUser?.username}</span>
                    <span className="text-xs text-muted-foreground">{currentUser?.email}</span>
                </div>
            </div>
            <Separator/>
        </SidebarHeader>
    );
}

export default SidebarAvatar;