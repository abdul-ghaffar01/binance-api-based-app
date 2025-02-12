import express from "express";

const PORT = 4001;
const app = express();


app.listen(PORT, () => {
    console.log("Listening to the port ", PORT);
})