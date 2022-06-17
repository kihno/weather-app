import '../src/stylesheet.css';
import Logo from '../images/tempcheck-white.png';
import {weather} from '../src/weather';
import {slider} from '../src/slider.js';

const logo = document.getElementById('logo');
logo.src = Logo;

window.onload = weather.getWeather('los angeles');