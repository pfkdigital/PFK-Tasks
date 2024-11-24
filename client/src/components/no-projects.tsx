"use client"

import * as React from "react"
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function NoProjects() {
    return (
        <div className="px-3 py-2">
            <h3 className="mb-2 px-2 text-xs font-medium uppercase text-muted-foreground">Projects</h3>
            <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                onClick={() => console.log("Create project")}
            >
                <Plus className="mr-2 h-4 w-4" />
                <span>Create your first project</span>
            </Button>
        </div>
    )
}