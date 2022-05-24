export const slider = (() =>{
    const slider = document.getElementById('slider');
    const farSpan = document.getElementById('far');
    const celSpan = document.getElementById('cel');
    const unitElements = document.querySelectorAll('.unit');


    slider.addEventListener('click', toggleUnits);
    farSpan.addEventListener('click', setUnits);
    celSpan.addEventListener('click', setUnits);

    function toggleUnits() {
        const farElements = document.querySelectorAll('.far');

        if (slider.checked) {
            farSpan.classList.remove('current');
            celSpan.classList.add('current');

            farElements.forEach(el => {
                el.classList.add('cel');
            });

            convertTemp(farElements);

        } else {
            celSpan.classList.remove('current');
            farSpan.classList.add('current');

            farElements.forEach(el => {
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

            e.target.classList.add('current');
            toggleUnits();        }
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
})();