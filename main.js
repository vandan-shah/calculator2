const calculator = document.querySelector('.calculator')
const keys = document.querySelector('.row1')
const display = document.querySelector('.input')

keys.addEventListener('click', event => {
    if(!event.target.closest('button')) return

    const key = event.target
    const keyValue = key.textContent
    const displayValue = display.textContent
    const { type } = key.dataset
    const { previousKeyType } = calculator.dataset


    // NUMBER
    if (type === 'number') {
        if (displayValue === '0') {
            display.textContent = keyValue
        } else if (previousKeyType === 'operator') {
            display.textContent = keyValue
        } else {
            display.textContent = displayValue + keyValue
        }
    }


    // OPERATOR
    if (type === 'operator') {
        const operatorKeys = keys.querySelectorAll('[data-type="operator"]')
        operatorKeys.forEach(el => { el.dataset.state = '' })
        key.dataset.state = 'selected'

        calculator.dataset.firstNumber = displayValue
        calculator.dataset.operator = key.dataset.key
    }


    // EQUAL
    if (type === 'equal') {
        const firstNumber = parseInt(calculator.dataset.firstNumber)
        const operator = calculator.dataset.operator
        const secondNumber = parseInt(displayValue)
        console.log(firstNumber, operator, secondNumber)

        let result = ''
        if (operator === 'add') result = firstNumber + secondNumber
        if (operator === 'subtract') result = firstNumber - secondNumber
        if (operator === 'multiply') result = firstNumber * secondNumber
        if (operator === 'divide') result = firstNumber / secondNumber

        display.textContent = result
    }


    // CLEAR
    if (type === 'clear') {
        display.textContent = 0
    }

    calculator.dataset.previousKeyType = type
})

