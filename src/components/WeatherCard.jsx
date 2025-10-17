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

    if(error) 
        return(
        <div 
        className="bg-slate-800/60 text-red-400 p-6 rounded-2xl shadow-md text-center border border-slate-700/40">
            <p>{error}</p>
        </div>
        );
    if(!weather) 
        return(
        <div 
        className="bg-slate-800/60 text-slate-300 p-6 rounded-2xl shadow-md text-center border border-slate-700/40">
            <p>Loading weather for city....</p>
        </div>
        );
    
    return(
        <div 
        className="bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-sm text-center text-white border border-slate-700/40 p-6 transition-transform duration-200 hover:scale-[1.02] dark:hover:shadow-sky-700/20 hover:shadow-cyan-500">
            <h2 
            className="text-2xl font-semibold mb-2 text-sky-300text-xl font-bold mb-2">{weather.name}</h2>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt={weather.weather[0].description} 
            className="mx-auto w-30 h-30"
            />
            <p 
            className="text-4xl font-bold mb-1 text-sky-100">{Math.round(weather.main.temp)}°C</p>
            <p 
            className="capitalize text-slate-300 mb-3 ">{weather.weather[0].description}</p>
            <div className="flex flex-col justify-center gap-6 text-md text-slate-400 mt-3">
               <p>💧 {weather.main.humidity}% </p>
               <p>🌬️ {weather.wind.speed} km/h</p> 
            </div>    
        </div>
    );
};

export default WeatherCard;