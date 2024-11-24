import {NextRequest, NextResponse} from "next/server";
import {GET_TASKS} from "@/constants/api-endpoints";
import getAccessToken from "@/util/token-service";
import {ApiError} from "@/types/api-error";

export async function GET(request: NextRequest) {
    try {
        const accessToken = getAccessToken();

        const response = await fetch(GET_TASKS, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
        });

        if (!response.ok) {
            const responseError: ApiError = await response.json();
            return NextResponse.json(
                { error: responseError.message },
                { status: +responseError.status }
            );
        }
        const data = await response.json();
        return NextResponse.json(data, {status: response.status});
    } catch (e) {
        console.error('Error fetching tasks:', e);
    }
}