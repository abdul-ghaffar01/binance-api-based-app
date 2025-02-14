// import express from "express";
// import userRoutes from "./routes/userRoutes.js"
// import authRoutes from "./routes/authRoutes.js"
// import binanceRoutes from "./routes/binanceRoutes.js"
// import dotenv from "dotenv";
// dotenv.config();

// const PORT = process.env.PORT || 4001;
// const app = express();

// // Middleware to parse JSON
// app.use(express.json());


// // ---------- All the routes

// // User routes
// app.use("/user", userRoutes);

// // Authentication routes
// app.use("/auth", authRoutes);

// // Binance routes
// app.use("/binance", binanceRoutes)

// // ---------- Routes end here


// // ---------- Listening to the requests
// app.listen(PORT, () => {
//     console.log("Listening to the port ", PORT);
// })





const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Trading pairs to track
const tradingPairs = ["btcusdt", "ethusdt", "bnbusdt"];

// Binance WebSocket endpoints
const binanceStreams = tradingPairs.flatMap((pair) => [
    { type: "trade", url: `wss://stream.binance.com:9443/ws/${pair}@trade` },
    { type: "orderBook", url: `wss://stream.binance.com:9443/ws/${pair}@depth5` },
    { type: "ticker", url: `wss://stream.binance.com:9443/ws/${pair}@ticker` },
]);

// Store connected clients
const clients = new Set();

// Function to handle Binance WebSocket connections
const connectToBinance = (url, pair, type) => {
    const ws = new WebSocket(url);

    ws.on("open", () => console.log(`✅ Connected to Binance WebSocket (${pair.toUpperCase()} - ${type})`));

    ws.on("message", (data) => {
        const parsedData = JSON.parse(data);
        let formattedData = {};

        if (type === "trade") {
            formattedData = {
                type,
                pair: pair.toUpperCase(),
                price: parseFloat(parsedData.p).toFixed(2),
                quantity: parseFloat(parsedData.q).toFixed(4),
                time: new Date(parsedData.T).toLocaleTimeString(),
                isBuyerMaker: parsedData.m, // Buyer or seller side
            };
        } else if (type === "orderBook") {
            formattedData = {
                type,
                pair: pair.toUpperCase(),
                bids: parsedData.bids.slice(0, 3), // Top 3 bid prices
                asks: parsedData.asks.slice(0, 3), // Top 3 ask prices
            };
        } else if (type === "ticker") {
            formattedData = {
                type,
                pair: pair.toUpperCase(),
                lastPrice: parseFloat(parsedData.c).toFixed(2),
                priceChange: parseFloat(parsedData.p).toFixed(2),
                highPrice: parseFloat(parsedData.h).toFixed(2),
                lowPrice: parseFloat(parsedData.l).toFixed(2),
            };
        }

        // Broadcast to all connected clients
        for (const client of clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(formattedData));
            }
        }
    });

    ws.on("close", () => {
        console.log(`❌ Disconnected from Binance WebSocket (${pair.toUpperCase()} - ${type}), reconnecting...`);
        setTimeout(() => connectToBinance(url, pair, type), 5000); // Auto-reconnect
    });

    ws.on("error", (err) => console.error(`Binance WebSocket Error (${pair.toUpperCase()} - ${type}):`, err));
};

// Start Binance WebSocket connections
binanceStreams.forEach(({ url, type }) => {
    const pair = url.split("/").pop().split("@")[0];
    connectToBinance(url, pair, type);
});

wss.on("connection", (ws) => {
    console.log("✅ Client connected");
    clients.add(ws);

    ws.send(JSON.stringify({ type: "welcome", message: "Connected to Binance WebSocket Proxy" }));

    ws.on("close", () => {
        console.log("❌ Client disconnected");
        clients.delete(ws);
    });

    ws.on("error", (err) => console.error("WebSocket Error:", err));
});

app.get("/", (req, res) => {
    res.send("Binance WebSocket Proxy Running with Multiple Streams!");
});

server.listen(4001, () => {
    console.log("🚀 Server running on http://localhost:4001");
});
