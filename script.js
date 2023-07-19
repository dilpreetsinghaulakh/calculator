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
  return x + y;
};

const subtraction = (x, y) => {
  return x - y;
};

const multiplication = (x, y) => {
  return x * y;
};

const division = (x, y) => {
  return x / y;
};

var firstNum = 0;
var secondNum = 0;

const updateView = (variable) => {
  resultPrint.textContent = variable;
};
updateView(firstNum);

var numCount = 0;

const append = (text) => {
  const joiner = (num) => {
    let x = num.toString() + text;
    if (x.startsWith("0") && x.indexOf(".") != 1) {
      x = x.slice(1);
    } else if (
      x.startsWith("-") &&
      x.indexOf("0") == 1 &&
      x.indexOf(".") != 2
    ) {
      x = x.replace("0", "");
    }
    return x;
  };

  const stopJoin = (numb) => {
    if (
      (!negativeActive && !decimalActive && numb.toString().length < 9) ||
      (negativeActive && !decimalActive && numb.toString().length < 10) ||
      (!negativeActive && decimalActive && numb.toString().length < 10) ||
      (negativeActive && decimalActive && numb.toString().length < 11)
    ) {
      numb = joiner(numb);
    }
    return numb;
  };

  if (numCount == 1) {
    secondNum = stopJoin(secondNum);
    updateView(secondNum);
  } else {
    firstNum = stopJoin(firstNum);
    updateView(firstNum);
  }
};

numBtn.forEach((button) => {
  button.addEventListener("click", () => {
    append(button.innerText);
    removeActiveOperatorClass();
    operatorPress = false;
  });
});

var decimalActive = false;

decimal.addEventListener("click", () => {
  if (!decimalActive) {
    append(".");
    decimalActive = true;
    removeActiveOperatorClass();
    operatorPress = false;
  }
});

var negativeActive = false;

positiveNegative.addEventListener("click", () => {
  if (!negativeActive) {
    if (numCount == 1) {
      secondNum = "-" + secondNum;
      updateView(secondNum);
    } else {
      firstNum = "-" + firstNum;
      updateView(firstNum);
    }
    negativeActive = true;
  } else {
    if (numCount == 1) {
      secondNum = secondNum.slice(1);
      updateView(secondNum);
    } else {
      firstNum = firstNum.toString().slice(1);
      updateView(firstNum);
    }
    negativeActive = false;
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
    negativeActive = false;
    decimalActive = false;
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
  if (result.toString().includes(".")) {
    function roundToDecimal(number, decimalPlaces) {
      const factor = 10 ** decimalPlaces;
      return Math.round(number * factor) / factor;
    }
    decimalActive = true;
    if (result < 0)
      result = roundToDecimal(result, 10 - result.toString().indexOf("."));
    else result = roundToDecimal(result, 9 - result.toString().indexOf("."));
  }
  if (result.toString().startsWith("-")) negativeActive = true;
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
  decimalActive = false;
  negativeActive = false;
  updateView(firstNum);
  removeActiveOperatorClass();
};

allClear.addEventListener("click", () => {
  clear();
});
