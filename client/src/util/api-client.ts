import { AUTH_LOGOUT } from "@/constants/api-endpoints";
import  { getCookie } from "cookies-next";

export const getAccessTokenClient = () => {
    return getCookie("accessToken");
  }


export const logOut = async () => {
    const response = await fetch(AUTH_LOGOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAccessTokenClient()}`,
      },
    })
  
    if (!response.ok) {
      throw new Error("Failed to log out");
      return response;
    }
  
    return await response.json();
  }