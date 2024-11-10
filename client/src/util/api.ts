import { AUTH_LOGOUT, GET_PROJECTS, GET_USER } from "@/constants/api-endpoints";
import { cookies } from "next/headers";

export const getAccessToken = () => {
  return cookies().get("accessToken")?.value;
};

export const getProjects = async () => {
  try {
    const response = await fetch(GET_PROJECTS, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
      return response;
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// User
export const getUser = async () => {
  try {
    const response = await fetch(GET_USER, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
      return response;
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Logout
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