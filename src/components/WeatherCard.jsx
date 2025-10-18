import React, {useState, useEffect} from "react";
import { useUnit } from "../context/UnitContext";

const WeatherCard =({city}) =>{
     const [weather, setWeather] = useState(null);
     const [error, setError] = useState("");
     const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
     const { unit } = useUnit();

     useEffect(() =>{
        const fetchWeather = async () =>{
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`);
                if(!response.ok) throw new Error ("City not found");
                const data = await response.json();
                setWeather(data);
                 setError("");
            } catch (err){
                setError(err.message);
            }
        };
        if (city) fetchWeather();
    },[city, apiKey, unit]);

    if(error) 
        return(
        <div 
        className="bg-slate-800/60 text-red-400 p-6  sm:p-8 rounded-2xl shadow-md text-center border border-slate-700/40 max-w-sm mx-auto">
            <p>{error}</p>
        </div>
        );
    if(!weather) 
        return(
        <div 
        className="bg-slate-800/60 text-slate-300 p-6 sm:p-8 rounded-2xl shadow-md text-center border border-slate-700/40 w-full max-w-sm mx-auto animate-pulse">
            <p className="text-base sm:text-lg font-medium">Loading weather for city....</p>
        </div>
        );
    
    const temperatureUnit = unit === "metric" ? "°C" : "°F";
    
    return(
        <div 
        className="bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-sm mx-auto text-center text-white border border-slate-700/40 p-5 sm:p-8 transition-transform duration-300 hover:scale-[1.03] dark:hover:shadow-sky-700/20 hover:shadow-cyan-500">
            <h2 
            className="text-xl sm:text-2xl font-semibold mb-3 text-sky-300">{weather.name}</h2>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt={weather.weather[0].description} 
            className="mx-auto w-20 sm:w-24 h-20 sm:h-24 mb-2"
            />
            <p 
            className="text-3xl sm:text-4xl font-bold mb-1 text-sky-100">{Math.round(weather.main.temp)}{temperatureUnit}</p>
            <p 
            className="capitalize text-slate-300 text-base sm:text-lg mb-3">{weather.weather[0].description}</p>
            <div className="grid grid-cols-2 justify-center gap-4 sm:gap-6 text-sm sm:text-md text-slate-400 mt-3">
               <p>💧 {weather.main.humidity}% </p>
               <p>🌬️ {weather.wind.speed} km/h</p> 
            </div>    
        </div>
    );
};

export default WeatherCard;