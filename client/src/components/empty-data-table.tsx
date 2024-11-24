import { Button } from "@/components/ui/button"
import { PlusCircleIcon, TableIcon } from 'lucide-react'

export default function EmptyDataTable({
    title = "No tasks available",
    description = "Get started by creating your first project.",
    actionLabel = "Create Project"
}: {
    title?: string
    description?: string
    actionLabel?: string
}) {
    return (<div className="flex flex-col items-center justify-center h-[400px] border rounded-md bg-background">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-muted p-3">
                <TableIcon className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-muted-foreground max-w-[250px]">{description}</p>
            </div>
            <Button>
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                {actionLabel}
            </Button>
        </div>
    </div>)
}