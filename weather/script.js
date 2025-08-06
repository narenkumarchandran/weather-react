const weatherform=document.querySelector('.search');    
const apikey="606d126bf9dd5fd9e54b997475214ea3";
const cityInput=document.querySelector('input');
const card = document.querySelector('.cards');
const sidebar =document.querySelector('.sidebar');
const timechange=document.querySelector('.greeting');

navigator.geolocation.getCurrentPosition(async (pos) => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
    getcurweather(lat,lon);
})


weatherform.addEventListener("submit", async event=>{

    event.preventDefault();
    const city=cityInput.value;
    if(cityInput){
        try{
            const weatherdata= await getweatherdata(city);
            displaycurdata(weatherdata);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("please enter a city name")
    }

})

async function getcurweather(lat,lon){
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
    const Response=await fetch( url);
    const data=await Response.json();
    displaycurdata(data);

}

async function getweatherdata(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const Response=await fetch( url);
    const data=await Response.json();
    return data;

}
function displaycurdata(data) {
    const cityname = data.name;
    const curstatus = data.weather[0].description;
    const temp = data.main.temp;
    const feelsLike = data.main.feels_like;
    const tempMax = data.main.temp_max;
    const pressure = data.main.pressure;
    const humidity = data.main.humidity;
    const speed=data.wind.speed;
    const unixTime = data.dt;
    const date = new Date(unixTime * 1000);
    const localtime=date.toLocaleString(); 
    const country=data.sys.country;
    const sunriseunix=data.sys.sunrise;
    const sunrise=new Date(sunriseunix * 1000);
    const sunsetunix=data.sys.sunset;
    const sunset=new Date(sunsetunix * 1000);
    const weatherMain = data.weather[0].main; 
    timechange.innerHTML=`
            <div class="greeting">Welcome back, Naren!<br><small>Here’s weather informations recorded on ${localtime} .</small></div>
    
    `;
        card.style.display = "grid";
    card.style.gridTemplateColumns = "repeat(auto-fit, minmax(160px, 1fr))";
    card.style.gap = "20px";
    card.innerHTML = `
        <div class="cards">
            <div class="card">Humidity<br><span id="humidity">${humidity}%</span></div>
            <div class="card">Feels Like<br><span id="feels-like">${(feelsLike - 273.15).toFixed(1)}°C</span></div>
            <div class="card">Wind<br><span id="wind">${speed}km/h</span></div>
            <div class="card">Pressure<br><span id="pressure">${pressure}</span></div>
            <div class="card">Max Temperature<br><span id="maxtemp">${(tempMax - 273.15).toFixed(1)}°C</span></div>
        </div>
    `;
    if (weatherMain === 'Sunny') {
        sidebar.style.backgroundImage = "url('image/sunny.jpg')";
    } else if (weatherMain === 'Clouds') {
        sidebar.style.backgroundImage = "url('image/clouds.jpg')";
    } else if (weatherMain === 'Rain') {
        sidebar.style.backgroundImage = "url('image/rainy.jpg')";
    } else {
         sidebar.style.background = "blue";
    }
    sidebar.innerHTML=`
            <h2 id="location">${cityname}, ${country}</h2>
            <div class="temp">
            <h1 id="current-temp">${(temp - 273.15).toFixed(1)}°C</h1>
            <p id="weather-desc">${curstatus}</p>
            </div>
            <div class="sun-time">
            <p>🌅 <span id="sunrise">${sunrise}</span></p>
            <p>🌇 <span id="sunset">${sunset}</span></p>
            </div>
    `;

    
}

function displayError(message){
    console.log(message);
}