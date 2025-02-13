import Redis from "ioredis";

// Create Redis client
const redis = new Redis({
    host: "127.0.0.1", // Redis server address
    port: 6379,        // Default Redis port
});

// Handle connection errors
redis.on("error", (err) => console.error("Redis Error:", err));

export default redis;
