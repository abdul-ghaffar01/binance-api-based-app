import WebSocket from "ws";
import { clients } from "./ws.js";

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

export default connectToBinance