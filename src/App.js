
import './App.css';
import  {useState} from 'react';
import axios from 'axios';


function App() {
  const [data, setData] =useState({})
  const [location, setLocation] =useState('')
  const [error, setError] =useState('')
  

  const searchLocation = () =>{
    if (!location) return; // Prevent API call if location is empty
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c1c432295e2fd2bb237c524b59a1ac2b`;
    axios
      .get(url)
      .then((response) => {
        setData(response.data); // Set the weather data
        console.log(response.data);
        setLocation("");
        setError("");

    })

  
  .catch((error) => {
    if (error.respone && error.respone.status === 404){
      setError("Please enter a valid city name ");
      alert("Please enter a valid city name ");
    }
    else{
      console.error("Error fetching weather data:", error);
        alert("Error fetching weather data");
    } 
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchLocation();
    }
  };
  const formatDate = (timestamp, timezone) => {
    const localTime = new Date((timestamp + timezone) * 1000); // Adjust for timezone
    return localTime.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  
    return (
    <div className="App">
     
      <div className="container">
        <h1>Your Weather</h1>
        <div className="search">
          
            <input 
            type="text" value = {location}
             placeholder="Enter City Name"
             onChange={(event) => setLocation(event.target.value)} // Update location input
            onKeyPress={handleKeyPress}
             />
            </div>
          <div className = "button">
          <button onClick = {searchLocation} type="button">
            Search
          </button>
          </div>
        <div className="location">
          {data.weather && <h1>{data.name}</h1>}
        </div>

        <div className="date">
          {data.dt && data.timezone !== undefined && (
            <h2>{formatDate(data.dt, data.timezone)}</h2>
          )}

        <div className="description">
         {data.weather && <h2>{data.weather[0].description}</h2> }
          
        </div>
        <div className="temperature">
          {data.main && (
            <>
            <div className = "max-min">
            <div className = "max">
              <h1>Max: {Math.round(data.main.temp_max - 273.15)}°C</h1>
              </div>
              <div className = "min">
              <h1>Min: {Math.round(data.main.temp_min - 273.15)}°C</h1>
              </div>
              </div>
            </>
          )}
        </div>

        
          
        </div>
        <div className = "weather-info">
          
        <div className="wind-speed">
          {data.wind && <h2>Wind Speed: {data.wind.speed} m/s</h2> }
        </div>
        <div className="humidity">
          {data.main && <h2>Humidity: {data.main.humidity}%</h2>}
        </div>
        </div>
        <div className="feels-like">
          {data.main && (
             <h1>Feels like: {Math.round(data.main.feels_like - 273.15)}°C</h1> )}
        </div>
        
        
      </div>
    </div>
  
  
  );
}

export default App;



