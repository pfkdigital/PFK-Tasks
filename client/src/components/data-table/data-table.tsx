"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal, Plus} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Input} from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Badge} from "@/components/ui/badge"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Task} from "@/types/task";

export enum TaskPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}

export interface TaskStep {
    id: string;
    title: string;
    description: string;
    status: string;
    taskId: string;
}

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "id",
        header: "Task",
        cell: ({row}) => {
            return (
                <div className="flex space-x">
                    <Badge variant="default">{row.getValue("id")}</Badge>
                </div>
            )
        },
    },
    {
        accessorKey: "title",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="w-[500px]">{row.getValue("title")}</div>,
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({row}) => <div className="w-[500px]">{row.getValue("description")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "priority",
        header: "Priority",
        cell: ({row}) => {
            const priority = row.getValue("priority") as string
            return (
                <Badge
                    variant={
                        priority === "HIGH"
                            ? "destructive"
                            : priority === "MEDIUM"
                                ? "default"
                                : "secondary"
                    }
                >
                    {priority}
                </Badge>
            )
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const task = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(task.id)}
                        >
                            Copy task ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>View task details</DropdownMenuItem>
                        <DropdownMenuItem>View project</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function DataTable({data}: { data: Task[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [selectedTask, setSelectedTask] = React.useState<Task | null>(null)
    const [newStepTitle, setNewStepTitle] = React.useState("")
    const [newStepDescription, setNewStepDescription] = React.useState("")

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task)
    }

    const handleCloseDrawer = () => {
        setSelectedTask(null)
        setNewStepTitle("")
        setNewStepDescription("")
    }

    const handleStepStatusChange = (stepId: string) => {
        if (selectedTask) {
            const updatedSteps = selectedTask.taskSteps.map(step =>
                step.id === stepId ? {...step, status: step.status === "COMPLETED" ? "IN_PROGRESS" : "COMPLETED"} : step
            )
            setSelectedTask({...selectedTask, taskSteps: updatedSteps})
        }
    }

    const handleAddNewStep = () => {
        if (selectedTask && newStepTitle.trim() !== "") {
            const newStep: TaskStep = {
                id: `step-${Date.now()}`,
                title: newStepTitle,
                description: newStepDescription,
                status: "IN_PROGRESS",
                taskId: selectedTask.id,
            }
            setSelectedTask({
                ...selectedTask,
                taskSteps: [...selectedTask.taskSteps, newStep],
            })
            setNewStepTitle("")
            setNewStepDescription("")
        }
    }

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter tasks..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={() => handleTaskClick(row.original)}
                                    className="cursor-pointer"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
            <Sheet open={!!selectedTask} onOpenChange={handleCloseDrawer}>
                <SheetContent className="sm:max-w-[540px]">
                    {selectedTask && (
                        <ScrollArea className="h-[calc(100vh-80px)] pr-4">
                            <SheetHeader className="mb-6">
                                <SheetTitle>{selectedTask.title}</SheetTitle>
                                <SheetDescription>{selectedTask.description}</SheetDescription>
                            </SheetHeader>
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-semibold mb-2">Status</h3>
                                        <Badge variant="outline">{selectedTask.status}</Badge>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Priority</h3>
                                        <Badge
                                            variant={
                                                selectedTask.priority === "HIGH"
                                                    ? "destructive"
                                                    : selectedTask.priority === "MEDIUM"
                                                        ? "default"
                                                        : "secondary"
                                            }
                                        >
                                            {selectedTask.priority}
                                        </Badge>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Task Steps</h3>
                                    {selectedTask.taskSteps.length > 0 ? (
                                        <div className="space-y-4">
                                            {selectedTask.taskSteps.map((step) => (
                                                <div key={step.id} className="flex items-start space-x-2">
                                                    <Checkbox
                                                        id={step.id}
                                                        checked={step.status === "COMPLETED"}
                                                        onCheckedChange={() => handleStepStatusChange(step.id)}
                                                    />
                                                    <div className="grid gap-1.5 leading-none">
                                                        <label
                                                            htmlFor={step.id}
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            {step.title}
                                                        </label>
                                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No steps for this task.</p>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-semibold">Add New Step</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-step-title">Step Title</Label>
                                        <Input
                                            id="new-step-title"
                                            value={newStepTitle}
                                            onChange={(e) => setNewStepTitle(e.target.value)}
                                            placeholder="Enter step title"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-step-description">Step Description</Label>
                                        <Textarea
                                            id="new-step-description"
                                            value={newStepDescription}
                                            onChange={(e) => setNewStepDescription(e.target.value)}
                                            placeholder="Enter step description"
                                        />
                                    </div>
                                    <Button onClick={handleAddNewStep} className="w-full">
                                        <Plus className="mr-2 h-4 w-4"/> Add Step
                                    </Button>
                                </div>
                            </div>
                        </ScrollArea>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    )
}