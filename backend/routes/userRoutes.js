import express from "express"

const router = express.Router();

router.get("/check", (req, res) => {
    res.send("Working just fine\n");
})

export default router