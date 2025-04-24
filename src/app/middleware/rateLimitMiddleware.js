import rateLimit from "express-rate-limit";

const restoreRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 10, // Tối đa 10 lần gọi trong 15 phút
    message: "Quá nhiều yêu cầu khôi phục. Vui lòng thử lại sau.",
})

export default restoreRateLimiter