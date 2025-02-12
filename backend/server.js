import express from "express";
import userRoutes from "./routes/userRoutes.js"

const PORT = 4001;
const app = express();

// Middleware to parse JSON
app.use(express.json());

// All the routes
app.use("/user", userRoutes);



app.listen(PORT, () => {
    console.log("Listening to the port ", PORT);
})