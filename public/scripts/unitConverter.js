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

function updateUnits() {
    const category = document.getElementById("category").value;

    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    Object.keys(units[category]).forEach(unit => {
        fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
        toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
    });
}

async function convert() {
    const category = document.getElementById("category").value;
    const from = document.getElementById("fromUnit").value;
    const to = document.getElementById("toUnit").value;
    const value = parseFloat(document.getElementById("inputValue").value);
    const resultDiv = document.getElementById("result");
    const errorDiv = document.getElementById("error");

    // Hide result and error divs initially
    resultDiv.style.display = "none";
    errorDiv.style.display = "none";

    if (isNaN(value)) {
        errorDiv.innerText = "Please enter a valid number.";
        errorDiv.style.display = "block";
        return;
    }

    try {
        const response = await fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category, from, to, value }),
        });

        if (!response.ok) {
            throw new Error('Failed to convert');
        }

        const data = await response.json();
        resultDiv.innerText = `Result: ${data.result} ${to}`;
        resultDiv.style.display = "block"; // Show the result div
    } catch (error) {
        errorDiv.innerText = "Error: Unable to perform conversion.";
        errorDiv.style.display = "block"; // Show the error div
    }
}

// Initialize with Length units
window.onload = updateUnits;