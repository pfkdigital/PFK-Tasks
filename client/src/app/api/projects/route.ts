import { NextResponse} from 'next/server';
import getAccessToken from "@/util/get-access-token";
import { GET_PROJECTS } from "@/constants/api-endpoints";
import { ApiError } from "@/types/api-error";
import {getCookie} from "cookies-next";

export async function GET(request: Request) {
    const accessToken = getCookie("accessToken");

    return NextResponse.json({accessToken});
}
