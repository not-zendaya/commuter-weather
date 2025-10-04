import React, {useState, useEffect} from "react";

const WeatherCard =({city}) =>{
     const [weather, setWeather] = useState(null);
     const [error, setError] = useState("");
     const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

     useEffect(() =>{
        const fetchWeather = async () =>{
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
                if(!response.ok) throw new Error ("City not found");
                const data = await response.json();
                setWeather(data);
                 setError("");
            } catch (err){
                setError(err.message);
            }
        };
        if (city) fetchWeather();
    },[city, apiKey]);

    if(error) return <p className="text-red-500">{error}</p>;
    if(!weather) return <p>Loading weather for city....</p>;

    return(
        <div className="bg-white rounded-2xl shadow-md w-full max-w-sm text-center">
            <h2 className="text-xl font-bold mb-2">{weather.name}</h2>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt={weather.weather[0].description} 
            className="mx-auto"
            />
            <p className="text-xl font-semibold mb-1">{Math.round(weather.main.temp)}°C</p>
            <p className="capitalize text-gray-600 ">{weather.weather[0].description}</p>
            <p className="mt-2">💧 {weather.main.humidity}% | 🌬️ {weather.wind.speed} km/h </p>
        </div>
    );
};

export default WeatherCard;