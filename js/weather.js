const weatherContainer = document.querySelector(".weather");

const API_KEY = "d6530d89e9d6d481dd08eddbe224a821";
const COORDS = "coords";

function getWeather(latitude, longitude) {
  fetch(
    // 자꾸 이상한 곳으로 잡히니 고정 위도 경도로 사용..할라는데 깃헙에선 잘..되는..것..같은데....
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temp = json.main.temp;
      const place = json.name;
      weatherContainer.innerText = `${temp}˚C @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const { latitude, longitude} = position.coords;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoErr() {
  console.log("Err");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoErr);
}

// 고정 위도경도라 무쓸모
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    // getWeather(35.8714354, 128.601445);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
