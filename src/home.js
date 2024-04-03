import { updateWeatherOnScreen } from "./model";
import githubIcon from "./assets/github.svg";

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

export const createFooter = () => {
    /**
     * Creates the footer element and returns the HTML element
     */
    const GITHUB_USER = "nico9506";
    const GITHUB_REPO_URL = "https://github.com/nico9506/TOP-weather-app";

    const footer = document.createElement("footer");

    // DIV to keep together the GitHub logo and the username
    const githubLink = document.createElement("a");
    githubLink.classList.add("github-contact-info");
    githubLink.href = GITHUB_REPO_URL;
    githubLink.target = "_blank";

    const logo = new Image();
    logo.src = githubIcon;
    logo.classList.add("footer-logo");
    githubLink.appendChild(logo);

    const githubUser = document.createElement("h1");
    githubUser.classList.add("github-user");
    githubUser.id = "githubUser";
    githubUser.textContent = GITHUB_USER;
    githubLink.appendChild(githubUser);

    footer.appendChild(githubLink);

    return footer;
};
