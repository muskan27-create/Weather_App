const apiKey = "a8429fc557ddb2e077d88383117ea145";

async function getWeather() {
  const city = document.getElementById("city").value;


  if (!city) {
    alert("Please enter a city name");
    return;
  }
  document.getElementById("welcome").style.display = "none";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      document.getElementById("weatherResult").innerHTML = "❌ City not found";
      return;
    }

    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const condition = data.weather[0].main;

    const forecastUrl =
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

const forecastResponse = await fetch(forecastUrl);

const forecastData = await forecastResponse.json();

    if (condition.includes("Clear")) {
  document.body.style.backgroundImage =
    "url('https://images.unsplash.com/photo-1700610879201-2b7f1cd17dd1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
}

else if (condition.includes("Cloud")) {
  document.body.style.backgroundImage =
    "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda')";
}

else if (condition.includes("Rain")) {
  document.body.style.backgroundImage =
    "url('https://images.pexels.com/photos/12194160/pexels-photo-12194160.jpeg')";
}

else if (condition.includes("Snow")) {
  document.body.style.backgroundImage =
    "url('https://images.unsplash.com/photo-1516715094483-75da7dee9758?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
}

else if (
  condition.includes("Mist") ||
  condition.includes("Fog") ||
  condition.includes("Haze")
) {
  document.body.style.backgroundImage =
    "url('https://images.unsplash.com/photo-1487621167305-5d248087c724')";
}

else if (condition.includes("Thunderstorm")) {
  document.body.style.backgroundImage =
    "url('https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28')";
}

else {
  document.body.style.backgroundImage =
    "url('https://images.unsplash.com/photo-1601134467661-3d775b999c8b?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
}

    let icon = "☀️";
    if (condition.includes("Rain")) icon = "🌧️";
    else if (condition.includes("Cloud")) icon = "☁️";

    document.getElementById("weatherResult").innerHTML = `
    
  <h2>${city}</h2>

  <div class="weather-icon">
    ${icon}
  </div>

  <div class="temp">
    ${temp}°C
  </div>

  <div class="details">
    <p>${condition}</p>
    <p>💧 Humidity: ${humidity}%</p>
  </div>
`;
let forecastHTML = "";

for (let i = 0; i < 40; i += 8){

  const item = forecastData.list[i];

  const date = new Date(item.dt_txt);

  const day = date.toLocaleDateString("en-US", {
    weekday: "short"
  });

  const highTemp = Math.round(item.main.temp_max);

  const lowTemp = Math.round(item.main.temp_min);

  const weather = item.weather[0].main;

  let icon = "☀️";

  if (weather.includes("Rain")) icon = "🌧️";
  else if (weather.includes("Cloud")) icon = "☁️";
  else if (weather.includes("Snow")) icon = "❄️";

  forecastHTML += `

    <div class="forecast-card">

      <h3>${day}</h3>

      <div style="font-size:35px;">
        ${icon}
      </div>

      <div class="forecast-temps">

        <span class="high-temp">
          ${highTemp}°
        </span>

        <span class="low-temp">
          ${lowTemp}°
        </span>

      </div>

      <p class="forecast-weather">
        ${weather}
      </p>

    </div>
  `;
}

document.getElementById("forecast").innerHTML =
  forecastHTML;

document.getElementById("forecast").innerHTML =
  forecastHTML;

  } catch (error) {
    console.error(error);
    document.getElementById("weatherResult").innerHTML = "⚠️ Error fetching data";
  }
}

function getLocationWeather() {

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(async function(position) {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const url =
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {

        const response = await fetch(url);
        const data = await response.json();

        const city = data.name;
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const condition = data.weather[0].main;

        let icon = "☀️";

        if (condition.includes("Rain")) icon = "🌧️";
        else if (condition.includes("Cloud")) icon = "☁️";
        else if (condition.includes("Snow")) icon = "❄️";
        else if (
          condition.includes("Mist") ||
          condition.includes("Fog") ||
          condition.includes("Haze")
        ) icon = "🌫️";

        document.getElementById("weatherResult").innerHTML = `
          <h2>${city}</h2>

          <div class="weather-icon">
            ${icon}
          </div>

          <div class="temp">
            ${temp}°C
          </div>

          <div class="details">
            <p>${condition}</p>
            <p>💧 Humidity: ${humidity}%</p>
          </div>
        `;

      } catch (error) {
        console.log(error);
      }

    });

  } else {
    alert("Geolocation not supported");
  }
}