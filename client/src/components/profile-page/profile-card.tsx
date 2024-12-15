"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Label } from "@radix-ui/react-label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"
import pfkTasksClient from "@/client/api-client";
import {useQuery} from "@tanstack/react-query";

function ProfileCard() {
    const {data} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await pfkTasksClient.get('/user');
            return response.json();
        }
    })

    const { user } = data;

    return (
        <Card className={"bg-accent"}>
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={"https://github.com/shadcn.png"} />
                    <AvatarFallback>NU</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle>{user.username}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2">
                    <div>
                        <Label className="text-sm font-medium">Bio</Label>
                        <p className="text-sm text-muted-foreground">{user.bio || 'No bio provided'}</p>
                    </div>
                    <div>
                        <Label className="text-sm font-medium">Location</Label>
                        <p className="text-sm text-muted-foreground">{user.location || 'Not specified'}</p>
                    </div>
                    <div>
                        <Label className="text-sm font-medium">Joined</Label>
                        <p className="text-sm text-muted-foreground">{new Date(user.joinedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProfileCard