const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");
const btn3 = document.getElementById("btn-3");
const btn4 = document.getElementById("btn-4");
const resetBtn = document.getElementById("reset-btn");
const numDisplay = document.getElementById("num-display");
//console.log(btn4)

btn1.addEventListener("click", () => {
  let value = numDisplay.value;
  value++;
  numDisplay.value = value;
});

btn2.addEventListener("click", () => {
  let value = numDisplay.value;
  if (value < 1) {
    return;
  } else {
    value--;
    numDisplay.value = value;
  }
});

btn3.addEventListener("click", () => {
  let value = +numDisplay.value;
  value += 5;
  numDisplay.value = value;
});

btn4.addEventListener("click", () => {
  let value = numDisplay.value;
  if (value < 4) {
    return;
  } else {
    value -= 5;
    numDisplay.value = value;
  }
});

resetBtn.addEventListener("click", () => {
  numDisplay.value = 0;
});
