// const zero = document.getElementById("zero");
// const one = document.getElementById("one");
// const two = document.getElementById("two");
// const three = document.getElementById("three");
// const four = document.getElementById("four");
// const five = document.getElementById("five");
// const six = document.getElementById("six");
// const seven = document.getElementById("seven");
// const eight = document.getElementById("eight");
// const nine = document.getElementById("nine");
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const percent = document.getElementById("percent");
const positiveNegative = document.getElementById("positiveNegative");
const decimal = document.getElementById("decimal");
const equal = document.getElementById("equal");
const allClear = document.getElementById("allClear");
const numBtn = document.querySelectorAll(".num");
const operator = document.querySelectorAll(".operator");
const resultPrint = document.getElementById("result");

const addition = (x, y) => {
  // console.log(`${x} + ${y}`)
  return x + y;
};

const subtraction = (x, y) => {
  // console.log(`${x} - ${y}`)
  return x - y;
};

const multiplication = (x, y) => {
  // console.log(`${x} X ${y}`)
  return x * y;
};

const division = (x, y) => {
  // console.log(`${x} / ${y}`)
  return x / y;
};

var firstNum = 0;
var secondNum = 0;

const updateView = (variable) => {
  resultPrint.textContent = variable;
};
updateView(firstNum);

var numCount = 0;

const appendNum = (text) => {
  const joiner = (num1, num2) => {
    let x = num1.toString() + num2;
    if (x.startsWith("0") && x.indexOf(".") != 1) {
      x = x.slice(1);
    }
    return x;
  };

  if (numCount == 1) {
    secondNum = joiner(secondNum, text);
    updateView(secondNum);
  } else {
    firstNum = joiner(firstNum, text);
    updateView(firstNum);
  }
};

numBtn.forEach((button) => {
  button.addEventListener("click", () => {
    appendNum(button.innerText);
    removeActiveOperatorClass();
    operatorPress = false;
  });
});

var decimalActive = false;

decimal.addEventListener("click", () => {
  if (!decimalActive) {
    appendNum(".");
    decimalActive = true;
    removeActiveOperatorClass();
    operatorPress = false;
  }
});

percent.addEventListener("click", () => {
  if (numCount == 1) {
    secondNum = (parseFloat(secondNum) / 100).toString();
    updateView(secondNum);
  } else {
    firstNum = (parseFloat(firstNum) / 100).toString();
    updateView(firstNum);
  }
});

var operatorPress = false;

const removeActiveOperatorClass = () => {
  operator.forEach((buttonInside) => {
    buttonInside.classList.remove("operatorActive");
  });
};

operator.forEach((button) => {
  button.addEventListener("click", () => {
    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);
    numCount++;
    if (operatorPress) {
      numCount--;
    }
    if (numCount > 1) {
      operate();
    }
    if (operatorPress) {
      removeActiveOperatorClass();
      button.classList.add("operatorActive");
    } else button.classList.add("operatorActive");
    operatorPress = true;
  });
});

var operatorType = 0;

// 1 for ADD
// 2 for Minus
// 3 for Multiply
// 4 for Divide

add.addEventListener("click", () => {
  operatorType = 1;
});

minus.addEventListener("click", () => {
  operatorType = 2;
});

multiply.addEventListener("click", () => {
  operatorType = 3;
});

divide.addEventListener("click", () => {
  operatorType = 4;
});

const operate = () => {
  let result = 0;
  switch (operatorType) {
    case 1:
      result = addition(firstNum, secondNum);
      break;
    case 2:
      result = subtraction(firstNum, secondNum);
      break;
    case 3:
      result = multiplication(firstNum, secondNum);
      break;
    case 4:
      result = division(firstNum, secondNum);
  }
  operatorType = 0;
  if (result.toString().includes(".")) decimalActive = true;
  updateView(result);
  numCount = 1;
  firstNum = result;
  secondNum = 0;
};

equal.addEventListener("click", () => {
  firstNum = parseFloat(firstNum);
  secondNum = parseFloat(secondNum);
  operate();
  numCount--;
});

const clear = () => {
  firstNum = 0;
  secondNum = 0;
  operatorType = 0;
  numCount = 0;
  operatorPress = false;
  updateView(firstNum);
  removeActiveOperatorClass();
};

allClear.addEventListener("click", () => {
  clear();
});
