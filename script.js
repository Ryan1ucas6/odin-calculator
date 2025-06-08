function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}
 function divide(a, b) {
    if(b === 0) {
        return "Error: Can't divide by zero!"
    }
    return a / b;
 }

 function operate(operator, a, b) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return subtract(a, b);
    } else if (operator === "*") {
        return multiply(a, b);
    } else if (operator === "/") {
        return divide(a, b);
    } else {
        alert("Error: Incorrect operator!");
        return null;
    }
 }


 const display = document.querySelector(".display")
 const digitButtons = document.querySelectorAll(".digit")
 const operatorButtons = document.querySelectorAll(".operator")
 const equalButton = document.querySelector(".equal")
 const clearButton = document.querySelector(".clear")

 let firstOperand = "";
 let secondOperand = "";
 let currentOperator = null;
 let shouldResetDisplay = false;

digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        const buttonValue = button.textContent;

        if (shouldResetDisplay) {
            if (buttonValue === ".") {
                display.textContent = "0.";
                shouldResetDisplay = false;
                return;
            }
            display.textContent = "";
            shouldResetDisplay = false;
        }

        if (buttonValue === "." && display.textContent.includes(".")) return;

        display.textContent += buttonValue;
    });
});




operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if(currentOperator !== null && !shouldResetDisplay) {
            const secondOperand = parseFloat(display.textContent);
            const result = operate(currentOperator, firstOperand, secondOperand);
            display.textContent = result;
            firstOperand = result;
        } else {
            firstOperand = parseFloat(display.textContent);
        }
        currentOperator = button.textContent;
        shouldResetDisplay = true;
    })
})

equalButton.addEventListener("click", () => {
    if(currentOperator === null || shouldResetDisplay) return;
    const secondOperand = parseFloat(display.textContent);
    const result = operate(currentOperator, firstOperand, secondOperand);
    
    if(typeof result === "string") {
        display.textContent = result;
        firstOperand = "";
        currentOperator = null;
        shouldResetDisplay = true;
    } else {
        display.textContent = result;
        firstOperand = result;
        currentOperator = null
        shouldResetDisplay = true;
    }
})

clearButton.addEventListener("click", () => {
    display.textContent = "";
    firstOperand = "";
    secondOperand = "";
    currentOperator = null;
    shouldResetDisplay = false;
})