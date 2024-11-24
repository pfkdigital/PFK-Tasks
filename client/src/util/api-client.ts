"use client"

import {AUTH_LOGOUT} from "@/constants/api-endpoints";
import {getCookie, hasCookie} from "cookies-next";
import {ApiError} from "@/types/api-error";

export const getAccessTokenClient = () => {
    return getCookie("accessToken")
}

export const logOut = async () => {
    console.log(hasCookie("accessToken"))
    const response = await fetch(AUTH_LOGOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAccessTokenClient()}`,
      },
    })
  
    if (!response.ok) {
        console.log(response.json())
      const responseError: ApiError = await response.json();
        throw new Error(responseError.message);
    }
  
    return await response.json();
  }