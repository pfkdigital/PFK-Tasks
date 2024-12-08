"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { FileUploader } from "react-drag-drop-files"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from 'lucide-react'
import {useToast} from "@/hooks/use-toast";

const fileTypes = ["JPG", "PNG", "GIF"]

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    status: z.enum(["Not Started", "In Progress", "Completed"]),
    startDate: z.date({
        required_error: "Start date is required.",
    }),
    endDate: z.date({
        required_error: "End date is required.",
    }),
}).refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after start date.",
    path: ["endDate"],
})

type FormValues = z.infer<typeof formSchema>

export default function CreateProjectPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [file, setFile] = useState<File | null>(null)

    const {toast} = useToast()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            status: "Not Started",
            startDate: new Date(),
            endDate: new Date(),
        },
    })

    const handleFileChange = (file: File) => {
        setFile(file)
    }

    async function onSubmit(values: FormValues) {
        if (!file) {
            toast({
                title: "Error",
                description: "Please upload an image for the project.",
                variant: "destructive",
            })
            return
        }

        setIsSubmitting(true)
        try {
            // Here you would typically make an API call to create the project and upload the image
            // For this example, we'll just simulate an API call with a timeout
            await new Promise(resolve => setTimeout(resolve, 1000))

            const newProject = {
                ...values,
                id: `proj-${Date.now()}`, // Generate a unique ID (in a real app, this would be done server-side)
                imageUrl: URL.createObjectURL(file), // In a real app, this would be the URL returned from your image upload service
                startDate: values.startDate.toISOString(),
                endDate: values.endDate.toISOString(),
            }

            console.log("New project created:", newProject)

            toast({
                title: "Project created",
                description: "Your new project has been successfully created.",
            })

            // Redirect to the projects list or the new project's page
            router.push("/projects")
        } catch (error) {
            console.error("Error creating project:", error)
            toast({
                title: "Error",
                description: "There was a problem creating your project. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="container max-w-3xl mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter project title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Not Started">Not Started</SelectItem>
                                            <SelectItem value="In Progress">In Progress</SelectItem>
                                            <SelectItem value="Completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Start Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>End Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Describe your project"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormItem>
                        <FormLabel>Project Image</FormLabel>
                        <FormControl>
                            <FileUploader
                                handleChange={handleFileChange}
                                name="file"
                                types={fileTypes}
                                classes="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                            >
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">Drag & drop an image here, or click to select</p>
                                    <p className="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG, GIF</p>
                                </div>
                            </FileUploader>
                        </FormControl>
                        {file && (
                            <p className="text-sm text-green-600 mt-2">
                                File selected: {file.name}
                            </p>
                        )}
                    </FormItem>

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? "Creating..." : "Create Project"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

