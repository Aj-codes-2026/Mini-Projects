const hour = document.querySelector(".hours");
const minute = document.querySelector(".minutes");
const second = document.querySelector(".seconds");
const day = document.getElementById("day");
const period = document.getElementById("period");
const month = document.getElementById("month");
const dateNum = document.getElementById("date");
const year = document.getElementById("year");
const tod = document.getElementById("am-pm");
//console.log(dateNum)

const updateTime = () => {
  const date = new Date();
  let getHour = date.getHours();
  let getMin = date.getMinutes();
  let getSec = date.getSeconds();
  let getYear = date.getFullYear();
  let getMonth = date.toLocaleString("default", { month: "long" });
  let getDay = date.toLocaleString("en-US", { weekday: "long" });
  let getDate = date.getDate();

  if (getHour === 0) {
    getHour = 0;
    tod.innerText = "AM";
  } else if (getHour === 12) {
    tod.innerText = "PM";
  } else if (getHour > 12) {
    getHour = getHour - 12;
    tod.innerText = "PM";
  } else {
    tod.innerText = "AM";
  }

  getHour = getHour < 10 ? "0" + getHour : getHour;
  getMin = getMin < 10 ? "0" + getMin : getMin;
  getSec = getSec < 10 ? "0" + getSec : getSec;

  day.innerText = getDay;

  hour.innerText = getHour;
  minute.innerText = getMin;
  second.innerText = getSec;

  month.innerText = getMonth;
  year.innerText = getYear;
  dateNum.innerText = getDate;

  setTimeout(() => {
    updateTime();
  }, 1000);
};

updateTime();
