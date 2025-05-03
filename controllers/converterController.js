const units = {
    Length: {
        Meter: 1,
        Kilometer: 0.001,
        Centimeter: 100,
        Mile: 0.000621371,
        Inch: 39.3701,
        Foot: 3.28084
    },
    Weight: {
        Gram: 1,
        Kilogram: 0.001,
        Pound: 0.00220462,
        Ounce: 0.035274
    },
    Temperature: {
        Celsius: 'C',
        Fahrenheit: 'F',
        Kelvin: 'K'
    },
    Area: {
        'Square Meter': 1,
        'Square Kilometer': 0.000001,
        'Square Foot': 10.7639,
        'Square Mile': 3.861e-7,
        'Acre': 0.000247105,
        'Hectare': 0.0001
    },
    Volume: {
        'Cubic Meter': 1,
        Liter: 1000,
        Milliliter: 1000000,
        'Cubic Centimeter': 1000000,
        'Cubic Inch': 61023.7,
        'Cubic Foot': 35.3147,
        Gallon: 264.172
    },
    Time: {
        Second: 1,
        Minute: 1 / 60,
        Hour: 1 / 3600,
        Day: 1 / 86400
    },
    Speed: {
        'Meter per second': 1,
        'Kilometer per hour': 3.6,
        'Mile per hour': 2.23694,
        'Foot per second': 3.28084
    }
};

function convertTemperature(value, from, to) {
    if (from === to) return value;

    let celsius;
    if (from === 'Fahrenheit') celsius = (value - 32) * 5 / 9;
    else if (from === 'Kelvin') celsius = value - 273.15;
    else celsius = value;

    if (to === 'Fahrenheit') return (celsius * 9 / 5) + 32;
    if (to === 'Kelvin') return celsius + 273.15;
    return celsius;
}

exports.convert = (req, res) => {
    const { category, from, to, value } = req.body;

    if (!units[category] || !units[category][from] || !units[category][to]) {
        return res.status(400).json({ error: 'Invalid conversion parameters' });
    }

    let result;
    if (category === 'Temperature') {
        result = convertTemperature(value, from, to);
    } else {
        const baseValue = value / units[category][from];
        result = baseValue * units[category][to];
    }

    res.json({ result: result.toFixed(4) });
};