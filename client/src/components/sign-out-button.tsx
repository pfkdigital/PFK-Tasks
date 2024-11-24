"use client"

import {LogOut} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {useToast} from '@/hooks/use-toast'
import {useRouter} from "next/navigation";

export function LogoutButton() {
    const {toast} = useToast()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/auth/logout")
            if (!response.ok) {
                throw new Error("Failed to log out")
            }

            toast({
                title: "Logged out",
                description: "You have been logged out",
            })
            router.push("/sign-in")
        } catch {
            toast({
                title: "An error occurred",
                description: "Unable to log out",
            })
        }
    }

    return (
        <Button
            variant="default"
            className="w-full justify-start"
            onClick={async () => await handleLogout()}
        >
            <LogOut className="mr-2 h-4 w-4"/>
            <p className={"font-bold"}>Log out</p>
        </Button>
    )
}