// these select the HTML elements the calculator needs to interact with.
const numberButtons = document.querySelectorAll('.number');
const clearButton = document.querySelector('.clear');
const output = document.querySelector('output');

// handle the number button input.
numberButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const clickedNumber = event.target.textContent;


        // replace the initial zero, otherwise append the new digit.
        if (output.textContent === '0') {
            output.textContent = clickedNumber;
        } else {
            output.textContent += clickedNumber;
        }
    });
});

// reset the calculator display.
clearButton.addEventListener('click', () => {
    output.textContent = '0';
});