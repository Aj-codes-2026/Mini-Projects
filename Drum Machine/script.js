const display = document.getElementById("display");
const audioEls = document.querySelectorAll(".clip");

//console.log(audioEls)

const playSound = (buttonEl) => {
  const audioEl = buttonEl.querySelector("audio");
  const btnId = buttonEl.id;
  if (audioEl) {
    audioEl.play();
  }
  display.textContent = btnId.toUpperCase();

  if (audioEl.id === "Q") {
    buttonEl.style.backgroundColor = "crimson";
    buttonEl.style.color = "white";
    buttonEl.style.border = "2px solid black";
  } else if (audioEl.id === "W") {
    buttonEl.style.backgroundColor = "blue";
    buttonEl.style.color = "white";
    buttonEl.style.border = "2px solid black";
  } else if (audioEl.id === "E") {
    buttonEl.style.backgroundColor = "#3d402f";
    buttonEl.style.color = "white";
    buttonEl.style.border = "2px solid black";
  } else if (audioEl.id === "A") {
    buttonEl.style.backgroundColor = "green";
    buttonEl.style.color = "white";
    buttonEl.style.border = "2px solid black";
  } else if (audioEl.id === "S") {
    buttonEl.style.backgroundColor = "brown";
    buttonEl.style.color = "white";
    buttonEl.style.border = "2px solid black";
  } else if (audioEl.id === "D") {
    buttonEl.style.backgroundColor = "indigo";
    buttonEl.style.color = "white";
    buttonEl.style.border = "2px solid black";
  } else if (audioEl.id === "Z") {
    buttonEl.style.backgroundColor = "violet";
    buttonEl.style.color = "white";
    buttonEl.style.border = "2px solid black";
  } else if (audioEl.id === "X") {
    buttonEl.style.backgroundColor = "#7aa6b3";
    buttonEl.style.color = "white";
    buttonEl.style.border = "2px solid black";
  } else if (audioEl.id === "C") {
    buttonEl.style.backgroundColor = "orange";
    buttonEl.style.color = "white";
    buttonEl.style.border = "2px solid black";
  }

  changeColor(buttonEl);
};

const changeColor = (buttonEl) => {
  setTimeout(() => {
    buttonEl.style.backgroundColor = "rgb(240, 240, 240)";
    buttonEl.style.color = "black";
  }, 500);
};

document.addEventListener("keydown", function (e) {
  audioEls.forEach((audio) => {
    if (e.key === audio.id.toLowerCase()) {
      audio.play();
      display.textContent = audio.parentElement.id.toUpperCase();
    } else {
      return;
    }
  });
});
