const input = document.getElementById("input");
const count = document.getElementById("count");
const remaining = document.getElementById("remaining");
const MAX_CHARS = 200;

const updateCounter = () => {
  let currentLength = input.value.length;

  if (currentLength > MAX_CHARS) {
    input.value = input.value.substring(0, MAX_CHARS);
    currentLength = MAX_CHARS;
  }

  let remainingChars = MAX_CHARS - currentLength;

  count.textContent = `Count: ${currentLength}`;
  remaining.textContent = `Remaining: ${remainingChars}`;

  if (remainingChars === 0) {
    input.style.border = "2px solid red";
    count.textContent = `Count: ${currentLength} (Max reached)`;
  } else if (remainingChars <= 20) {
    input.style.border = "2px solid orange"; // Warning color
  } else {
    input.style.border = "2px solid green";
  }
};

input.addEventListener("input", updateCounter);

document.addEventListener("DOMContentLoaded", updateCounter);
