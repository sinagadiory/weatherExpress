const fs = require("fs")
const express = require("express")
const router = express.Router()
const { weather } = require("../app/controller")
const convert = require("../app/convertSuhu")



router.get("/suhu", weather.getOneCity)

router.get("/", (req, res) => {
    fs.writeFileSync("app/models/history.json", "[]")
    res.render("index", { weather: null, convert, history: null })
})

router.post("/", weather.GetWeather)


module.exports = router