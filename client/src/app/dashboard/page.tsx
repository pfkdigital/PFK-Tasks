import {DataTable} from '@/components/data-table'
import {getTasks} from '@/util/api'
import EmptyDataTable from "@/components/empty-data-table";

export default async function TaskPage() {
    const tasks = await getTasks()

    if (!tasks) return null

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
                {tasks.length ? (
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="p-6">
                            <DataTable data={tasks}/>
                        </div>
                    </div>
                ) : <EmptyDataTable/>}
            </div>
        </div>
    )
}