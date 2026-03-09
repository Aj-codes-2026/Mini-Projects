const btn = document.getElementById("get-weather-btn");
const backBtn = document.getElementById("back-btn");
const citySelect = document.getElementById("option");
const errorEl = document.getElementById("error");
const loadingEl = document.getElementById("loading");
const locationEl = document.getElementById("location");
const countryEl = document.getElementById("country");
const weatherIcon = document.getElementById("weather-icon");
const mainTemp = document.getElementById("main-temperature");
const feelsLikeEl = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const cloudCover = document.getElementById("cloud");
const windEl = document.getElementById("wind");
const gustEl = document.getElementById("wind-gust");
const pressureEl = document.getElementById("pressure");
const cnt1 = document.querySelector(".container1");
const cnt2 = document.querySelector(".container2");

const getWeatherIcon = (cloudCover, isDay) => {
  if (cloudCover <= 10)
    return isDay ? "sun_774669.png" : "half-moon_3731904.png";
  if (cloudCover <= 30)
    return isDay ? "partly_6218498.png" : "cloud_198205.png";
  if (cloudCover <= 70)
    return isDay ? "partly_6218498.png" : "cloudy_17907932.png";
  if (cloudCover <= 90) return "cloud_198205.png";
  return "raining_5370507.png";
};

const showLoading = (show) => {
  loadingEl.style.display = show ? "block" : "none";
};

const showError = (message) => {
  errorEl.textContent = `⚠️ ${message}`;
  errorEl.style.display = "block";
  setTimeout(() => {
    errorEl.style.display = "none";
  }, 3000);
};

const hideError = () => {
  errorEl.style.display = "none";
};

async function getWeatherData(cityName) {
  try {
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`,
    );
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("Location not found");
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,cloud_cover,wind_speed_10m,wind_gusts_10m,is_day&timezone=auto`,
    );

    const weatherData = await weatherResponse.json();

    return {
      location: {
        name: name,
        country: country,
      },
      current: weatherData.current,
    };
  } catch (error) {
    console.error("Weather API Error:", error);
    throw error;
  }
}

async function showWeather(cityName) {
  if (!cityName || cityName === "") {
    showError("Please select a city");
    return;
  }

  showLoading(true);
  hideError();

  try {
    const weather = await getWeatherData(cityName);
    console.log("Weather data:", weather);

    cnt1.style.display = "none";
    cnt2.style.display = "block";

    const current = weather.current;
    const isDay = current.is_day === 1;

    locationEl.textContent = weather.location.name;
    countryEl.textContent = weather.location.country;
    mainTemp.textContent = `${Math.round(current.temperature_2m)}°C`;
    feelsLikeEl.textContent = `Feels like ${Math.round(current.apparent_temperature)}°C`;

    humidityEl.textContent = `${current.relative_humidity_2m}%`;
    cloudCover.textContent = `${current.cloud_cover}%`;
    windEl.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
    gustEl.textContent = `${Math.round(current.wind_gusts_10m)} km/h`;
    pressureEl.textContent = `${Math.round(current.pressure_msl)} hPa`;

    const icon = getWeatherIcon(current.cloud_cover, isDay);
    weatherIcon.src = icon;

    showLoading(false);
  } catch (error) {
    showLoading(false);
    showError("Failed to fetch weather data. Please try again.");
    console.error("Error:", error);
  }
}

btn.addEventListener("click", () => {
  showWeather(citySelect.value);
});

backBtn.addEventListener("click", () => {
  cnt2.style.display = "none";
  cnt1.style.display = "block";
  citySelect.value = "";
});

document.addEventListener("DOMContentLoaded", () => {
  cnt1.style.display = "block";
  cnt2.style.display = "none";
  hideError();
  showLoading(false);
});
