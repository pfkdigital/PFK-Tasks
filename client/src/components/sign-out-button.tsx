"use client"

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logOut } from '@/util/api-client'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'


export function LogoutButton() {
    const router = useRouter()
    const { toast } = useToast()

    const handleLogout = async () => {
        await logOut().then(() => {
            router.push('/login')
            toast({
                title: 'Logged out',
                description: 'Redirecting to login page...',
            })
        }).catch(() => {
            throw new Error('Failed to log out')
            toast({
                title: 'Failed to log out',
                description: 'Please try again',
            })
        })
    }

    return (
        <Button
            variant="default"
            className="w-full justify-start"
            onClick={() => handleLogout()}
        >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
        </Button>
    )
}