"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Label } from "@radix-ui/react-label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"
import pfkTasksClient from "@/client/api-client";
import {useQuery} from "@tanstack/react-query";
import {Spinner} from "@/components/loading-spinner/loading-spinner";

function ProfileCard() {
    const {data, isLoading} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await pfkTasksClient.get('/user');
            return response.json();
        }
    })

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Card className={"bg-accent h-auto md:h-[300px]"}>
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={"https://github.com/shadcn.png"} />
                    <AvatarFallback>NU</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle>{data.username}</CardTitle>
                    <CardDescription>{data.email}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2">
                    <div>
                        <Label className="text-sm font-medium">Bio</Label>
                        <p className="text-sm text-muted-foreground">{data.bio || 'No bio provided'}</p>
                    </div>
                    <div>
                        <Label className="text-sm font-medium">Location</Label>
                        <p className="text-sm text-muted-foreground">{data.location || 'Not specified'}</p>
                    </div>
                    <div>
                        <Label className="text-sm font-medium">Joined</Label>
                        <p className="text-sm text-muted-foreground">{new Date(data.joinedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProfileCard