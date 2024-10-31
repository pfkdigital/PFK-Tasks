import {NextRequest, NextResponse} from "next/server";
import {authenticateSchema, AuthenticateSchema} from "@/schema/authenticate-schema";
import {authenticate} from "@/util/api-functionality";

export default async function POST(req:NextRequest) {
    const payload = await req.json() as AuthenticateSchema
    const parsed = authenticateSchema.safeParse(payload)

    if (!parsed.success) {
        return NextResponse.json(
            parsed.error.errors.map((error) => error),
            {status: 400},
        );
    }

    const response = await authenticate(payload)

    if (!response.ok) {
        return NextResponse.json({message: "Failed to authenticate"}, {status: 401})
    }

    return NextResponse.json({message: "You have successfully signed in"}, {status: 200})
}