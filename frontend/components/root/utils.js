export const validateForm = (email, password, setErrors, setShowErrors) => {
    console.log("Function called")
    // If email if not provided
    if (!email) {
        setErrors((prev) => ({ ...prev, email: "Email is required" }))
        setShowErrors((prev) => ({ ...prev, email: true }))
        return false;
    }

    // if email is not valid
    if (!email.includes("@") || !email.includes(".")) {
        setErrors((prev) => ({ ...prev, email: "Email is wrong" }))
        setShowErrors((prev) => ({ ...prev, email: true }))
        return false;
    }

    // if password is not provided
    if (!password) {
        setErrors((prev) => ({ ...prev, password: "Password is required" }))
        setShowErrors((prev) => ({ ...prev, password: true }))
        return false;
    }

    // if password is less than 6 digits
    if (password.length < 6) {
        setErrors((prev) => ({ ...prev, password: "Password is wrong should be 5 digits at least." }))
        setShowErrors((prev) => ({ ...prev, password: true }))
        return false;
    }

    return true;

}
