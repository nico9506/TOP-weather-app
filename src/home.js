import {
    getCoordinatesFromCityName,
    getLocationFromCoordinates,
    getWeatherInfo,
} from "./APIUtilities";

export function sayHelloWorld() {
    /**
     * Dummy function to print Hello world and check webpack is well configured.
     */
    const msg = document.createElement("h1");
    msg.textContent = "Hello World!";

    // console.log(getCoordinatesFromCityName("melbourne, AU"));
    // console.log(getLocationFromCoordinates(144.9633, -37.814));
    console.log(getWeatherInfo(144.9633, -37.814));

    return msg;
}
