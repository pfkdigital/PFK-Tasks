import React from 'react';
import pfkTasksClient from "@/client/api-client";
import {DataTable} from "@/components/data-table/data-table";
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import EmptyDataTable from "@/components/data-table/empty-data-table";
import {ProjectType} from "@/types/project";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface PageProps {
    params: {
        id: string;
    }
}

const Page = async({params}:PageProps) => {
    const id = params.id;
    const project: ProjectType = await pfkTasksClient.get(`/projects/${id}`).then((response) => response.json());

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">{project.title}</h1>

            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Project Details</CardTitle>
                        <Avatar className="h-14 w-14">
                            <AvatarImage src={project.imageUrl} alt={project.title} />
                            <AvatarFallback>{project.title.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </CardHeader>
                    <CardContent>
                        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <dt className="font-medium text-gray-500">Status</dt>
                                <dd>
                                    <Badge variant="outline" className="mt-1">
                                        {project.status}
                                    </Badge>
                                </dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-500">Project ID</dt>
                                <dd className="mt-1">{project.id}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-500">Start Date</dt>
                                <dd className="mt-1">{project.startDate}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-500">End Date</dt>
                                <dd className="mt-1">{project.endDate}</dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Project Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{project.description}</p>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Project Tasks</h2>
            {project.tasks && project.tasks.length ? (
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6">
                        <DataTable data={project.tasks}/>
                    </div>
                </div>
            ) : <EmptyDataTable/>}
        </div>
    );
};

export default Page;