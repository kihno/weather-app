const weather = (() => {

    const input = document.querySelector('input');
    const button = document.querySelector('button');
    const main = document.getElementById('main');

    button.addEventListener('click', getWeather);

    let weatherData = {};

    async function getWeather(location) {
        let city = location || input.value;
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=256f2fb92e7b31de1dd3240fad6d6f0e', {mode: 'cors'});
        data = await response.json();
        console.log(data);

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
        div.classList.add(prop);

        if (prop === 'temp') {
            div.classList.add('far');
            div.textContent = data;
        } else if (prop === 'city' || prop === 'condition') {
            div.textContent = data;
        } else if (prop === 'humidity') {
            div.textContent = `${data} %`
        } else {
            div.classList.add('far');
            div.textContent = `${prop}: ${data}`;
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

    const slider = document.getElementById('slider');
    slider.addEventListener('click', toggleUnits);

    function toggleUnits() {

    }

    window.onload = getWeather('los angeles');
})();