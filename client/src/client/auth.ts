"use server"

import {cookies} from "next/headers";
import {ApiClient} from "@/client/api-client";
import {AuthenticateSchema} from "@/schema/authenticate-schema";

export async function logInUser(data: AuthenticateSchema) {
    const api = ApiClient.getInstance()

    try {
        const response = await api.post('/auth/authenticate', data)

        if (!response.ok) {
            throw new Error('Login failed')
        }

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

export async function refreshAccessToken(refreshToken: string) {
    const api = ApiClient.getInstance()
    try {
        const response = await api.post('/auth/refresh',{},{headers: {Authorization: `Bearer ${refreshToken}`}})

        if (!response.ok) {
            throw new Error('Token refresh failed')
        }

        return response
    } catch (e) {
        console.error('Token refresh error:', e)
    }
}