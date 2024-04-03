import {
    getCoordinatesFromCityName,
    getLocationFromCoordinates,
    getWeatherInfo,
} from "./APIUtilities";

export const updateWeatherOnScreen = async (event) => {
    event.preventDefault();

    const search = document.getElementById("search_val");
    const city = document.getElementById("city_title");
    const temp = document.getElementById("current_temp");

    const cityCoord = await getCoordinatesFromCityName(search);

    const cityLoc = await getLocationFromCoordinates(
        cityCoord.lon,
        cityCoord.lat
    );
    city.textContent = `${cityLoc.name}, ${cityLoc.state}, ${cityLoc.country}`;

    const cityInfo = await getWeatherInfo(cityCoord.lon, cityCoord.lat);
    temp.textContent = `Current temperature ${cityInfo.main.temp} C`;

    console.log(cityInfo);
};
