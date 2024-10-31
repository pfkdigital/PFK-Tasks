"use client"

import Link from "next/link"
import { MdOutlineTaskAlt } from "react-icons/md";
import { FaSignInAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from 'next/navigation'

const NavBar = () => {

    const router = useRouter()

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav
                className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <MdOutlineTaskAlt className="h-6 w-6 text-primary"/>
                    <span className="sr-only">PFK Tasks</span>
                </Link>
                <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    About
                </Link>
                <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Features
                </Link>
                <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Reviews
                </Link>
                <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Contact
                </Link>
            </nav>
            <div className={"ml-auto"}>
                <Button
                    className="shrink-0 hidden md:block"
                    variant="outline"
                    onClick={() => router.push("/sign-in")}
                >
                    <FaSignInAlt className="h-5 w-5"/>
                </Button>
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <MdOutlineTaskAlt className="h-5 w-5"/>
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <MdOutlineTaskAlt className="h-6 w-6 text-primary"/>
                            <span className="sr-only">PFK Tasks</span>
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            About
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Features
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Reviews
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Contact
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    );
};

export default NavBar;