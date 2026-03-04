const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");
const btn3 = document.getElementById("btn-3");
const btn4 = document.getElementById("btn-4");
const resetBtn = document.getElementById("reset-btn");
const numDisplay = document.getElementById("num-display");

class Counter {
  constructor() {
    this.value = +numDisplay.value;
  }

  increaseByOne() {
    this.value++;
    numDisplay.value = this.value;
  }

  decreaseByOne() {
    if (this.value < 1) {
      return;
    } else {
      this.value--;
      numDisplay.value = this.value;
    }
  }

  increaseByFive() {
    this.value += 5;
    numDisplay.value = this.value;
  }

  decreaseByFive() {
    if (this.value < 4) {
      return;
    } else {
      this.value -= 5;
      numDisplay.value = this.value;
    }
  }
}

btn1.addEventListener("click", () => {
  const count = new Counter();
  count.increaseByOne();
});

btn2.addEventListener("click", () => {
  const count = new Counter();
  count.decreaseByOne();
});

btn3.addEventListener("click", () => {
  const count = new Counter();
  count.increaseByFive();
});

btn4.addEventListener("click", () => {
  const count = new Counter();
  count.decreaseByFive();
});

resetBtn.addEventListener("click", () => {
  numDisplay.value = 0;
});
