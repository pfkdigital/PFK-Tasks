import {NextRequest, NextResponse} from "next/server";
import {activationCodeSchema} from "@/schema/activation-code-schema";
import {ApiError} from "@/types/api-error";

const authEndpoint = "http://localhost:8080/api/v1/auth";

export async function PUT(req: NextRequest) {
    const payload = await req.json()
    const parsed = activationCodeSchema.safeParse(payload)

    if (!parsed.success) {
        return NextResponse.json(
            parsed.error.errors.map((error) => error),
            {status: 400},
        );
    }

    try {
        const response = await fetch(`${authEndpoint}/activate`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const error = await response.json() as ApiError
            return NextResponse.json({message: error.message}, {status: error.code})
        }

        return NextResponse.json({message: "Account activated, please log in"}, {status: 200})
    } catch (e) {
        console.error(e)
        return NextResponse.json({message: "Failed to create account"}, {status: 500})
    }
}