import {slider} from './slider.js';
import Clear from '../images/clear-day.svg';
import Clouds from '../images/clouds.svg';
import Drizzle from '../images/drizzle.svg';
import Rain from '../images/rain.svg';
import Thunderstorm from '../images/thunderstorm.svg';
import Snow from '../images/snow.svg';
import Fog from '../images/fog.svg';
import Tornado from '../images/tornado.svg';

export const weather = (() => {

    const input = document.querySelector('input');
    const button = document.querySelector('button');
    const main = document.getElementById('main');

    button.addEventListener('click', getWeather);

    let weatherData = {};

    async function getWeather(location) {
        let city = input.value || location;
        
        try {
            let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=256f2fb92e7b31de1dd3240fad6d6f0e', {mode: 'cors'});
            let data = await response.json();

            
            weatherData.city = data.name;
            weatherData.temp = Math.round(data.main.temp);
            weatherData.condition = data.weather[0].main;
            weatherData.low = Math.round(data.main.temp_min);
            weatherData.high = Math.round(data.main.temp_max)
            weatherData.humidity = Math.round(data.main.humidity);
            console.log(weatherData);
            clear();
            renderWeather();
        } catch(error) {
            clear();
            renderError();
        }
    }

    function createDiv(data, prop) {
        let div = document.createElement('div');
        div.id = prop;

        if (prop === 'temp' || prop === 'low' || prop === 'high') {
            div.classList.add('far');
            div.textContent = data;
        } else if (prop === 'condition') {
            div.appendChild(appendIcon(data));
            console.log(appendIcon(data));
            let subDiv = document.createElement('div');
            subDiv.textContent = data;
            div.appendChild(subDiv);
        } else {
            div.textContent = data;
        }

        main.appendChild(div);
    }

    function clear() {
        input.value = '';

        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
    }

    function appendIcon(data) {
        const icon = new Image();

        if (data === 'Clear') {
            icon.src = Clear;
            return icon;
        } else if (data === 'Clouds') {
            icon.src = Clouds;
            return icon;
        } else if (data === 'Rain') {
            icon.src = Rain;
            return icon;
        } else if (data === 'Drizzle') {
            icon.src = Drizzle;
            return icon;
        } else if (data === 'Snow') {
            icon.src = Snow;
            return icon;
        } else if (data === 'Thunderstrom') {
            icon.src = Thunderstorm;
            return icon;
        } else if (data === 'Tornado') {
            icon.src = Tornado;
            return icon;
        } else {
            icon.src = Fog;
            return icon;
        }
    }

    function renderWeather() {
        for (let prop in weatherData) {
            let value = weatherData[prop];
            createDiv(value, prop);
        }
    }

    function renderError() {
        const img = document.createElement('img');

        async function generateVoid() {
            let url = 'https://api.giphy.com/v1/gifs/translate?api_key=slDqQ2cL7ZADYT3tCrAM7VBef2YfRFvY&s=void';
            const response = await fetch(url, {mode: 'cors'});
            const image = await response.json();
            img.src = image.data.images.original.url;
            img.id = 'void';
        }

        generateVoid();
        main.appendChild(img);

        let div = document.createElement('div');
        div.id = 'error';
        div.textContent = "You have left the bounds of space and time. Please enter a valid city name.";
        main.appendChild(div);
    }

    return {getWeather}
})();