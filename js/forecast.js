const API_KEY = "WodAE1t9d2LyvY8RuajZIOhMCoRV1Xm5";

async function getCity(cityName) {
    const BASE =
        "http://dataservice.accuweather.com/locations/v1/cities/search";
    const QUERY = `?apikey=${API_KEY}&q=${cityName}`;
    const RESPONSE = await fetch(BASE + QUERY);
    const DATA = await RESPONSE.json();

    return DATA[0];
}

async function getWeather(locationKey) {
    const BASE = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`;
    const QUERY = `?apikey=${API_KEY}`;
    const RESPONSE = await fetch(BASE + QUERY);
    const DATA = await RESPONSE.json();

    return DATA[0];
}

// getCity("Mahabad")
//     .then((cityData) => {
//         const CITY_KEY = cityData.Key;
//         return getWeather(CITY_KEY);
//     })
//     .then((weatherData) => {
//         console.log(weatherData);
//     })
//     .catch((error) => {
//         console.log(error);
//     });
