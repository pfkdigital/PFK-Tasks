import {GET_PROJECTS} from "@/constants/api-endpoints";
import { cookies } from 'next/headers'

export const getAccessToken = () => {
    return cookies().get("accessToken")?.value;
}

export const getProjects = async () => {
    try {
        const response = await fetch(GET_PROJECTS,{headers: {Authorization: `Bearer ${getAccessToken()}`}});
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}