import express from "express"
const router = express.Router();

// -------- Protected routes


// recent trades 
// /api/market/trades/:symbol

// user account balance 
// /api/account/balance

// user's open orders 
// /api/account/orders

// Past trade history
// /api/account/trade-history

// plalce a new order
// /api/trade/order



// Update Redis key with new weight & auto-expire in 60 seconds
// await redis.set("binance_used_weight", newWeight, "EX", 60);


export default router;