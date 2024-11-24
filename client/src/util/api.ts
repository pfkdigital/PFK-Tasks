
import {ApiError} from "@/types/api-error";

// Projects
export const getProjects = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/projects",{method: 'GET'});

        if (!response.ok) {
            const responseError: ApiError = await response.json();
            return new Error(responseError.message);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};


// Tasks
export const getTasks = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/tasks");

        if (!response.ok) {
            const responseError: ApiError = await response.json();
            return new Error(responseError.message);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

// User
export const getUser = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/users");

        if (!response.ok) {
            const responseError: ApiError = await response.json();
            return new Error(responseError.message);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};