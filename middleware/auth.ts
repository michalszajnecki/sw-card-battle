// This middleware will not be global, because I want to expand intro page later on

export default defineNuxtRouteMiddleware((to, from) => {
    const user = useState<User | null>('fb_user', () => null);
    if (!user?.value?.accessToken) {
        // return navigateTo('/login');
    }
});
