const apiKey = "169274ec6cfbfc5a09b58ff1c601d412";
const userInputCity = document.getElementById("city");
const title = document.getElementById("title");
const locationIcon = document.getElementById("location-icon");
const userCity = document.getElementById("showcity");
const temperature = document.getElementById("temp");
const weatherImage = document.getElementById("weather-image");
const weatherDescription = document.getElementById("description");
const currentDate = document.getElementById("current-date");
const submitButton = document.getElementById("submit");
const tempDegree = document.getElementById("temp-degree");

// Hide temperature degree
tempDegree.style.visibility = "hidden";

// function to display date
const displayDate = () => {
    const now = new Date().toString().slice(0, 15);
    currentDate.textContent = now;
    // console.log(now);
}

// function to show user city and display location icon
const showLocation = () => {
    const userCityEntry = userInputCity.value;
    userCity.textContent = userCityEntry;

    // set src for location
    locationIcon.setAttribute("src", "./images/pin.png");
    // set Alt text for location icon
    locationIcon.setAttribute("alt", "location icon");
}

// Function to fetch weather temperature using weather API
const fetchWeather = () => {
    const city = userInputCity.value.trim();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

     // Validate input
     if (!city) {
        title.textContent = "Please enter a city name";

        // Hide message after 2 seconds
        setTimeout(() => {
            title.textContent = "weather app";
        }, 2000);

        return;
        
    }

    fetch(url)
        .then((response) => {
            if (!response.ok){
                // title.textContent = "Network Error";
                throw new Error("Network Error");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);

            // show temperature
            const temp = Math.floor(data.main.temp);
            temperature.innerHTML = temp;
            tempDegree.style.visibility = "visible";

            // show description
            const tempDescription = data.weather[0].description;
            weatherDescription.textContent = tempDescription;

            // Show weather image
            const currentHour = new Date().getHours();
            const isNightTime = currentHour >= 18 || currentHour < 6; //check for night time
            // console.log(isNightTime);

            const weatherImages = ["./images/clouds.png", "./images/cloudy.png", "./images/heavy-rain.png", "./images/rainy-day.png", "./images/sun.png", "./images/cloudy-night.png", "./images/snow.png"];

            if (tempDescription.includes("clouds")){
                if(temp < 0){
                    weatherImage.setAttribute("src", weatherImages[6]);
                }
                else if(temp >= 27){
                    weatherImage.setAttribute("src", weatherImages[4]);
                }
                else{
                    weatherImage.setAttribute("src", weatherImages[0]);
                } 
            }
            
            else if (tempDescription.includes("clear sky")){
                // clear sky: check for night time
                if (isNightTime){
                    if(temp < 0){
                        weatherImage.setAttribute("src", weatherImages[6]);
                    }
                    else{
                        weatherImage.setAttribute("src", weatherImages[5]);
                    }
                }
                // clear sky: sunny - day time
                else{
                    if(temp < 0){
                        weatherImage.setAttribute("src", weatherImages[6]);
                    }
                    else{
                        weatherImage.setAttribute("src", weatherImages[4]);
                    } 
                }
            }

            else if (tempDescription.includes("rain") || tempDescription.includes("drizzle")){
                weatherImage.setAttribute("src", weatherImages[3]);
            }

            else if (tempDescription.includes("thunderstorm")){
                weatherImage.setAttribute("src", weatherImages[2]);
            }

            else {
                weatherImage.setAttribute("src", weatherImages[1]);
            }

        })
        .catch((error) => {
            console.log(error);

            title.textContent = "unable to fetch data";

            // Hide message after 2 seconds
            setTimeout(() => {
                title.textContent = "weather app";
            }, 2000);
        });
}

// Submit button
submitButton.addEventListener("click", () => {
    displayDate();

    showLocation();

    fetchWeather();

    // userInputCity.value = "";
});