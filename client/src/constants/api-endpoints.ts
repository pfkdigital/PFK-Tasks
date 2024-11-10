export const BACKEND_API = "http://localhost:8080/api/v1";

export const AUTH_REGISTER = `${BACKEND_API}/auth/register`;
export const AUTH_LOGIN = `${BACKEND_API}/auth/authenticate`;
export const AUTH_ACTIVATE = `${BACKEND_API}/auth/activate`;
export const AUTH_REFRESH = `${BACKEND_API}/auth/refresh`;
export const AUTH_LOGOUT = `${BACKEND_API}/auth/logout`;
export const AUTH_FORGOT_PASSWORD = `${BACKEND_API}/auth/forgot-password`;

// Projects
export const GET_PROJECTS = `${BACKEND_API}/projects`

// User
export const GET_USER = `${BACKEND_API}/user`