const numberButtons = document.querySelectorAll('.number');
const output = document.querySelector('output');

numberButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const clickedNumber = event.target.textContent;

        if (output.textContent === '0') {
            output.textContent = clickedNumber;
        } else {
            output.textContent += clickedNumber;
        }
    });
});