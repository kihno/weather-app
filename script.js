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
        div.id = prop;

        if (prop === 'temp') {
            div.classList.add('far');
            div.textContent = data;
        } else if (prop === 'city' || prop === 'condition') {
            div.textContent = data;
        } else if (prop === 'humidity') {
            div.textContent = `${prop}: ${data} %`
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
    const farSpan = document.getElementById('far');
    const celSpan = document.getElementById('cel');
    const unitElements = document.querySelectorAll('.unit');
    
    const celElements = document.querySelectorAll('.cel');


    slider.addEventListener('click', toggleUnits);
    farSpan.addEventListener('click', setUnits);
    celSpan.addEventListener('click', setUnits);

    function toggleUnits() {
        const farElements = document.querySelectorAll('.far');

        if (slider.checked) {
            farSpan.classList.remove('current');
            celSpan.classList.add('current');

            farElements.forEach(el => {
                console.log(el);
                el.classList.add('cel');
            });

            convertTemp(farElements);

        } else {
            celSpan.classList.remove('current');
            farSpan.classList.add('current');

            farElements.forEach(el => {
                console.log(el);
                el.classList.remove('cel');
            });

            convertTemp(farElements);
        }
    }

    function setUnits(e) {
        if(e.target.classList.contains('current')) {
            return;
        } else {
            unitElements.forEach(el => {
                el.classList.remove('current');
            });

            if (e.target === farSpan) {
                slider.checked = false;
            } else {
                slider.checked = true;
            }

            e.target.classList.add('current')
        }
    }

    function convertTemp(farElements) {

        farElements.forEach(el => {
            let temp = el.textContent.replace(/\D/g, '');
            let newTemp;

            if (el.classList.contains('cel')) {
                temp = el.textContent.replace(/\D/g, '');
                newTemp = (temp - 32) * .5556;
                el.textContent = Math.round(newTemp);
            } else {
                temp = el.textContent.replace(/\D/g, '');
                newTemp = (temp * 1.8) + 32;
                el.textContent = Math.round(newTemp);
            }
        });

    }

    window.onload = getWeather('los angeles');
})();