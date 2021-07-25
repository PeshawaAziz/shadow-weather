const CITY_FORM = document.querySelector(".city-search-form");

const INFO_CARD = document.querySelector(".info-card");
const INFO = document.querySelector(".info");

CITY_FORM.addEventListener("submit", (event) => {
    event.preventDefault();

    const CITY_NAME = CITY_FORM.city.value.trim();
    CITY_FORM.reset();

    if (CITY_NAME == "") {
        CITY_FORM.city.classList.add("border-danger");
    } else if (CITY_NAME != "") {
        CITY_FORM.city.classList.remove("border-danger");
        updateCity(CITY_NAME)
            .then((data) => updateUI(data))
            .catch((error) => console.log(error));
    }
});

function updateUI(data) {
    const CITY_INFO = data.cityInfo;
    const WEATHER_INFO = data.weatherInfo;

    INFO.innerHTML = `
    <h5 class="my-3">${CITY_INFO.EnglishName}</h5>
    <div class="my-3">${WEATHER_INFO.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${WEATHER_INFO.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    INFO_CARD.classList.remove("d-none");
}

async function updateCity(cityName) {
    const CITY_INFO = await getCity(cityName);
    const WEATHER_INFO = await getWeather(CITY_INFO.Key);

    return {
        cityInfo: CITY_INFO,
        weatherInfo: WEATHER_INFO,
    };
}
