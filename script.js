const weather = (() => {

    const input = document.querySelector('input');
    const button = document.querySelector('button');

    button.addEventListener('click', getWeather);

    async function getWeather() {
        let city = input.value;
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=256f2fb92e7b31de1dd3240fad6d6f0e', {mode: 'cors'});
        const weatherData = await response.json();

        console.log(weatherData);

    }

})();