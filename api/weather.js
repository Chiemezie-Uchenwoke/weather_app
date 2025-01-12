export default async function handler(req, res) {
    const { city } = req.query;
    const API_KEY = process.env.API_KEY;  // Set this in your Vercel Environment Variables
  
    // If city parameter is missing, return an error
    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }
  
    try {
         // Make a request to the OpenWeather API
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        return res.status(500).json({ error: "Error fetching weather data" });
      }
  
      const data = await response.json(); // Parse the weather data
      res.status(200).json(data); // Send the weather data back to the frontend
    } catch (error) {
      res.status(500).json({ error: "Network Error" });
    }
  }
  
