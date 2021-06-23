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
        const previousKeyType = calculator.dataset.previousKeyType;

        // Check/Log Actions
        if (!action) {
            if (displayedNum === "0" || previousKeyType === "operator") {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
        }

        if (action === "add" || "subtract" || "divide" || "multiply") {
            key.classList.add("is-depressed");
            calculator.dataset.previousKeyType = "operator";
        }

        if (action === "decimal") {
            // Can't have more than one decimal. 
            if (!displayedNum.includes(".")) {
                display.textContent = displayedNum + ".";
            }
        }

        if (action === "clear") {
            console.log("Clear Key")
        }

        if (action === "calculate") {
            console.log("Equal Key")
        }
        
        // Remove .depressed from all keys
        Array.from(key.parentNode.children).forEach(
            (k) => k.classList.remove("is-depressed")
        )
    }

});

