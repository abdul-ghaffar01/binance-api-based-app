import redis from "../../redis.js";

// Add token to Redis blacklist (auto-expiring)
export async function addToBlacklist(token, expiresInSeconds) {
    await redis.set(token, "blacklisted", "EX", expiresInSeconds);
}

// Check if token is blacklisted
export async function isTokenBlacklisted(token) {
    const exists = await redis.get(token);
    return exists !== null;
}
