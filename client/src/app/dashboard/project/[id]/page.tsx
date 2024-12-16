"use client"

import React from 'react';
import pfkTasksClient from "@/client/api-client";
import {DataTable} from "@/components/data-table/data-table";
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import EmptyDataTable from "@/components/data-table/empty-data-table";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {TaskStatus} from "@/enum/task-status";
import {KanbanBoard} from "@/components/kanban-board/kanban-board";
import {useQuery} from "@tanstack/react-query";
import {ProjectType} from "@/types/project";
import {Spinner} from "@/components/loading-spinner/loading-spinner";

interface PageProps {
    params: {
        id: string;
    }
}

const Page = ({params}: PageProps) => {
        const id = params.id;

        const {data, isLoading} = useQuery({
            queryKey: ['project', id],
            queryFn: async () => {
                const response = await pfkTasksClient.get(`/projects/${id}`);
                return await response.json() as ProjectType;
            }
        });

        if (isLoading) {
            return <Spinner />
        }

        return (
            <>
                <h1 className="text-3xl font-bold mb-6">{data?.title}</h1>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle>Project Details</CardTitle>
                            <Avatar className="h-14 w-14">
                                <AvatarImage src={data?.imageUrl} alt={data?.title}/>
                                <AvatarFallback>{data?.title.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </CardHeader>
                        <CardContent>
                            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <dt className="font-medium text-gray-500">Status</dt>
                                    <dd>
                                        <Badge variant="default" className="mt-1">
                                            {data?.status && TaskStatus[data?.status]}
                                        </Badge>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-medium text-gray-500">Project ID</dt>
                                    <dd className="mt-1">{data?.id}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium text-gray-500">Start Date</dt>
                                    <dd className="mt-1">{data?.startDate}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium text-gray-500">End Date</dt>
                                    <dd className="mt-1">{data?.endDate}</dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{data?.description}</p>
                        </CardContent>
                    </Card>
                </div>

                <h2 className="text-2xl font-semibold mb-4">Project Tasks</h2>
                {data?.tasks && data?.tasks.length ? (
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="p-6">
                            <DataTable data={data?.tasks}/>
                        </div>
                    </div>
                ) : <EmptyDataTable/>}
                <Card className={"mt-4"}>
                    <CardHeader>
                        <CardTitle>Task Board</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {data?.tasks && <KanbanBoard tasks={data?.tasks}/>}
                    </CardContent>
                </Card>
            </>
        );
    }
;

export default Page;