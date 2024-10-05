function displaySalahTime(response) {
  console.log(response);

  let currentDateElement = document.querySelector("#date");
  let currentDate = response.data.data.date.readable;
  currentDateElement.innerHTML = currentDate;
  let currentDayElement = document.querySelector("#day");
  let currentDay = response.data.data.date.gregorian.weekday.en;
  currentDayElement.innerHTML = `(${currentDay})`;
  let hijriDateElement = document.querySelector("#hijri-date");
  let hijriDay = response.data.data.date.hijri.day;
  let hijriMonth = response.data.data.date.hijri.month.en;
  let hijriYear = response.data.data.date.hijri.year;
  hijriDateElement.innerHTML = ` | ${hijriDay} ${hijriMonth} ${hijriYear}`;
  let fajrTime = response.data.data.timings.Fajr;
  let fajrElement = document.querySelector("#fajr");
  fajrElement.innerHTML = fajrTime;
  let sunriseTime = response.data.data.timings.Sunrise;
  sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = sunriseTime;
  let dhuhrTime = response.data.data.timings.Dhuhr;
  let dhuhrElement = document.querySelector("#dhuhr");
  dhuhrElement.innerHTML = dhuhrTime;
  let asrTime = response.data.data.timings.Asr;
  let asrElement = document.querySelector("#asr");
  asrElement.innerHTML = asrTime;
  let maghribTime = response.data.data.timings.Maghrib;
  let maghribElement = document.querySelector("#maghrib");
  maghribElement.innerHTML = maghribTime;
  let ishaTime = response.data.data.timings.Isha;
  let ishaElement = document.querySelector("#isha");
  ishaElement.innerHTML = ishaTime;
  let midnightTime = response.data.data.timings.Midnight;
  let midnightElement = document.querySelector("#midnight");
  midnightElement.innerHTML = midnightTime;
  let lastThirdTime = response.data.data.timings.Lastthird;
  let lastThirdElement = document.querySelector("#last-third");
  lastThirdElement.innerHTML = lastThirdTime;
}

function formatDate() {
  let now = new Date();
  let month = now.getMonth();
  month = month + 1;
  let day = now.getDate();
  if (day < 10) {
    day == `0${day}`;
  }
  let fullYear = now.getFullYear();
  let date = `${day}-${month}-${fullYear}`;
  return date;
}

function getSalahTiming(latitude, longitude) {
  let apiUrl = `https://api.aladhan.com/v1/timings/${formatDate()}?latitude=${latitude}&longitude=${longitude}&method=3&midnightMode=1`;
  axios.get(apiUrl).then(displaySalahTime);
}

function storePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(position);
  getSalahTiming(latitude, longitude);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(storePosition);
  let defaultCity = document.querySelector("#default-city");
  defaultCity.innerHTML = "Current City";
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocation);

getSalahTiming(-37.78333, 175.28333);
