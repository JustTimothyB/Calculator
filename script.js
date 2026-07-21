const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const backspaceButton = document.querySelector('.backspace');
const output = document.querySelector('output');
const equalButton = document.querySelector('.equal');
const decimalButton = document.querySelector('.decimal');
const historyList = document.querySelector('.history-list');
const emptyHistory = document.querySelector('.empty-history');
const clearHistoryButton = document.querySelector('.clear-history');
const percentButton = document.querySelector('.percent');
const positiveNegativeButton = document.querySelector('.positive-negative');
const powerButton = document.querySelector('.power');

let firstNumber = null;
let selectedOperator = null;
let waitingForSecondNumber = false;
let calculationHistory = JSON.parse(localStorage.getItem('calculationHistory')) || [];

numberButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const clickedNumber = event.target.textContent;


        if (output.textContent === '0' ||
            waitingForSecondNumber === true
        ) {
            output.textContent = clickedNumber;
            waitingForSecondNumber = false;
        } 
        else {
            if (output.textContent.length >= 12){
                return;
            }

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
        if (secondNumber === 0) {
            output.textContent = 'Error';
            return;
        }

        result = firstNumber / secondNumber;
    }

    if (selectedOperator === 'x^y') {
        result = Math.pow(firstNumber, secondNumber);
    }

    output.textContent = result;

    if (emptyHistory){
        emptyHistory.remove();
    }

const calculation = `${firstNumber} ${selectedOperator} ${secondNumber} = ${result}`;
calculationHistory.unshift(calculation);
localStorage.setItem(
    'calculationHistory',
    JSON.stringify(calculationHistory)
);

displayHistory();

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
        event.preventDefault();
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

function displayHistory() {
    historyList.innerHTML = '';
    calculationHistory.forEach((calculation) => {
        const historyItem = document.createElement('p');
        historyItem.textContent = calculation;
        historyList.appendChild(historyItem);
    });
}

displayHistory();

clearHistoryButton.addEventListener('click', () => {
    calculationHistory = [];
    localStorage.setItem(
        'calculationHistory',
        JSON.stringify(calculationHistory)
    );
        displayHistory();

        historyList.innerHTML = '<p class = "empty-history"> No Calculations yet.</p>';

})

percentButton.addEventListener('click', () => {
    const currentNumber = Number(output.textContent);
    let percentResult;
    if (
        firstNumber !== null &&
        (selectedOperator === '+' || selectedOperator === '-')
    ) {
            percentResult = firstNumber * (currentNumber / 100);
        } else {
            percentResult = currentNumber / 100;
        }
        output.textContent = Number(percentResult.toFixed(10));
});

positiveNegativeButton.addEventListener('click', () => {
    const currentNumber = Number(output.textContent);
    output.textContent = currentNumber * -1;
})

clearButton.addEventListener('click', () =>{
    output.textContent = '0';
    firstNumber = null;
    selectedOperator = null;
    waitingForSecondNumber = false;
});