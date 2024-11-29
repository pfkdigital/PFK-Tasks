"use server"

import {GET_PROJECTS, GET_TASKS, GET_USER} from "@/constants/api-endpoints";
import {ApiError} from "@/types/api-error";
import {Task} from "@/types/task";
import {UserType} from "@/types/user";
import {ProjectType} from "@/types/project";

// User
export const getUser = async (): Promise<UserType | undefined> => {
    const response = await fetch("http://localhost:3000/api/auth/token")
    console.log(response)
    try {

        const response = await fetch(GET_USER, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!response.ok) {
            const apiError: ApiError = await response.json()
            throw Error(apiError.message)
        }

        return await response.json()
    } catch
        (e) {
        console.error(e)
    }
}


// Projects
export const getProjects = async (): Promise<ProjectType[] | undefined> => {
    const response = await fetch("http://localhost:3000/api/auth/token")
    console.log(response)
    try {
        const response = await fetch(GET_PROJECTS, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!response.ok) {
            const apiError: ApiError = await response.json()
            throw Error(apiError.message)
        }

        return await response.json()
    } catch (e) {
        console.error(e)
    }
}

// Tasks
export const getTasks = async (): Promise<Task[] | undefined> => {
    const token = await getAccessToken()
    console.log(token)
    try {
        const response = await fetch(GET_TASKS, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!response.ok) {
            const apiError: ApiError = await response.json()
            throw Error(apiError.message)
        }

        return await response.json()
    } catch (e) {
        console.error(e)
    }
}

export const getAccessToken = async (): Promise<string | undefined> => {
    try {
        const response = await fetch("http://localhost:3000/api/auth/token", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!response.ok) {
            const apiError: ApiError = await response.json()
            throw Error(apiError.message)
        }

        return await response.json()
    } catch (e) {
        console.error(e)
    }
}