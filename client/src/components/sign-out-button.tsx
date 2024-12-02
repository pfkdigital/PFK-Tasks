"use client"

import {LogOut} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {logoutUser} from "@/client/auth";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";

export function LogoutButton() {

    const router = useRouter()
    const {toast} = useToast()

    const handleLogout = async () => {
        await logoutUser().then(() => {
            router.push('/')
            toast({
                title: 'Logged out',
                description: 'You have been logged out',
            })
        }).catch(() => {
            toast({
                title: 'Error',
                description: 'An error occurred while logging out',
            })
        })
    }

    return (
        <Button
            variant="default"
            className="w-full justify-start"
            type={"button"}
            onClick={ () =>  handleLogout()}
        >
            <LogOut className="mr-2 h-4 w-4"/>
            <p className={"font-bold"}>Log out</p>
        </Button>
    )
}