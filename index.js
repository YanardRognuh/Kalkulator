const displayHistory = document.querySelector(".display-history");
const display = document.querySelector(".display-input");
const tempResult = document.querySelector(".temp-result");
const number = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".all-clear");
const clearLast = document.querySelector(".last-entity-clear");

let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

number.forEach((num) => {
  num.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    dis2Num += e.target.innerText;
    display.innerText = dis2Num;
  });
});

operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!dis2Num) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(dis2Num);
    }
    clearVar(operationName);
    lastOperation = operationName;
  });
});

function clearVar(name = "") {
  dis1Num += dis2Num + " " + name + " ";
  displayHistory.innerText = dis1Num;
  display.innerText = "";
  dis2Num = "";
  tempResult.innerText = result;
}

function mathOperation() {
  if (lastOperation === "X") {
    result = parseFloat(dis1Num) * parseFloat(dis2Num);
  } else if (lastOperation === "+") {
    result = parseFloat(dis1Num) + parseFloat(dis2Num);
  } else if (lastOperation === "-") {
    result = parseFloat(dis1Num) - parseFloat(dis2Num);
  } else if (lastOperation === "/") {
    result = parseFloat(dis1Num) / parseFloat(dis2Num);
  } else if (lastOperation === "%") {
    result = parseFloat(dis1Num) % parseFloat(dis2Num);
  }
}

equal.addEventListener("click", () => {
  if (!dis2Num || !dis1Num) return;
  haveDot = false;
  mathOperation();
  clearVar();
  display.innerText = result;
  tempResult.innerText = "";
  dis2Num = result;
  dis1Num = "";
});

clearAll.addEventListener("click", () => {
  displayHistory.innerText = "";
  display.innerText = "";
  dis1Num = "";
  dis2Num = "";
  result = "";
  tempResult.innerText = "";
  lastOperation = "";
});

clearLast.addEventListener("click", () => {
  display.innerText = "";
  dis2Num = "";
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButton(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("x");
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  } else if (e.key === "Backspace") {
    clickClear();
  }
});

function clickButton(key) {
  number.forEach((num) => {
    if (num.innerText === key) {
      num.click();
    }
  });
}

function clickOperation(key) {
  operations.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}

function clickEqual() {
  equal.click();
}

function clickClear() {
  clearAll.click();
}
