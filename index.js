// Grab calculator/keys from HTML
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display");

// Calculate Function
const calculate = (num1, operator, num2) => {
    let result = "";

    // Result and display are concatenated strings, parseFloat to get num
    if (operator === "add") {
        result = parseFloat(num1) + parseFloat(num2);
    } else if (operator === "subtract") {
        result = parseFloat(num1) - parseFloat(num2);
    } else if (operator === "divide") {
        result = parseFloat(num1) / parseFloat(num2);
    } else if (operator === "multiply") {
        result = parseFloat(num1) * parseFloat(num2);
    }

    return result;
}

// Wait for user to click button
keys.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
        const key = e.target;
        const action = key.dataset.action; // data-action !== number
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        // Remove .is-depressed from all keys
        Array.from(key.parentNode.children).forEach(
            (k) => k.classList.remove("is-depressed")
        )

        // Check/Log Actions
        if (!action) {
            if (displayedNum === "0" || 
            previousKeyType === "operator" ||
            previousKeyType === "calculate"
            ) {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = "number";
        }

        // Operator Keys
        if (action === "add" || "subtract" || "divide" || "multiply") {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            if (firstValue && 
                operator &&
                previousKeyType !== "operator" &&
                previousKeyType !== "calculate"
                ) {
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;

                calculator.dataset.firstValue = calcValue;
            } else {
                calculator.dataset.firstValue = displayedNum;
            }

            key.classList.add("is-depressed");
            calculator.dataset.previousKeyType = "operator";
            calculator.dataset.operator = action;
        }

        // Decimal Key
        if (action === "decimal") {
            // Can't have more than one decimal. 
            if (!displayedNum.includes(".")) {
                display.textContent = displayedNum + ".";
            } else if (
                previousKeyType === "operator" ||
                previousKeyType === "calculate"
            ) {
                display.textContent = "0."
            }
            calculator.dataset.previousKeyType = "decimal";
        }

        // Clear Key
        if (action === "clear") {
            console.log("Clear Key")
            calculator.dataset.previousKeyType = "clear";
        }

        // Change AC -> CE
        if (action !== "clear") {
            const clearButton = calculator.querySelector("[data-action=clear]");
            clearButton.textContent = "CE";
        }


        // Equals Key
        if (action === "calculate") {
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayedNum;

            if (firstValue) {
                if (previousKeyType === "calculate") {
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modValue
                }
            
                display.textContent = calculate(firstValue, operator, secondValue);
            }
            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = "calculate";
        }
    }
});

