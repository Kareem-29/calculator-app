let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function btnClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;

        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal.toString(); // Convert runningTotal to string for display
            runningTotal = 0;
            break;

        case '←':
            if (buffer.length === 1 || (buffer.length === 2 && buffer[0] === '-' && buffer.length === 2)) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;

        case '.':
            if (!buffer.includes('.')) {
                buffer += '.';
            }
            break;

        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }

    const floatBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = floatBuffer;
    } else {
        flushOperation(floatBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(floatBuffer) {
    if (previousOperator === '+') {
        runningTotal += floatBuffer;
    } else if (previousOperator === '−') {
        runningTotal -= floatBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= floatBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= floatBuffer;
    }
}

function handleNumber(numString) {
    if (buffer === '0') {
        buffer = numString;
    } else {
        buffer += numString;
    }
}

function init() {
    document.querySelector('.calc-btns').addEventListener('click', function (event) {
        btnClick(event.target.innerText);
    });
}

function handleKeyboardInput(event){
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        handleNumber(key);
    } else if (key === '.') {
        handleSymbol('.');
    } else if (key === 'Enter' || key === '=') {
        handleSymbol('=');
    } else if (key === 'Backspace') {
        handleSymbol('←');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        const operator = key === '*' ? '×' : key === '/' ? '÷' : key === '-' ? '−' : key;
        handleSymbol(operator);
    }
    screen.innerText = buffer;
}

window.addEventListener('keydown', handleKeyboardInput);

init();
