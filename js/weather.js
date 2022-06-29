const API_KEY = "9c1d96b3333018baead32fb5fa20ca37";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log("You live in", lat, lon);

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");

      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
      city.innerText = data.name;
      console.log(data.name, data.weather[0].main);
    });
}

function onGeoError() {
  alert("Can't find");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
