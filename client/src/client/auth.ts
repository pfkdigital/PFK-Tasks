"use server"

import {cookies} from "next/headers";
import {ApiClient} from "@/client/api-client";
import {AuthenticateSchema} from "@/schema/authenticate-schema";

export async function loginUser(data: AuthenticateSchema) {
    const api = ApiClient.getInstance()

    try {
        const response = await api.post('/auth/sign-in', data)

        if (!response.ok) {
            throw new Error('Login failed')
        }

        // No need to manually set cookies, as the server should set them
        return response
    } catch (error) {
        console.error('Login error:', error)
        throw error
    }
}

export async function logoutUser() {
    const api = ApiClient.getInstance()

    try {
        await api.post('/auth/sign-out', {})

        cookies().delete('accessToken')
        cookies().delete('refreshToken')
    } catch (error) {
        console.error('Logout error:', error)
    }
}