const calculateTip = (total,tipPercemt = 0.2) => total + (total * tipPercemt)

const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32
}


module.exports = {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit
}