// HTML Element References
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const output = document.querySelector('output');
const equalButton = document.querySelector('.equal');

// Calculator State
let firstNumber = null;
let selectedOperator = null;
let waitingForSecondNumber = false;

// handle the number button input.
numberButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const clickedNumber = event.target.textContent;


        // replace the initial zero, otherwise append the new digit.
        if (output.textContent === '0' ||
            waitingForSecondNumber === true
        ) {
            output.textContent = clickedNumber;
            waitingForSecondNumber = false;
        } 
        else {
            output.textContent += clickedNumber;
        }
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        firstNumber = Number(output.textContent);
        selectedOperator = event.target.textContent;
        waitingForSecondNumber = true;
    })
})

equalButton.addEventListener('click', () => {
    const secondNumber = Number(output.textContent);

    if (selectedOperator === '+'){
        const result = firstNumber + secondNumber;
        output.textContent = result;
    }
});

// reset the calculator display.
clearButton.addEventListener('click', () => {
    output.textContent = '0';
});