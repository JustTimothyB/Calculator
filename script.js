const button = document.querySelector('#one');
const output = document.querySelector('output');

if (button && output) {
    button.addEventListener('click', () => {
        output.textContent = '1';
    });
}