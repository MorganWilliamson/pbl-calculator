// Grab calculator/keys from HTML
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display");

// Wait for user to click button
keys.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
        const key = e.target;
        const action = key.dataset.action; // data-action !== number
        const keyContent = key.textContent;
        const displayedNum = display.textContent;

        // Check/Log Actions
        if (!action) {
            if (displayedNum === "0") {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
        };

        if (
            action === "add" ||
            action === "subtract" ||
            action === "divide" ||
            action === "multiply"
        ) {
            console.log("Operator Key: ", key)
        };

        if (action === "decimal") {
            if (!displayedNum.includes(".")) {
                display.textContent = displayedNum + ".";
            }
        };

        if (action === "clear") {
            console.log("Clear Key")
        };

        if (action === "calculate") {
            console.log("Equal Key")
        };
    }
});

