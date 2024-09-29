export const validateEmail = (email: string | null) : string | null => {
    if (email == null || email === "") {
        return 'Email cannot be empty';
    }

    if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(email)) {
        return 'Please enter valid email';
    }
    return null;
}