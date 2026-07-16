// HTML Element References
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const backspaceButton = document.querySelector('.backspace');
const output = document.querySelector('output');
const equalButton = document.querySelector('.equal');
const decimalButton = document.querySelector('.decimal');
const historyList = document.querySelector('.history-list');
const emptyHistory = document.querySelector('.empty-history');

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
    let result;

    if (selectedOperator === '+') {
        result = firstNumber + secondNumber;
    }

    if (selectedOperator === '-') {
        result = firstNumber - secondNumber;
    }

    if (selectedOperator === '*') {
        result = firstNumber * secondNumber;
    }

    if (selectedOperator === '/') {
        result = firstNumber / secondNumber;
    }

    output.textContent = result;

    if (emptyHistory){
        emptyHistory.remove();
    }
    const historyItem = document.createElement('p');

    historyItem.textContent =
        `${firstNumber} ${selectedOperator} ${secondNumber} = ${result}`;

historyList.prepend(historyItem);
});

decimalButton.addEventListener('click', () => {
    if (waitingForSecondNumber === true) {
        output.textContent = '0.';
        waitingForSecondNumber = false;
        return;
    }

    if (output.textContent.includes('.')){
        return;
    }

    output.textContent += '.';
})

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        const numberButton = [...numberButtons].find(
            (button) => button.textContent === key);

            numberButton.click();
    }

    if (key === '.'){
        decimalButton.click();
    }

    if (key === '+' || key === '-' || key === '*' || key === '/') {
        const operatorButton = [...operatorButtons].find(
            (button) => button.textContent === key);
            operatorButton.click();
    }

    if (key === 'Enter' || key === '=') {
        equalButton.click();
    }

    if (key === 'Backspace' || key === 'Delete') {
        backspaceButton.click();
    }

    if (key === 'Escape') {
        clearButton.click();
    }

});

backspaceButton.addEventListener('click', () => {
    if (output.textContent.length > 1) {
        output.textContent = output.textContent.slice(0, -1);
    } else {
        output.textContent = '0';
    }
})

// reset the calculator display.
clearButton.addEventListener('click', () =>{
    output.textContent = '0';
    firstNumber = null;
    selectedOperator = null;
    waitingForSecondNumber = false;
});