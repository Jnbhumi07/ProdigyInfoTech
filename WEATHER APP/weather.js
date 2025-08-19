const apiKey = '1061a9810a80c721d4e5c110bff7fb94'; // 🔑 Tumhari API key

// Function for city-based weather
function getWeatherByCity() {
  const city = document.getElementById('cityInput').value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`City not found`);
      return response.json();
    })
    .then(data => displayWeather(data))
    .catch(error => {
      document.getElementById('weatherInfo').innerHTML =
        `<p style="color:red;">${error.message}</p>`;
    });
}

// Function for location-based weather
function getWeatherByLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(success => {
    const lat = success.coords.latitude;
    const lon = success.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error("Could not fetch weather");
        return response.json();
      })
      .then(data => displayWeather(data))
      .catch(error => {
        document.getElementById('weatherInfo').innerHTML =
          `<p style="color:red;">${error.message}</p>`;
      });
  }, () => {
    alert("Unable to get your location");
  });
}

// Function to display weather
function displayWeather(data) {
  const weatherInfo = document.getElementById('weatherInfo');
  const { name, main, weather, wind } = data;

  weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <p>🌤 <strong>${weather[0].main}</strong> - ${weather[0].description}</p>
    <p>🌡 Temperature: ${main.temp}°C</p>
    <p>💧 Humidity: ${main.humidity}%</p>
    <p>💨 Wind Speed: ${wind.speed} m/s</p>
  `;
  weatherInfo.classList.add('show');
}