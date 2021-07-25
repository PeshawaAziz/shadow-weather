const CITY_FORM = document.querySelector(".city-search-form");
const INFO_CARD = document.querySelector(".info-card");
const INFO = document.querySelector(".info");
const TIME_IMG = document.querySelector(".time");
const ICON = document.querySelector(".icon");
const SPINNER_HTML =
    '<div class="d-flex justify-content-center my-5"><i class="spinner-border border-5 text-warning"></i></div >';

CITY_FORM.addEventListener("submit", (event) => {
    event.preventDefault();

    const CITY_NAME = CITY_FORM.city.value.trim();
    CITY_FORM.reset();

    if (CITY_NAME == "") {
        CITY_FORM.city.classList.add("border-danger");
    } else if (CITY_NAME != "") {
        INFO_CARD.classList.remove("d-none");
        INFO_CARD.innerHTML = SPINNER_HTML;
        CITY_FORM.city.classList.remove("border-danger");
        updateCity(CITY_NAME)
            .then((data) => updateUI(data))
            .catch((error) => console.log(error));
    }
});

function updateUI(data) {
    const CITY_INFO = data.cityInfo;
    const WEATHER_INFO = data.weatherInfo;
    const DAY_NIGHT = WEATHER_INFO.IsDayTime ? "day" : "night";
    const ICON_NUM = WEATHER_INFO.WeatherIcon;

    INFO_CARD.innerHTML = `
    <img
        class="time card-img-top rounded-3"
        src="time/${DAY_NIGHT}.png"
        alt="${DAY_NIGHT}"
    />
    <div class="info text-uppercase text-center">
        <h5 class="my-3">${CITY_INFO.EnglishName}</h5>
        <div class="icon text-center">
            <img src="icons/${ICON_NUM}.svg" />
        </div>
        <div class="my-3">${WEATHER_INFO.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${WEATHER_INFO.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    </div>
    `;
}

async function updateCity(cityName) {
    const CITY_INFO = await getCity(cityName);
    const WEATHER_INFO = await getWeather(CITY_INFO.Key);

    return {
        cityInfo: CITY_INFO,
        weatherInfo: WEATHER_INFO,
    };
}
