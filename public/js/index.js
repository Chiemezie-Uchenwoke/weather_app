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
  
      setTimeout(() => {
        title.textContent = "weather app";
      }, 2000);
  
      return;
    }
  
    fetch(`/api/weather?city=${city}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network Error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
  
        // Process the data as before
        const temp = Math.floor(data.main.temp);
        temperature.innerHTML = temp;
        tempDegree.style.visibility = "visible";
  
        const tempDescription = data.weather[0].description;
        weatherDescription.textContent = tempDescription;
  
        // Continue with the rest of the logic to update the UI...
      })
      .catch((error) => {
        console.log(error);
        title.textContent = "unable to fetch data";
  
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