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
  
    if (!city) {
        title.textContent = "Please enter a city name";

        // Hide message after 2 seconds
        setTimeout(() => {
            title.textContent = "weather app";
        }, 2000);
  
      return;
    }

    /* 
    Creating the API Route (Backend):
        In your Next.js or Vercel Serverless Functions project, you define API routes in the 
        pages/api directory. This directory is used to create serverless functions that your frontend can call.

        For example, you create a file named weather.js inside the pages/api folder:
        /pages/api/weather.js
    
    */

    /* 
        API route is automatically available under /api/weather in your application.

            When a request is made to this route with a city as a query parameter (e.g., /api/weather?city=London), the handler function is executed, which fetches weather data from the OpenWeather API and sends it back as a response.

    */
  
    fetch(`/api/weather?city=${city}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network Error");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
  
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

        const weatherImages = ["./images/clouds.png", "./images/cloudy.png", "./images/heavy-rain.png", "./images/rainy-day.png", "./images/sun.png", "./images/cloudy-night.png", "./images/snow.png", "./images/snowy.png"];

        if (tempDescription.includes("clouds")){
            if(temp < 0){
                weatherImage.setAttribute("src", weatherImages[6]);
            }
            else if(temp >= 25 && temp <=26){
                weatherImage.setAttribute("src", weatherImages[1]);
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
                else if (temp >=1 && temp <=15){
                    weatherImage.setAttribute("src", weatherImages[7]);
                }
                else if (temp >=16 && temp <= 22){
                    weatherImage.setAttribute("src", weatherImages[0]);
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
            weatherImage.setAttribute("src", weatherImages[0]);
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