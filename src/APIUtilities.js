const getLocationData = async (location, units = "metric") => {
    /**
     * API Key from nico9506 user, Openweathermap
     * string 'location' --> {city name},{state code},{country code}
     * string 'units' --> standard, metric and imperial
     * Documentation: https://openweathermap.org/current#one
     */
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=243eecaa621a7c5bbe4b86f7bc268e9e&units=${units}`
    );
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(response.status);
    }
};

export const getCoordinatesFromCityName = async (loc) => {
    const data = await getLocationData(loc);
    const lon = data.coord.lon;
    const lat = data.coord.lat;
    // console.log(data);
    // console.log(lon, lat);
    return { lon, lat };
};

const searchCity = async (lon, lat) => {
    /**
     * API Key from nico9506 user, Openweathermap
     * 'lat' --> latitude
     * 'lon' --> longitude
     * Documentation: https://openweathermap.org/api/geocoding-api
     *
     * Change the 'location' HTML for a string compound by the city and country names.
     */

    const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=243eecaa621a7c5bbe4b86f7bc268e9e`
    );
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(response.status);
    }
};

export const getLocationFromCoordinates = async (lon, lat) => {
    const data = await searchCity(lon, lat);
    const name = data[0].name;
    const state = data[0].state;
    const country = data[0].country;
    // console.log(data);
    return { name, state, country };
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

/**
 * For testing purposes only
 */

// printWeather = () => {
//     console.log(appElements.getCityName(), appElements.getTemperature());
// };

//First call to display info. Should be change to user current location
// APIUtilities().updateWeather("Melbourne, AU");
// lon: -80.6081, lat: 28.0836
