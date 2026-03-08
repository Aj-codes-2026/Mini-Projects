const btn = document.getElementById("get-weather-btn");
const cityEl = document.getElementById("option");
const errorEl = document.getElementById("error");
const locationEl = document.getElementById("location");
const countryEl = document.getElementById("country");
const weatherIcon = document.getElementById("weather-icon");
const mainTemp = document.getElementById("main-temperature");
const humidityEl = document.getElementById("humidity");
const cloudCover = document.getElementById("cloud");
const windEl = document.getElementById("wind");
const gustEl = document.getElementById("wind-gust");
const cnt1 = document.querySelector(".container1");
const cnt2 = document.querySelector(".container2");
//console.log(cnt2);

async function getWeather(stateName) {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(stateName)}&count=1`
    );
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      errorEl.style.display = "Location not found";
      throw new Error("Location not found");
    }

    const { latitude, longitude, name, country} = data.results[0];
    
    // Step 2: Get weather data with humidity, wind, gusts, etc.
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=relative_humidity_2m,wind_speed_10m,wind_gusts_10m,wind_direction_10m,temperature_2m,pressure_msl,cloud_cover&hourly=relative_humidity_2m,wind_speed_10m,wind_gusts_10m&timezone=auto`
    );
    
    const weatherData = await weatherResponse.json();
    
    return {
      location: {
        name: name,
        country: country
      },
      current: weatherData.current,
    };
  } catch (error) {
    console.log(error);
    errorEl.style.display = "block";
  }
}

async function showWeather(city) {
  console.log(city)
  if (city.value === "") {
    errorEl.style.display = "block"
    return
  }else{
     try {
    const weather = await getWeather(city);
    console.log(weather)
    
      cnt1.style.display = "none";
      cnt2.style.display = "block";

      const {temperature_2m, relative_humidity_2m, pressure_msl, wind_speed_10m, wind_gusts_10m, cloud_cover} = weather.current

      locationEl.textContent = weather.location.name
      countryEl.textContent = weather.location.country
      mainTemp.textContent = `${temperature_2m}° C`;
      humidityEl.innerHTML = `<span class="color">Humidity:</span><br />${relative_humidity_2m}%`;
      cloudCover.innerHTML = `<span class="color">Cloud Cover:</span><br />${cloud_cover}%`;
      windEl.innerHTML = `<span class="color">Winds:</span><br />${wind_speed_10m} km/h`;
      gustEl.innerHTML = `<span class="color">Gusts:</span><br />${wind_gusts_10m} km/h`;

      /*const weatherObj = {
        mainWeather: weather.interval,
        mainTemp: weather.temperature_2m,
        humidity: weather.relative_humidity_2m,
        pressure: weather.pressure_msl,
        wind: weather.wind_speed_10m,
        gust: weather.wind_gusts_10m,
      };

      locationEl.textContent = weather.name;
      countryEl.textContent = weatherObj.mainWeather;
      weatherIcon.src = weatherObj.img;
      mainTemp.textContent = `${weatherObj.mainTemp}° C`;
      weatherObj.humidity === undefined
        ? (humidityEl.innerHTML = `<span class="color">Humidity:</span><br />undefined`)
        : (humidityEl.innerHTML = `<span class="color">Humidity:</span><br />${weatherObj.humidity}%`);
      weatherObj.feeling === undefined
        ? (feels.innerHTML = `<span class="color">Feels Like:</span><br />undefined`)
        : (feels.innerHTML = `<span class="color">Feels Like:</span><br />${weatherObj.feeling}° C`);
      weatherObj.wind === undefined
        ? `<span class="color">Wind:</span><br />undefined`
        : (windEl.innerHTML = `<span class="color">Wind:</span><br />${weatherObj.wind} m/s`);
      weatherObj.gust === undefined
        ? (gustEl.innerHTML = `<span class="color">Gusts:</span><br />undefined`)
        : (gustEl.innerHTML = `<span class="color">Gusts:</span><br />${weatherObj.gust} m/s`);*/
} 

catch (error) {
    console.log(error);
  }
  }

 
}

btn.addEventListener("click", () => {
  showWeather(cityEl.value)
});
