const weather = (() => {

    const input = document.querySelector('input');
    const button = document.querySelector('button');
    const main = document.getElementById('main');

    button.addEventListener('click', getWeather);

    let weatherData = [];

    async function getWeather() {
        let city = input.value;
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=256f2fb92e7b31de1dd3240fad6d6f0e', {mode: 'cors'});
        data = await response.json();
        console.log(data);

        weatherData.push(data.name, Math.round(data.main.temp), data.weather[0].main, Math.round(data.main.temp_min), Math.round(data.main.temp_max), Math.round(data.main.humidity));
        renderWeather();
    }

    function createDiv(data, prop) {
        let div = document.createElement('div');

        if (prop === 'temp') {
            div.textContent = `${data}\u00b0 F`;
        } else if (prop === 'name' || prop === 'weather') {
            div.textContent = data;
        } else {
            div.textContent = `${prop}: ${data}`;
        }

        main.appendChild(div);
    }

    function renderWeather() {
        createDiv(weatherData[0], 'name');
        createDiv(weatherData[1], 'temp');
        createDiv(weatherData[2], 'weather');
        createDiv(weatherData[3], 'Low');
        createDiv(weatherData[4], 'High');
        createDiv(weatherData[5], 'Humidity');
    }

})();