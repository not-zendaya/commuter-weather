import { useState, useEffect } from "react";
import WeatherCard from "../components/WeatherCard";
import Recommendations from "../components/Recommendations";

const Home = () =>{
    const [homeCity, setHomeCity] = useState(localStorage.getItem("homeCity") || "");
    const [schoolCity, setSchoolCity] = useState(localStorage.getItem("schoolCity") || "");
    const [homeWeather, setHomeWeather] = useState(null);
    const [schoolWeather, setSchoolWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    useEffect(() =>{
        const fetchWeather = async (city, setWeather) =>{
            try{
                const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
                const data = await response.json();
                setWeather(data);
            } catch(err){
                console.error("Error fetching weather:" , err);
            }
        };

        const loadWeather = async () =>{
            setLoading(true);
            await fetchWeather(homeCity, setHomeWeather);
            await fetchWeather(schoolCity, setSchoolWeather);
            setLoading(false);
        }
        loadWeather();    
    }, [homeCity, schoolCity, apiKey]);

    if(loading)
        return(
    <div 
    className="flex items-center justify-center bg-gradient-to-br from-sky-950 via-slate-900 to-sky-950 text-white"
    >
        <p 
        className="text-xl font-semibold animate-pulse"
        >
            Loading weather data...
        </p>
      </div>
    );

    return(  
        <div 
        className="h-screen w-screen bg-gradient-to-br from-sky-900 via-slate-800 to-sky-950 flex flex-col items-center justify-between py-6 px-4 text-white overflow-hidden"
        >
            <h1 
            className="text-3xl md:text-4xl mb-8 text-white text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-400 "
            > 
                🌤️ Commuter Weather Dashboard
            </h1>
            <div 
            className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full max-w-5xl"
            >
                <div 
                className="flex-1 text-slate-900 "
                >
                    <WeatherCard city={homeCity} />
                </div>
                <div 
                className="flex-1 text-slate-900 "
                >
                    <WeatherCard city={schoolCity} />
                </div> 
            </div>
            <div 
            className="mt-4 w-full flex justify-center px-4 "
            >
                <Recommendations homeWeather={homeWeather} schoolWeather={schoolWeather} />
            </div>  
        </div>
    );
};

export default Home;