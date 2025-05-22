const apiKey = "26cb90edbdde5c8ee2d0fca348ca9339";  
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const unsplashKey = "jRGxwwexu3BnDJ1wXTyF4_FLH1-wkQ38z37uvHd5dLQ"; 
const unsplashUrl = "https://api.unsplash.com/photos/random?query=";

const searchBox = document.getElementById("input");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.getElementById("weatherIcon");

document.body.style.backgroundImage = "url('images/default-bg.jpg')";



async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (response.status === 404) {
        document.getElementById("error").classList.remove("hidden");
        document.getElementById("weather").classList.add("hidden");
    } else {
        const data = await response.json();
        console.log("API Data:", data);

        document.getElementById("city").innerHTML = data.name;
        document.getElementById("temp").innerHTML = Math.round(data.main.temp - 273.15) + "°C";
        document.getElementById("humidity").innerHTML = data.main.humidity + "%";
        document.getElementById("wind").innerHTML = data.wind.speed + " km/h";

        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "images/mist.png";
                break;
            default:
                weatherIcon.src = "images/default.png";
        }

        fetch(`${unsplashUrl}${city}&client_id=${unsplashKey}&orientation=landscape`)
            .then(res => res.json())
            .then(imgData => {
                const imageUrl = imgData.urls.full;
                document.body.style.backgroundImage = `url(${imageUrl})`;
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundPosition = "center";
            })
            .catch(err => console.error("Unsplash error:", err));


        document.getElementById("weather").classList.remove("hidden");
        document.getElementById("error").classList.add("hidden");
    }
}

searchBtn.addEventListener("click", function () {
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value.trim());
    }
});
