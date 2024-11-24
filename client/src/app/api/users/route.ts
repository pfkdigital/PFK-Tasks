import { NextResponse} from "next/server";
import getAccessToken from "@/util/token-service";
import {GET_USER} from "@/constants/api-endpoints";

export async function GET() {

    try {
        const accessToken = getAccessToken();
        const response = await fetch(GET_USER, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
        })
        console.log('response', response);
        if (!response.ok) {
            const responseError = await response.json();
            return {status: responseError.status, body: responseError.message};
        }
        const data = await response.json();
        return  NextResponse.json(data, {status: response.status});
    } catch (e) {
        console.error('Error fetching tasks:', e);
    }
}