// app/api/projects/route.ts
import {NextRequest, NextResponse} from 'next/server';
import {cookies} from "next/headers";

export async function GET(request: NextRequest) {
    try {
        const cookieStore = cookies()
        const accessToken = cookieStore.get("accessToken")?.value;

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('Authorization', `Bearer ${accessToken}`);

        const response = await fetch("http://localhost:8080/api/v1/projects", {
            headers: requestHeaders,
        });
        console.log(await response.json())
        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch projects' },
                { status: response.status }
            );
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
