const registerValidate = (req, res, next) => {
    const errors = {}
    const { email, password, confirmPassword } = req.body

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/
    if (!passwordRegex.test(password)) {
        errors.password = "Password không đủ mạnh."
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = "Password không chính xác."
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]{6,30}@gmail\.com$/
    if (!emailRegex.test(email)) {
        errors.email = "Email không hợp lệ."
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }
    next()
}
export default registerValidate