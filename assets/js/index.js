let foundations = document.getElementById('foundations')
let imperative = document.getElementById('imperative')
let objects = document.getElementById('objects')

function cleanErrorMessages() {
    document.querySelectorAll(`.error-msg`).forEach(msg => msg.innerText = "")
}



document.getElementById('imperative').addEventListener('change', (evt) => {
    calculate()
});

document.getElementById('foundations').addEventListener('change', () => {
    calculate()
});
document.getElementById('objects').addEventListener('change', () => {
    calculate()
});

['input','focusout'].forEach( event => {
    document.getElementById('objects').addEventListener(event, (evt) => {
        restrictValue(document.getElementById('objects'))
        calculate()
    });
});

['input','focusout'].forEach( event => {
    document.getElementById('imperative').addEventListener(event, (evt) => {
        restrictValue(document.getElementById('imperative'))
        calculate()
    });
});

['input','focusout'].forEach( event => {
    document.getElementById('foundations').addEventListener(event, (evt) => {
        restrictValue(document.getElementById('foundations'))
        calculate()
    });
});


function restrictValue(input) {
    if (input === "") {
        return;
    }
    if (input.value < 0) {
        input.value = 0;
    }
    if (input.value > 100) {
        input.value = 100;
    }
}

function resetForm(){
    cleanErrorMessages()

    document.getElementById('imperative').value = ''
    document.getElementById('objects').value = ''
    document.getElementById('foundations').value = ''

    document.getElementById('result').innerText = "0.00"

    let color = hsl_col_perc(0, green, red);
    setWavePercent(0)
    setWaveColor(color)
}

function setWaveColor(color) {
    document.getElementsByClassName('wave')[0].style.backgroundColor = color
}

function setWavePercent(percent) {
    document.getElementsByClassName('wave')[0].style.top = (100 - percent).toString()+"%";
}

function setErrorMessage(field) {
    if (document.getElementById(`${field.id}-msg-container`) !== null) {
        document.getElementById(`${field.id}-msg-container`).innerText = field.title;
    }
}

function validate() {
    cleanErrorMessages()
    let fields = document.querySelectorAll(':invalid')

    fields.forEach(field => setErrorMessage(field))
}

function isNotANumber(value) {
    return 'NaN' === value || 'Infinity' === value || undefined === value || 'undefined' === value || 'null' === value || null === value
}

// Just used as a shortcut for below, completely optional
const red = 0,
    yellow = 60,
    green = 120,
    turquoise = 180,
    blue = 240,
    pink = 300;
function hsl_col_perc(percent, start, end) {
    var a = percent / 100,
        b = (end - start) * a,
        c = b + start;

    // Return a CSS HSL string
    return 'hsl('+c+', 90%, 40%)';
}

function calculate() {
    validate()

    let imperative = document.getElementById('imperative').value || 0
    let foundations = document.getElementById('foundations').value || 0
    let objects = document.getElementById('objects').value || 0

    let imperativeCalculated = parseFloat(imperative) * 0.50
    let foundationsCalculated = parseFloat(foundations) * 0.30
    let objectsCalculated = parseFloat(objects) * 0.20

    let total = imperativeCalculated + foundationsCalculated + objectsCalculated

    let color = hsl_col_perc((100 - total), green, red);
    setWavePercent(total)
    setWaveColor(color)

    if (!isNotANumber(total.toString())) {
        document.getElementById('result').innerText = total.toFixed(2)
    }else {
        document.getElementById('result').innerText = "0.00"
    }
}