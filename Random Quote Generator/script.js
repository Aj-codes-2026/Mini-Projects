const quoteEl = document.getElementById("quote-text");
const authorEl = document.getElementById("quote-author");
const changeBtn = document.getElementById("new-quote");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");

const showLoading = (show) => {
  loadingEl.style.display = show ? "block" : "none";
};

const showError = (message) => {
  errorEl.textContent = message;
  errorEl.style.display = "block";
  setTimeout(() => {
    errorEl.style.display = "none";
  }, 3000);
};

const hideError = (show) => {
  errorEl.style.display = show ? "block" : "none";
};

async function updateQuote() {
  showLoading(true);
  hideError(false);

  try {
    const response = await fetch(`https://api.quotable.io/random`);
    const data = await response.json();
    authorEl.innerHTML = `<span>Author: </span>${data.author}`;
    quoteEl.innerHTML = `<span>Quote: </span>${data.content}`;
    showLoading(false);
  } catch (error) {
    showLoading(false);
    console.log("Error fetching quote: ", error);
    hideError(true);
    authorEl.textContent = "Anonymous";
    quoteEl.textContent =
      "Life is what happens when you're busy making other plans.";
  }
}

changeBtn.addEventListener("click", updateQuote);

document.addEventListener("DOMContentLoaded", updateQuote);
