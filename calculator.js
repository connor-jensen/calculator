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
const negateButton = document.getElementById("negate");
const percentButton = document.getElementById("percent");

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
let returnValue = undefined;
let operatorSelected = undefined;
let returnedValueDisplayed = false;
let previousOperation = {
   operator: undefined,
   value: undefined
}

operatorButtons.forEach(operatorButton => {
   operatorButton.addEventListener("click", function(e) {
      previousOperation.operator = undefined;
      previousOperation.value = undefined;
      clearSelected();
      this.classList.add("selected");
      operatorSelected = this.id;
      if (!returnedValueDisplayed) {
         firstValue = parseFloat(displayValue);
         displayValue="0";
      }
      else {
         displayValue="0";
      }
   });
});

equalsButton.addEventListener("click", (e) => {
   if (firstValue && previousOperation.operator && previousOperation.value) {
      returnValue = operate(previousOperation.operator, firstValue, previousOperation.value);
   }
   else if (!firstValue ||  !operatorSelected) {
      return;
   }
   else {
      secondValue = parseFloat(displayValue);
      returnValue = operate(operatorSelected, firstValue, secondValue);
      previousOperation.operator = operatorSelected;
      previousOperation.value = secondValue;
   }
   firstValue = returnValue;
   displayArea.innerHTML = returnValue;

   clearSelected();
   displayValue = "0"; // not what is shown
   returnedValueDisplayed = true;
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
   if (returnValue) {
      returnValue = undefined;
      returnedValueDisplayed = false;
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

percentButton.addEventListener("click", (e) => {
   if (returnedValueDisplayed) {
      firstValue /= 100;
      displayValue = "" + firstValue;
   }
   if (operatorSelected && firstValue) {
      secondValue = parseFloat(displayValue) / 100;
      displayValue = "" + secondValue;
   }
   else {
      firstValue = parseFloat(displayValue) / 100;
      displayValue = "" + firstValue;
   }
   displayArea.innerHTML = displayValue;
})