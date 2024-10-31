import {registrationSchema, RegistrationSchema} from "@/schema/registration-schema";
import {NextRequest, NextResponse} from "next/server";
import {ApiError} from "@/types/api-error";

const authEndpoint = "http://localhost:8080/api/v1/auth";

export async function POST(req: NextRequest) {
    const payload = await req.json() as RegistrationSchema
    const parsed = registrationSchema.safeParse(payload)

    if (!parsed.success) {
        return NextResponse.json(
            parsed.error.errors.map((error) => error),
            {status: 400},
        );
    }

    try {
        const response = await fetch(`${authEndpoint}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        if (!response.ok) {
            const error = await response.json() as ApiError
            return NextResponse.json(error, {status: 500})
        }
        return NextResponse.json({message: "You have successfully registered, please check your email for the activation code."}, {status: 201})
    } catch (e) {
        console.error(e)
        return NextResponse.json({message: "Failed to create account"}, {status: 500})
    }
}