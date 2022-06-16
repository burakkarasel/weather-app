const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector("span.msg");
const list = document.querySelector(".ajax-section .cities");

form.addEventListener("submit", (e) => {
    getWeatherDataFromApi();
    e.preventDefault();
});

const getWeatherDataFromApi = async () => {
    const API_KEY = DecryptStringAES(localStorage.getItem("apiKey"));
    const inputVal = input.value;
    const unitType = "metric";
    const lang = "en";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${API_KEY}&units=${unitType}&lang=${lang}`;

    try {
        const response = await axios(URL);
        const {name, main, sys, weather} = response.data;
        const iconURL = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

        //prevent repetition
        let resume = true;
        const liItemsHeader = list.querySelectorAll("li span");

        if(liItemsHeader.length){
            liItemsHeader.forEach(item => {
                if(item.innerText == name){
                    resume = false;
                };
            });
        };

        if(resume){
            const newLi = document.createElement("li");
            newLi.classList.add("city");
            const newLiInnerHTML = `
            <h2 class="city-name" data-name="${name}, ${sys.country}">
                <span>${name}</span>
                <sup>${sys.country}</sup>
            </h2>
            <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
            <figure>
                <img class="city-icon" src="${iconURL}">
                <figcaption>${weather[0].description}</figcaption>
            </figure>
            `;
            newLi.innerHTML = newLiInnerHTML;
            list.prepend(newLi);
        }
    } catch (error) {
        
    }
    form.reset();
};