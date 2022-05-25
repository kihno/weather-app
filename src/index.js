import css from '../src/stylesheet.css';
import Logo from '../images/tempcheck-white.png';
import {weather} from '../src/weather';
import {slider} from '../src/slider.js';

window.onload = weather.getWeather('los angeles');