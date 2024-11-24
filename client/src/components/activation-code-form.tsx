"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {toast} from "@/hooks/use-toast"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import {activationCodeSchema} from "@/schema/activation-code-schema";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useRouter} from "next/navigation";
import {ApiError} from "@/types/api-error";
import {AUTH_ACTIVATE} from "@/constants/api-endpoints"


function InputOTPForm() {
    const form = useForm<z.infer<typeof activationCodeSchema>>({
        resolver: zodResolver(activationCodeSchema),
        defaultValues: {
            activationCode: "",
        },
    })
    const router = useRouter()

    async function onSubmit(data: z.infer<typeof activationCodeSchema>) {
        try {
            const response = await fetch(AUTH_ACTIVATE, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const error: ApiError = await response.json();
                toast({
                    title: "Failed to activate account",
                    description: error.message
                });
                throw new Error(error.message);
            }
            toast({
                title: "Account activated",
                description: "You have successfully activated your account."
            })
            router.push("/sign-in");
        } catch (error) {
            console.error("Failed to activate account", error);
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Enter Activation Code</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                        <FormField
                            control={form.control}
                            name="activationCode"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>One-Time Password</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0}/>
                                                <InputOTPSlot index={1}/>
                                                <InputOTPSlot index={2}/>
                                                <InputOTPSlot index={3}/>
                                                <InputOTPSlot index={4}/>
                                                <InputOTPSlot index={5}/>
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription>
                                        Please enter the one-time password sent to your phone.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default InputOTPForm