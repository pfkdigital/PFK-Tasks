"use client"

import React from 'react';
import {SidebarHeader} from "@/components/ui/sidebar";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Separator} from "@/components/ui/separator";
import {useAuth} from "@/context/user-context";

function SidebarAvatar() {
    const {currentUser} = useAuth();
    if (!currentUser) return null;
    return (
        <SidebarHeader>
            <div className="flex items-center gap-3 px-3 py-4">
                <Avatar className="border-primary border-2">
                    <AvatarImage src={currentUser.displayImageUrl || "https://github.com/shadcn.png"}
                                 alt={currentUser.username}/>
                    <AvatarFallback>{currentUser.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold">{currentUser.username}</span>
                    <span className="text-xs text-muted-foreground">{currentUser.email}</span>
                </div>
            </div>
            <Separator/>
        </SidebarHeader>
    );
}

export default SidebarAvatar;