
const displayNum = document.querySelector('.display-num');

const calculator = {
  displayVal: '0',
  firstOperand: null,
  waitingForNextOperand: false,
  operator: null,
};

function updateDisplay() {
  displayNum.textContent = calculator.displayVal;
}
updateDisplay();

const keyClick = document.querySelector('.keyboard');

keyClick.addEventListener('click', (e) => {
  const keyValue = e.target.value;
  const keyClass = e.target.classList.value;

  if (keyClass === 'operand') {
    enterKeyDigit(keyValue);
    updateDisplay();
  }
  if (keyClass === 'decimal') {
    enterDecimal(keyValue);
    updateDisplay();
  }
  if (keyClass === 'operator') {
    takeOperator(keyValue);
    updateDisplay();
  }
  if (keyClass === 'sign') {
    getSign(keyValue);
    updateDisplay();
  }
  if (keyClass.includes('percent')) {
    getPercent(keyValue);
    updateDisplay();
  }
  if (keyClass.includes('equals')) {
    takeOperator(keyValue);
    updateDisplay();
  }
  if (keyClass === 'delete') {
    clearCurrent();
    updateDisplay();
  }
  if (keyClass === 'clear') {
    clearAll();
    updateDisplay();
  }


});

window.addEventListener('keydown', (e) => {
  if (e.key === '/') { e.preventDefault() };
  let keyPress = document.querySelector(`button[key="${e.key}"]`);
  if (e.key === "Enter" || e.key === "=") {
    keyPress = document.querySelector(`button[key="enter"]`);
  }
  keyPress.click();

});

function enterKeyDigit(value) {
  const displayVal = calculator.displayVal;
  const waitingForNextOperand = calculator.waitingForNextOperand;

  if (waitingForNextOperand === true) {
    calculator.displayVal = value;
    calculator.waitingForNextOperand = false;
  } else if (displayVal === '0') {
    calculator.displayVal = value;
  } else {
    calculator.displayVal = displayVal + value;
  }

}

function enterDecimal(point) {
  const currVal = calculator.displayVal;
  const waiting = calculator.waitingForNextOperand;

  if (waiting) {
    calculator.displayVal = '0.';
    calculator.waitingForNextOperand = false;
    return;
  }
  if (!currVal.includes(point)) {
    calculator.displayVal += point;
  }
}

function takeOperator(nextOperator) {
  const { firstOperand, displayVal, operator } = calculator;
  const inputVal = parseFloat(displayVal);

  if (firstOperand === null && !isNaN(inputVal)) {
    calculator.firstOperand = inputVal;
  } else if (operator) {
    const result = operate(firstOperand, inputVal, operator);
    calculator.displayVal = `${parseFloat(result.toFixed(9))}`;
    if (calculator.displayVal === "Infinity") {
      calculator.displayVal = 'lol nope';
    }

    calculator.firstOperand = result;
  }

  calculator.waitingForNextOperand = true;
  calculator.operator = nextOperator;
}

function operate(firstOperand, nextOperand, operator) {
  if (operator === '+') {
    return firstOperand + nextOperand;
  } else if (operator === '-') {
    return firstOperand - nextOperand;
  } else if (operator === '*') {
    return firstOperand * nextOperand;
  } else if (operator === '/') {
    return firstOperand / nextOperand;
  } else if (operator === '=' || operator === 'Enter') {
    return nextOperand;

  }

}

function clearAll() {
  calculator.displayVal = '0';
  calculator.firstOperand = null;
  calculator.waitingForNextOperand = false;
  calculator.operator = null;

}

function clearCurrent() {
  calculator.displayVal = '0';

}

function getPercent(value) {
  const displayVal = calculator.displayVal;
  const firstOperand = parseFloat(displayVal);
  const result = firstOperand * 0.01;

  calculator.displayVal = result.toString();

}

function getSign(value) {
  const displayVal = calculator.displayVal;
  const firstOperand = parseFloat(displayVal);
  const result = firstOperand * -1;
  calculator.displayVal = result.toString();

}
