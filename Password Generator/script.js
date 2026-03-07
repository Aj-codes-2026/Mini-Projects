const lengths = document.getElementById("length")
const rangeVal = document.getElementById("range-value")
const passwordEl = document.getElementById("password")
const uppInp = document.getElementById("uppercase")
const lowInp = document.getElementById("lowercase")
const numInp = document.getElementById("numbers")
const symInp = document.getElementById("symbols")
const strengthText = document.getElementById("strength")
const btn = document.getElementById("generate-btn")
const copy = document.getElementById("copy")
console.log(copy)

const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
const uppercaseChars = lowercaseChars.toUpperCase()
const numbersChars = "1234567890"
const symbolsChars = "-/<>*+"

const generatePasswordLength = () => {
let passwordOptions = ""
    if(lowInp.checked){
        passwordOptions += lowercaseChars
    }
    if(uppInp.checked){
        passwordOptions += uppercaseChars
    }
    if(numInp.checked){
        passwordOptions += numbersChars
    }
    if(symInp.checked){
        passwordOptions += symbolsChars
    }
    return passwordOptions 
}

const generatePassword = () => {
const chars = generatePasswordLength()
  let password = "";
  for (let i = 0; i < +lengths.value; i++) {
    const random = Math.floor(Math.random() * chars.length);
    password += chars.substring(random, random + 1);
  }
  passwordEl.textContent = password ;
  if(+lengths.value > 13){
    strengthText.textContent = "Password strength: Strong"
  }else if(+lengths.value > 11 && +lengths.value < 14){
strengthText.textContent = "Password strength: Good"
  }else if(+lengths.value > 9 && +lengths.value < 12){
strengthText.textContent = "Password strength: OK"
  }else{
strengthText.textContent = "Password strength: Weak"
  }
}



btn.addEventListener("click", () => {
      const checked = document.querySelector('input[name="check"]:checked');
    if(!checked){
    alert("Pleased check a category")
    return
  }
  generatePassword()
})


lengths.addEventListener("input", function(){
    rangeVal.textContent = this.value
})

copy.addEventListener("click", () => {
  if(passwordEl.innerText === ""){
    return
  }
  navigator.clipboard.writeText(passwordEl.innerText)
  .then(() => {
    const original = copy.textContent
    copy.textContent = "Copied!"
    copy.style.backgroundColor = "#4dfd65"

    setTimeout(() => {
      copy.textContent = original
      copy.style.backgroundColor = "#B0F5B9"
    }, 1500)
  })
  .catch(err => {
    console.error("Failed to copy: ", err)
    alert("Failed to copy to clipboard  ")
  })
})
