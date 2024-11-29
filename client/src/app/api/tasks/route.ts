import {GET_TASKS} from "@/constants/api-endpoints";
import {getAccessToken} from "@/util/get-access-token";
import {NextResponse} from "next/server";

export async function GET() {
    const token = await getAccessToken()
    if (!token) {
        return new Response("Unauthorized", {status: 401})
    }

    console.log(token)

    const response = await fetch(GET_TASKS, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        return new Response("Error fetching tasks", {status: 500})
    }

    return NextResponse.json({...response.json})
}