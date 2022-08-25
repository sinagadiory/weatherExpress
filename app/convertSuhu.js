
function Bulat(x) {
    return Number.parseFloat(x).toFixed(2);
}

const convert = (suhu, skala) => {
    if (skala == "Kelvin") {
        return suhu
    } else if (skala == "Celcius") {
        const hasil = suhu - 273
        return Bulat(hasil)
    } else if (skala == "Reamur") {
        let celcius = suhu - 273
        return Bulat((4 / 5) * celcius)
    } else {
        let celcius = suhu - 273
        return Bulat(((9 / 5) * celcius) + 32)
    }
}

module.exports = convert