import '../src/stylesheet.css';
import Logo from '../images/tempcheck-white.png';
import {weather} from '../src/weather';
import {slider} from '../src/slider.js';

const logo = document.getElementById('logoImg');

function loadImages() {
    logo.src = Logo;
}

loadImages();
window.onload = weather.getWeather('los angeles');