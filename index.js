// Formatting time to 12-hour format with AM/PM
function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 hour to 12
    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${hours}:${minutes} ${ampm}`;
}

function formatDay(date) {
    const dayArray = date.getDay();
    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    return days[dayArray];
}

// Getting current time & day and displaying it
const currentTime = document.querySelector("#current-time");
let newCurrentTime = new Date();
currentTime.innerHTML = formatTime(newCurrentTime);

const currentDay = document.querySelector("#current-day");
let newCurrentDay = new Date();
currentDay.innerHTML = formatDay(newCurrentDay);

// Display weather info
function displayWeatherInfo(response) {
    document.querySelector("#searched-city").innerHTML = response.data.name;
    const temperature = Math.round(response.data.main.temp);
    document.querySelector("#current-temperature").innerHTML = `${temperature}°C`;
    document.querySelector("#weather-type").innerHTML = response.data.weather[0].main;

    const humidity = response.data.main.humidity;
    document.querySelector("#humidity").innerHTML = `${humidity}%`;

    const windSpeed = Math.round(response.data.wind.speed);
    document.querySelector("#wind").innerHTML = `${windSpeed} km/h`;

    const rain = response.data.rain ? response.data.rain["1h"] || response.data.rain["3h"] || 0 : 0;
    document.querySelector("#rain").innerHTML = `${rain} mm`;

    const clouds = response.data.clouds.all;
    document.querySelector("#clouds").innerHTML = `${clouds}%`;
    
    const feelsLike = Math.round(response.data.main.feels_like);
    document.querySelector("#feel").innerHTML = `${feelsLike}°`;

    const sunrise = new Date(response.data.sys.sunrise * 1000);
    const sunset = new Date(response.data.sys.sunset * 1000);
    const sunnyHours = ((sunset - sunrise) / 3600000).toFixed(2);
    document.querySelector("#sunny").innerHTML = `${sunnyHours} hours`;
}

// Search city and fetch weather data
function searchCity(city) {
    const apiKey = "2b5fc755ac2ec59250868b5527df31c4";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherInfo);
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-input").value;
    searchCity(city);
}

const searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", handleSubmit);
