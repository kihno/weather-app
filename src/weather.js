import {slider} from './slider.js';

export const weather = (() => {

    const input = document.querySelector('input');
    const button = document.querySelector('button');
    const main = document.getElementById('main');

    button.addEventListener('click', getWeather);

    let weatherData = {};

    async function getWeather(location) {
        let city = input.value;
        let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=256f2fb92e7b31de1dd3240fad6d6f0e', {mode: 'cors'});
        let data = await response.json();

        weatherData.city = data.name;
        weatherData.temp = Math.round(data.main.temp);
        weatherData.condition = data.weather[0].main;
        weatherData.low = Math.round(data.main.temp_min);
        weatherData.high = Math.round(data.main.temp_max)
        weatherData.humidity = Math.round(data.main.humidity);
  
        clear();
        renderWeather();
    }

    function createDiv(data, prop) {
        let div = document.createElement('div');
        div.id = prop;

        if (prop === 'temp' || prop === 'low' || prop === 'high') {
            div.classList.add('far');
            div.textContent = data;
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

    function renderWeather() {
        for (let prop in weatherData) {
            let value = weatherData[prop];
            createDiv(value, prop);
        }
    }

    return {getWeather}
    // window.onload = getWeather('los angeles');
})();