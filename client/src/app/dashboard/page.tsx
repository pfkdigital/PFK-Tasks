"use client"

import {DataTable} from '@/components/data-table/data-table'
import EmptyDataTable from "@/components/data-table/empty-data-table";
import pfkTasksClient from "@/client/api-client";
import {useQuery} from "@tanstack/react-query";
import {Spinner} from "@/components/loading-spinner/loading-spinner";

export default function DashboardPage() {

    const { data, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const response = await pfkTasksClient.get('/tasks');
            return response.json();
        }
    });


    if(isLoading) {
        return <Spinner />
    }

    return (
        <div className="container mx-auto p-8">
            <div className="flex flex-col space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Task Dashboard</h1>
                        <p className="text-muted-foreground mt-2">
                            View and manage your tasks here
                        </p>
                    </div>
                </div>
                {data && data.length ? (
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="p-6">
                            <DataTable data={data}/>
                        </div>
                    </div>
                ) : <EmptyDataTable/>}
            </div>
        </div>
    )
}