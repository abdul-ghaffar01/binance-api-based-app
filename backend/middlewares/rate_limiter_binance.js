import redis from "../redis.js";

// Binance API Rate Limits
const MAX_WEIGHT_PER_MIN = 1200; // 1200 per minute

// Middleware to prevent new calls
export default async function rateLimiter(req, res, next) {
    const usedWeight = await redis.get("binance_used_weight") || 0;

    if (usedWeight >= MAX_WEIGHT_PER_MIN) {
        return res.status(429).json({ error: "Rate limit exceeded. Try again later." });
    }

    next();
};