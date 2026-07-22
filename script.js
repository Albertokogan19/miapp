async function searchWeather() {

    const city = document.getElementById("cityInput").value;

    if(city===""){
        alert("Enter a city");
        return;
    }

    try{

        const geo = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const geoData = await geo.json();

        if(!geoData.results){
            alert("City not found");
            return;
        }

        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;
        const name = geoData.results[0].name;
        const country = geoData.results[0].country;

        const weather = await fetch(

`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`

        );

        const data = await weather.json();

        document.getElementById("city").innerHTML =
            `${name}, ${country}`;

        document.getElementById("temperature").innerHTML =
            `${data.current.temperature_2m}°C`;

        document.getElementById("humidity").innerHTML =
            `${data.current.relative_humidity_2m}%`;

        document.getElementById("wind").innerHTML =
            `${data.current.wind_speed_10m} km/h`;

        document.getElementById("maxTemp").innerHTML =
            `${data.daily.temperature_2m_max[0]}°C`;

        document.getElementById("minTemp").innerHTML =
            `${data.daily.temperature_2m_min[0]}°C`;

        document.getElementById("condition").innerHTML =
            weatherDescription(data.current.weather_code);

    }

    catch(error){

        alert("Error loading weather.");

    }

}

function weatherDescription(code){

    if(code===0) return "Clear Sky ☀️";
    if(code===1) return "Mostly Clear 🌤";
    if(code===2) return "Partly Cloudy ⛅";
    if(code===3) return "Cloudy ☁️";
    if(code>=45 && code<=48) return "Fog 🌫";
    if(code>=51 && code<=67) return "Rain 🌧";
    if(code>=71 && code<=77) return "Snow ❄️";
    if(code>=80 && code<=99) return "Storm ⛈";

    return "Unknown";

}

searchWeatherDefault();

async function searchWeatherDefault(){

    document.getElementById("cityInput").value="New York";
    searchWeather();

}
