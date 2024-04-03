const API_KEY = "243eecaa621a7c5bbe4b86f7bc268e9e";

const searchLocationData = async (location) => {
    /**
     * API Key from nico9506 user, Openweathermap
     *
     * @param {location} 'location' --> {city name},{state code},{country code}
     *
     * Documentation: https://openweathermap.org/current#one
     *
     * q 	(required) 	City name, state code (only for the US) and country code divided by comma. Please use ISO 3166 country codes.
     *
     * appid 	(required) 	Your unique API key (you can always find it on your account page under the "API key" tab)
     * limit 	(optional) 	Number of the locations in the API response (up to 5 results can be returned in the API response)
     *
     * @returns {Promise} object with the city coordinates
     */

    const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API_KEY}`,
        { mode: "cors" }
    );
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(response.status);
    }
};

export const getCoordinatesFromCityName = async (loc) => {
    /**
     * Get coordinates values from a city name
     *
     * @param {string} loc {city name}, {state}, {country code}
     *
     * Documentation: https://openweathermap.org/api/geocoding-api
     *
     * @returns {Object} object with the city coordinates
     */

    const data = await searchLocationData(loc);
    const lon = data[0].lon;
    const lat = data[0].lat;
    // console.log(data);
    // console.log(lon, lat);
    return { lon: lon, lat: lat };
};

const searchCity = async (lon, lat) => {
    /**
     * Search a city info from its coordinates.
     *
     * API Key from nico9506 user, Openweathermap
     *
     * @param {number} lon longitude value
     * @param {number} lat latitude value
     *
     * Documentation: https://openweathermap.org/api/geocoding-api
     *
     * @returns {Promise} object with the city info
     */

    const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`,
        { mode: "cors" }
    );
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(response.status);
    }
};

export const getLocationFromCoordinates = async (lon, lat) => {
    /**
     * Get a city info from its coordinates.
     *
     * API Key from nico9506 user, Openweathermap
     *
     * @param {number} lon longitude value
     * @param {number} lat latitude value
     *
     * Documentation: https://openweathermap.org/api/geocoding-api
     *
     * @returns {Object} object with the city info {name, state, country}
     */

    const data = await searchCity(lon, lat);
    const name = data[0].name;
    const state = data[0].state;
    const country = data[0].country;
    // console.log(data);
    return { name, state, country };
};

const requestWeatherInfo = async (lon, lat, units = "metric") => {
    /**
     * Request weather information from a city coordinates
     *
     * API Key from nico9506 user, Openweathermap
     *
     * @param {number} lon longitude value
     * @param {number} lat latitude value
     *
     * Documentation: https://openweathermap.org/api/geocoding-api
     *
     * lat 	(required) 	Latitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API
     * lon 	(required) 	Longitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API
     * appid 	(required) 	Your unique API key (you can always find it on your account page under the "API key" tab)
     * mode 	(optional) 	Response format. Possible values are xml and html. If you don't use the mode parameter format is JSON by default. Learn more
     * units 	(optional) 	Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default.
     * lang 	(optional) 	You can use this parameter to get the output in your language. Learn more
     *
     * @returns {Promise} object with the city weather info
     */

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`,
        { mode: "cors" }
    );

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(response.status);
    }
};

export const getWeatherInfo = async (lon, lat, units = "metric") => {
    /**
     * Get a city weather info from its coordinates.
     *
     * API Key from nico9506 user, Openweathermap
     *
     * @param {number} lon longitude value
     * @param {number} lat latitude value
     *
     * Documentation: https://openweathermap.org/api/geocoding-api
     *
     * @returns {Object} object with the city weather info {}
     */

    const data = await requestWeatherInfo(lon, lat, units);
    // console.log(data);
    return data;
};

const unixToDate = (unixTimestamp) => {
    /**
     * Converts an UNIX timestamp to a readable date format
     */
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds
    const date = new Date(unixTimestamp * 1000);

    // Hours part from the timestamp
    const hours = date.getHours();

    // Minutes part from the timestamp
    const minutes = "0" + date.getMinutes();

    // Seconds part from the timestamp
    const seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    const formattedTime =
        hours + ":" + minutes.slice(-2) + ":" + seconds.slice(-2);

    return formattedTime;
};

const degreesToDirection = (degrees) => {
    /**
     * Converts degrees (meteorological) to wind direction
     * Returns a String
     */
    if (degrees >= 345 && degrees <= 360 && degrees < 15) return "N";
    if (degrees >= 15 && degrees < 35) return "N/NE";
    if (degrees >= 35 && degrees < 55) return "NE";
    if (degrees >= 55 && degrees < 75) return "E/NE";
    if (degrees >= 75 && degrees < 105) return "E";
    if (degrees >= 105 && degrees < 125) return "E/SE";
    if (degrees >= 125 && degrees < 145) return "SE";
    if (degrees >= 145 && degrees < 165) return "S/SE";
    if (degrees >= 165 && degrees < 195) return "S";
    if (degrees >= 195 && degrees < 215) return "S/SW";
    if (degrees >= 215 && degrees < 235) return "SW";
    if (degrees >= 235 && degrees < 255) return "W/SW";
    if (degrees >= 255 && degrees < 285) return "W";
    if (degrees >= 285 && degrees < 305) return "W/NW";
    if (degrees >= 305 && degrees < 325) return "NW";
    if (degrees >= 325 && degrees < 345) return "N/NW";

    return "";
};
