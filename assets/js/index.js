let foundations = document.getElementById('foundations')
let imperative = document.getElementById('imperative')
let objects = document.getElementById('objects')

function cleanErrorMessages() {
    document.querySelectorAll(`.error-msg`).forEach(msg => msg.innerText = "")
}



document.getElementById('imperative').addEventListener('input', (evt) => {
    calculate()
});

document.getElementById('foundations').addEventListener('change', () => {
    calculate()
});
document.getElementById('objects').addEventListener('change', () => {
    calculate()
});


function resetForm(){
    cleanErrorMessages()

    document.getElementById('imperative').value = 1
    document.getElementById('objects').value = 1
    document.getElementById('foundations').value = 1

    document.getElementById('result').innerText = "0.00"
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

function isInvalid() {
    return document.querySelectorAll(':invalid').length !== 0
}

function isNotANumber(value) {
    return 'NaN' === value || 'Infinity' === value || undefined === value || 'undefined' === value || 'null' === value || null === value
}


function calculate() {
    validate()

    if (isInvalid()) {
       return
    }

    let imperative = document.getElementById('imperative').value;
    let foundations = document.getElementById('foundations').value;
    let objects = document.getElementById('objects').value;

    let imperativeCalculated = parseFloat(imperative) * 0.50
    let foundationsCalculated = parseFloat(foundations) * 0.30
    let objectsCalculated = parseFloat(objects) * 0.20

    let total = imperativeCalculated + foundationsCalculated + objectsCalculated

    if (!isNotANumber(total.toString())) {
        document.getElementById('result').innerText = total.toString()
    }else {
        document.getElementById('result').innerText = "0.00"
    }
}