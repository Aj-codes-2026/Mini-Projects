const changeBtn = document.getElementById("change-btn");
const copyBtn = document.getElementById("copy-btn");
const text = document.getElementById("text");
const bodyEl = document.body;
//console.log(rndBtn)

let currentClr = "#ffffff"

const clrGen = () => {
  const chars = "abcdef0123456789";
  let color = "";
  for (let i = 0; i < 6; i++) {
    const random = Math.floor(Math.random() * chars.length);
    color += chars.substring(random, random + 1);
  }
  return color;
};

const updateClr = () => {
  const newClr = clrGen();
  bodyEl.style.backgroundColor = `#${newClr}`;
  text.innerText = `Color: #${newClr}`;
  currentClr = newClr
};

changeBtn.addEventListener("click", updateClr);

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(currentClr).then(() => {
    const originalText = copyBtn.textContent
    copyBtn.textContent = "Copied!"
    copyBtn.style.backgroundColor = "#4CAF50"
    
    setTimeout(() => {
      copyBtn.textContent = originalText
      copyBtn.style.backgroundColor = ""
    }, 1500)
  })
  .catch(err => {
    console.log.error("Failed to copy: ", err)
    alert("Failed to copy color code to clipboard")
  })
});

document.addEventListener("DOMContentLoaded", updateClr)