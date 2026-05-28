import "../src/stylesheets/global.css";
import "./styles/landing.css";
import logo from "./assets/img/logo.svg?raw";

document.querySelectorAll(".landing-logo").forEach((logoContainer) => {
  logoContainer.innerHTML = logo;
});

import "../dist/landing-challenge/landing-challenge.esm.js";
