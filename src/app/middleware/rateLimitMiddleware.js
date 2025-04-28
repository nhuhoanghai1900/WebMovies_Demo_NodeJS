import rateLimit from "express-rate-limit";

const restoreRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 2000, // Tối đa 10 lần gọi trong 15 phút
    message: "Quá nhiều yêu cầu. Vui lòng thử lại sau.",
})

export default restoreRateLimiter