const fs = require("fs")
const express = require("express")
const router = express.Router()
const { weather } = require("../app/controller")
const convert = require("../app/convertSuhu")

const Kembalikan = (callback) => {
    setTimeout(() => {
        callback(fs.writeFileSync("app/models/history.json", "[]"))
    }, 500)
}

router.get("/suhu", weather.getOneCity)

router.get("/", async (req, res) => {
    Kembalikan((result) => {
        res.render("index", { weather: null, convert, history: null, err: null })
    })
})

router.post("/search", weather.GetWeather)


module.exports = router