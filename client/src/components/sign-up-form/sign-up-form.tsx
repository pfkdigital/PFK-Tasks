"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { navigateToGithubOauth, navigateToGoogleOauth } from "@/util/oauth-navigation";
import { useForm } from "react-hook-form";
import { RegistrationSchema, registrationSchema } from "@/schema/registration-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { AUTH_REGISTER } from '@/constants/api-endpoints';
import { ApiError } from '@/types/api-error';

const SignUpForm = () => {
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<RegistrationSchema>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            location: "",
            bio: "",
        }
    })

    const onSubmit = async (data: RegistrationSchema) => {
        try {
            const response = await fetch(AUTH_REGISTER, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });
            if (!response.ok) {
                const error: ApiError = await response.json();
                toast({
                    title: "Failed to register",
                    description: error.message
                });
                throw new Error(error.message);
            }
            toast({
                title: "Account created",
                description: "You have successfully created an account. Please check your email to activate your account."
            })
            router.push("/activate-account");
        } catch (error) {
            console.error("Failed to register", error);
        }
    };

    return (
        <Card className="mx-auto max-w-md">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className='grid grid-cols-2 gap-4'>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email Address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your location" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us a little about yourself"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full" onClick={navigateToGoogleOauth}>
                                <FcGoogle size={16} className="mr-2 h-4 w-4" />
                                Sign in with Google
                            </Button>
                            <Button variant="outline" className="w-full" onClick={navigateToGithubOauth}>
                                <FaGithub className="mr-2 h-4 w-4" />
                                Sign in with GitHub
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/sign-in" className="underline">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default SignUpForm;