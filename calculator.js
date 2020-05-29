const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

const operate = function (operator, a, b) {
   switch (operator) {
      case "add":
         return add(a,b);
      case "subtract":
         return subtract(a,b);
      case "multiply":
         return multiply(a,b);
      case "divide":
         return divide(a,b);
      default:
         console.log(`error in operate(): ${operator} is not a valid operator`);
   }
}

const clearButton = document.getElementById("clear");
const divideButton = document.getElementById("divide");
const multiplyButton = document.getElementById("multiply");
const subtractButton = document.getElementById("subtract");
const addButton = document.getElementById("add");
const equalsButton = document.getElementById("equals");

const operatorButtons = [clearButton, divideButton, multiplyButton, subtractButton, addButton];

const clearSelected = function() {
   let selectedButton = document.querySelector(".selected");
   if (selectedButton) {
      selectedButton.classList.remove("selected");
   }
   operatorSelected = undefined;
}

const displayArea = document.getElementById("outputText");
let displayValue = "0";
let firstValue = undefined;
let secondValue = undefined;
let operatorSelected = undefined;

operatorButtons.forEach(operatorButton => {
   operatorButton.addEventListener("click", function(e) {
      clearSelected();
      this.classList.add("selected");
      operatorSelected = this.id;
      firstValue = parseFloat(displayValue);
      displayValue="0";
   });
});

equalsButton.addEventListener("click", (e) => {
   if (!firstValue ||  !operatorSelected) {
      return;
   }
   secondValue = parseFloat(displayValue);
   displayValue = "" + operate(operatorSelected, firstValue, secondValue);
   displayArea.innerHTML = displayValue;
   clearSelected();
})

clearButton.addEventListener("click", (e) => {
   displayValue = "0";
   displayArea.innerHTML = displayValue;
   let selectedButton = document.querySelector(".selected");
   clearSelected();
})


const updateDisplayValue = function(valueToAdd) {
   if (valueToAdd === '.' && displayValue.includes('.')) {
      return;
   }

   displayValue += valueToAdd;

   if (displayValue.startsWith('0') && !displayValue.includes('.')) {
      displayValue = displayValue.slice(1);
   }

   displayArea.innerHTML = displayValue;
}


const nums = Array.from(document.querySelectorAll("div.num"));
nums.sort((a, b) => a.id.charAt(3) - b.id.charAt(3));

for (let i = 0; i <= 9; i++) {
   nums[i].addEventListener("click", (e) => {
      updateDisplayValue(i);
   });
}

nums[10].addEventListener("click", (e) => {
   updateDisplayValue('.');
});