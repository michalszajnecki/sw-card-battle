import { createUserWithEmailAndPassword, User, signInWithEmailAndPassword } from 'firebase/auth';

export default function () {
    const { $auth } = useNuxtApp();

    // const user = useState<User | null>('fb_user', () => null);

    const user = useCookie<User | null>('fb_user', {
        default: () => null,
        watch: true,
    });

    const registerUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const userCreds = await createUserWithEmailAndPassword($auth, email, password);
            if (userCreds) {
                user.value = userCreds.user;
                return user.value;
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error);
            }
            return false;
        }
        return false;
    };

    const logoutUser = async (): Promise<boolean> => {
        user.value = null;
        return true;
    };

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const userCreds = await signInWithEmailAndPassword($auth, email, password);
            if (userCreds) {
                user.value = userCreds.user;
                return user.value;
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error);
            }
            return false;
        }
        return false;
    };

    return {
        user,
        registerUser,
        loginUser,
        logoutUser,
    };
}
