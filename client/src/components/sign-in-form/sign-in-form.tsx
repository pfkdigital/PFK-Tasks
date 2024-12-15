"use client"

import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import React from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {navigateToGithubOauth, navigateToGoogleOauth} from "@/util/oauth-navigation";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {authenticateSchema} from "@/schema/authenticate-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useToast} from "@/hooks/use-toast";
import {AUTH_LOGIN} from "@/constants/api-endpoints";

export function SignInForm() {

    const router = useRouter()
    const {toast} = useToast()
    const form = useForm<z.infer<typeof authenticateSchema>>({
        resolver: zodResolver(authenticateSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })

    const onSubmit = async (data: z.infer<typeof authenticateSchema>) => {
        try {
            const response = await fetch(AUTH_LOGIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Failed to login");
            }
            toast({
                title: "Login successful",
                description: "You have successfully logged in"
            })
            router.push("/dashboard");

            return response
        } catch (error) {
            console.error(error)
            toast({
                title: "Failed to login",
                description: "Please try again"
            });
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account.
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent>
                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button className="w-full mt-4" disabled={form.formState.isSubmitting}>Sign in</Button>
                        <div className="mt-4 text-center text-sm">
                            Dont have an account?{" "}
                            <Link href="/sign-up" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </form>
            </Form>
            <CardFooter>
                <div className="grid grid-cols-2 gap-4 w-full">
                    <Button variant="outline" className="w-full" onClick={navigateToGoogleOauth}>
                        <FcGoogle size={16} className={"mr-2 h-4 w-4"}/>
                        Sign in
                    </Button>
                    <Button variant="outline" className="w-full" onClick={navigateToGithubOauth}>
                        <FaGithub className={"mr-2 h-4 w-4"}/>
                        Sign in
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}

export default SignInForm