import { cookies } from 'next/headers'

export class ApiClient {
    private static instance: ApiClient
    private readonly baseUrl: string

    // Private constructor to prevent direct instantiation
    private constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_API_URL || ''
    }

    // Singleton method to get the instance
    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient()
        }
        return ApiClient.instance
    }

    // Universal token retrieval
    private getToken(): string | null {
        return cookies().get('accessToken')?.value || null
    }

    // Universal fetch method
    async fetch(
        endpoint: string,
        options: RequestInit = {},
        shouldRetry = true
    ): Promise<Response> {
        const url = `${this.baseUrl}${endpoint}`
        const token = this.getToken()

        const fetchOptions: RequestInit = {
            ...options,
            credentials: 'include', // Ensure cookies are sent
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
                ...options.headers
            }
        }

        try {
            const response = await fetch(url, fetchOptions)

            // Handle token refresh on 401
            if (response.status === 401 && shouldRetry) {
                await this.refreshToken()
                return this.fetch(endpoint, options, false)
            }

            return response
        } catch (error) {
            console.error('API request failed:', error)
            throw error
        }
    }

    // Token refresh method
    private async refreshToken(): Promise<void> {
        try {
            const refreshToken = cookies().get('refreshToken')?.value

            const response = await fetch(`${this.baseUrl}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${refreshToken}`
                }
            })

            if (!response.ok) {
                throw new Error('Token refresh failed')
            }

            return
        } catch (error) {
            throw error
        }
    }

    // Convenience methods
    async get(endpoint: string, options: RequestInit = {}) {
        return this.fetch(endpoint, { ...options, method: 'GET' })
    }

    async post(endpoint: string, body: any, options: RequestInit = {}) {
        return this.fetch(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body)
        })
    }

    async put(endpoint: string, body: any, options: RequestInit = {}) {
        return this.fetch(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body)
        })
    }

    async delete(endpoint: string, options: RequestInit = {}) {
        return this.fetch(endpoint, { ...options, method: 'DELETE' })
    }
}


const pfkTasksClient = ApiClient.getInstance()


export default pfkTasksClient