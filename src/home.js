import { updateWeatherOnScreen } from "./model";

// export function sayHelloWorld() {
//     /**
//      * Dummy function to print Hello world and check webpack is well configured.
//      */
//     const msg = document.createElement("h1");
//     msg.textContent = "Hello World!";

//     // console.log(getCoordinatesFromCityName("melbourne, AU"));
//     // console.log(getLocationFromCoordinates(144.9633, -37.814));
//     // console.log(getWeatherInfo(144.9633, -37.814));

//     return msg;
// }

export const createInputForm = () => {
    /**
     * @returns {HTMLElement} Container with form elements to catch user input
     * {City name}
     */

    const container = document.createElement("div");
    container.classList.add("form-container");

    const formTitle = document.createElement("h2");
    formTitle.textContent = "Look for a city";
    container.appendChild(formTitle);

    const formSubtitle = document.createElement("h4");
    formSubtitle.textContent = "{City name}, {State}, {Country code}";
    container.appendChild(formSubtitle);

    const form = document.createElement("form");

    const labelCitySearch = document.createElement("label");
    labelCitySearch.setAttribute("for", "input_city");
    labelCitySearch.textContent = "Location";
    form.appendChild(labelCitySearch);

    const inputCity = document.createElement("input");
    inputCity.type = "text";
    inputCity.id = "input_city";
    inputCity.name = "input_city";
    inputCity.placeholder = "Melbourne, AU";
    form.appendChild(inputCity);

    const btnSubmit = document.createElement("input");
    btnSubmit.type = "submit";
    btnSubmit.value = "Search";
    btnSubmit.addEventListener("click", updateWeatherOnScreen);
    form.appendChild(btnSubmit);

    container.appendChild(form);

    return container;
};

export const createOutputFields = () => {
    /**
     * @returns {HTMLElement} Container with form elements to show the weather info
     */

    const container = document.createElement("div");
    container.classList.add("weather-container");

    const city = document.createElement("h1");
    city.id = "city_title";
    container.appendChild(city);

    const currentTemperature = document.createElement("h3");
    currentTemperature.id = "current_temp";
    container.appendChild(currentTemperature);

    return container;
};
