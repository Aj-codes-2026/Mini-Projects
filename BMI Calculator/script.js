const weight = document.getElementById("weight-input")
const height = document.getElementById("height-input")
const calculateBtn = document.getElementById("calculate")
const result = document.getElementById("result")
const statusEl = document.getElementById("status")
const form = document.getElementById("bmi-form")
//console.log(form)

const calculateBmi = () => {
    let w = weight.value
    let h = height.value
    
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
        result.textContent = "--"
        statusEl.textContent = "Please enter valid numbers"
        statusEl.style.color = "red"
        return
    }

    if(w > 500 || h > 3){
        result.textContent = "--"
        statusEl.textContent = "Values out of range"
        statusEl.style.color = "red"
    }
    
    const bmi = w / (h * h)
    result.textContent = bmi.toFixed(1)
    statusEl.style.fontSize = "16px"
    if(bmi < 18.5){
        statusEl.textContent = "Underweight"
        statusEl.style.color = "orange"
    }else if(bmi >= 18.5 && bmi < 24.9){
        statusEl.textContent = "Normal weight"
        statusEl.style.color = "green"
    }else if(bmi >= 25 && bmi <= 29.9){
        statusEl.textContent = "Overweight"
        statusEl.style.color = "yellow"
    }else{
        statusEl.textContent = "Obese"
        statusEl.style.color = "red"
    }
}

calculateBtn.addEventListener("click", (e) => {
    e.preventDefault()
    calculateBmi()
})

form.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        e.preventDefault()
        calculateBtn()
    }
})

document.addEventListener('DOMContentLoaded', () => {
    result.textContent = "--"
    statusEl.textContent = ""
})