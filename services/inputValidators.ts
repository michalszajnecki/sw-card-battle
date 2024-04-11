export function validatePassword(password: string) {
    return password?.length >= 8 ? true : 'Password is too short';
}

export function validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email) ? true : 'Enter correct e-mail address';
}
