// This middleware will not be global, because I want to expand intro page later on

export default defineNuxtRouteMiddleware((to, from) => {
    const user = useCookie<User | null>('fb_user', () => null);
    if (!user?.value?.stsTokenManager?.accessToken) {
        return navigateTo('/login');
    }
});
