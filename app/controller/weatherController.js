const fs = require("fs")
const request = require("request")
const moment = require("moment")
const apiKey = "ce49b3a96ffb8a6b037cd31bc4b6cfcf"
const convert = require("../convertSuhu")
const file = fs.readFileSync("app/models/history.json", "utf-8")
const history = JSON.parse(file)

const getOneCity = (req, res) => {
    const { kota } = req.query
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${apiKey}`
    request(url, (err, response, body) => {
        if (err) {
            res.render("index", { weather: null, err: "Try again" })
        } else {
            let weather = JSON.parse(body)
            res.render("index", { weather, convert, history })
        }
    })
}


const GetWeather = (req, res) => {
    const { city } = req.body
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    request(url, (err, response, body) => {
        if (err) {
            res.render("index", { weather: null, err: "Try again" })
        } else {
            let weather = JSON.parse(body)
            weather.waktu = moment().format('lll');
            const ada = history.find((his) => (his.name == weather.name))
            if (!ada) {
                history.unshift(weather)
            } else {
                ada.waktu = moment().format('lll');
            }
            if (history.length == 0) {
                history.unshift(weather)
            }
            const waktu = (callback) => {
                setTimeout(() => {
                    callback("selesai")
                }, 1500)
            }
            waktu((result) => {
                fs.writeFileSync("app/models/history.json", JSON.stringify(history))
                console.log(result)
                res.render("index", { weather, convert, history })
            })
        }
    })
}

module.exports = { GetWeather, getOneCity }