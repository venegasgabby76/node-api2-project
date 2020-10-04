const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
    res.json({
        message: "LETS GET IT STARTED"
    })
})

module.exports = router