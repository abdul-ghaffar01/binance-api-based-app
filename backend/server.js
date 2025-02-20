import express from "express";
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import binanceRoutes from "./routes/binanceRoutes.js"
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4001;
const app = express();

// Middleware to parse JSON
app.use(express.json());


// ---------- All the routes

// User routes
app.use("/user", userRoutes);

// Authentication routes
app.use("/auth", authRoutes);

// Binance routes
app.use("/binance", binanceRoutes)

// ---------- Routes end here


// ---------- Listening to the requests
app.listen(PORT, () => {
    console.log("Listening to the port ", PORT);
})




