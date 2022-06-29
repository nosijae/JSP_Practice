# Geolocation

화면에 날씨를 보여줄 것이다.

우리는 navigator와 geolocation, getCurrentPosition을 활용할 수 있다.
이렇게 하면 브라우저에서 알아서 위치를찾아준다.

```javascript
function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  console.log("You live in", lat, lng);
}

function onGeoError() {
  alert("Can't find");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
```

위 코드를 통해 사용자 위치를 알 수 있다.

# WEATHER API

날씨를 받아오기 위해 api 등록
https://openweathermap.org/

getCurrentPosition을 통해 얻은 위치 정보를 기반으로 api 요청을 하여 날씨 정보를 얻으면 된다.

```javascript
const API_KEY = "9c1d96b3333018baead32fb5fa20ca37";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log("You live in", lat, lon);

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  console.log(url);
}

function onGeoError() {
  alert("Can't find");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
```

## fetch

fetch를 사용하여 자바스크립트가 대신 url을 부르게 한다.
fetch를 통해 받아온 json 파일에서 이치 이름과 온도를 받아올 수 있다.
그런데 미국 서비스라 화씨 온도를 받아오기 때문에 이를 바꿔줘야 한다.

이때 설정값이 units=metric이다.
이렇게 하면 온도를 섭씨로 해달라고 url 요청을 해주는 것이다.

```javascript
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
```

이런식으로 요청 url을 바꿔주는 것이다.

fetch는 promise이다.
바로 실행되는 것이 아니라 서버에 응답이 왔을때 응답을 해주는 함수이다
따라서, then을 통해 값을 받아 온 후 이를 표시해줘야 한다.

이렇게 받아온 응답값을 json파일로 바꿔주고 이를 표시해주면 된ㄷ ㅏ.

```javascript
function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log("You live in", lat, lon);

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.name, data.weather[0].main);
    });
}
```

이렇게 하면 사용자 위치에 맞는 지역 이름과 온도를 가져올 수 있게 된다.

```javascript
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
```

# 코스 마무리

css를 이용하여 더 이쁘게 만들 수 있다.
