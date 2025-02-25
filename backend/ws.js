import http from "http"
import WebSocket, { WebSocketServer } from "ws";
import { app } from "./server.js";
import connectToBinance from "./connectWithBinance.js";

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Trading pairs to track
const tradingPairs = ["btcusdt", "ethusdt", "bnbusdt"];

// Binance WebSocket endpoints
const binanceStreams = tradingPairs.flatMap((pair) => [
    { type: "trade", url: `wss://stream.binance.com:9443/ws/${pair}@trade` },
    { type: "orderBook", url: `wss://stream.binance.com:9443/ws/${pair}@depth5` },
    { type: "ticker", url: `wss://stream.binance.com:9443/ws/${pair}@ticker` },
]);

// Store connected clients
export const clients = new Set();
console.log(clients)

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
