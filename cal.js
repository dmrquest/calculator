const display = document.querySelector('#display')
const clearBtn = document.querySelector('#clear')
const signBtn = document.querySelector('#sign')
const percentageBtn = document.querySelector('#percent')
const equalBtn = document.querySelector('#equal')
const operators = ["+", "-", "*", "/"]
let numberString = ""
let equation = ""
let result = null
let operator = ""

// event listener for when a number is clicked
document.addEventListener("click", e => {
    if (!e.target.matches('.num')) return
    // if the number string is "", start a new number and remove the display text
    if (numberString === "") {
        display.innerText = ""
    }
    // if result is not null, clear the calculation
    if (result != null) {
        clear()
    }
    // get the button value, add it to the display and the number string
    const value = e.target.innerText
    if (value === ".") {
        checkDecimal()
        return
    }
    display.innerText += value
    numberString = display.innerText
})

// event listener for when an operator is clicked
document.addEventListener("click", e => {
    if (!e.target.matches('.operator')) return

    // if the result is not null, add the result to the equation, else add the number string
    if (result != null) {
        equation = result.toString()
        display.innerText = equation
        result = null
    } else {
        equation += numberString  
    }

    // get the operator
    operator = e.target.innerText
    if (operator === "x") {
        operator = "*"
    }
    if (operator === "÷") {
        operator = "/"
    }
    numberString = ""
    checkOperator()
})

// event listener for the % button
percentageBtn.addEventListener("click", () => {
    const convertDisplay = parseFloat(display.innerText)
    const percentage = convertDisplay / 100
    display.innerText = percentage.toString()
    numberString = display.innerText
    if (result !== null) {
      equation = ""
      result = null
    }
})

// event listener for the +/- button
signBtn.addEventListener("click", () => {
    const convertDisplay = parseFloat(display.innerText)
    // if the result is not null, use the result and add or remove "-"
    if (result !== null) {
        equation = "" 
        if (convertDisplay > 0) {
            display.innerText = "-" + result.toString()
            numberString = display.innerText
        } else if (convertDisplay < 0) {
            const string = result.toString()
            const negativeSign = display.innerText.substr(string[0], 1)
            display.innerText = string.replace(negativeSign, "")
            numberString = display.innerText
        }
        result = null
        return
    }
    // if the result is null, use the currently displayed text
    if (convertDisplay > 0) {
        display.innerText = "-" + display.innerText
        numberString = display.innerText
    } else if (convertDisplay < 0) {
        const negativeSign = display.innerText.substr(display.innerText[0], 1)
        display.innerText = display.innerText.replace(negativeSign, "")
        numberString = display.innerText
    }
})

// event listener for the clear button
clearBtn.addEventListener("click", clear)

// event listener for equals button
equalBtn.addEventListener("click", () => {
        equation += numberString
        result = eval(equation)
        display.innerText = result
})

// do not allow two decimal points in a row
function checkDecimal() {
    const lastChar = numberString.charAt(numberString.length-1)
    if (lastChar === ".") return
    else {
        numberString += "."
        display.innerText = numberString
    }
}

// do not allow two operators in a row
function checkOperator() {
    const lastChar = equation.charAt(equation.length-1)
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === lastChar) {
            const remove = equation.substr(equation.length-1, 1)
            equation = equation.replace(remove, operator)
            return
        }
    }
    equation += operator
}

// clear calc
function clear() {
    display.innerHTML = ""
    numberString = ""
    equation = ""
    result = null
}