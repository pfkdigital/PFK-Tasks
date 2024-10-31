export const navigateToGoogleOauth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/google`;
}

export const navigateToGithubOauth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/github`;
}
