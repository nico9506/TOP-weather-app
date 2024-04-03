import { createFooter, createInputForm, createOutputFields } from "./home";
import "./style.css";

(function generateWebPage() {
    /**
     * Load the components to create and show the HTML elements
     */

    const body = document.body;

    body.appendChild(createInputForm());
    body.appendChild(createOutputFields());
    body.appendChild(createFooter());
})();
