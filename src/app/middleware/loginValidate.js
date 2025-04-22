const loginValidate = (req, res, next) => {
    const errors = {}
    const { email, password } = req.body

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/
    if (!passwordRegex.test(password)) {
        errors.password = "Mật khẩu chưa thỏa điều kiện"
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]{6,30}@gmail\.com$/
    if (!emailRegex.test(email)) {
        errors.email = "Vui lòng nhập tài khoản email hợp lệ."
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }
    next()
}
export default loginValidate