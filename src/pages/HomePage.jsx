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

    return(
        <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-500 dark:from-gray-900 dark:to-gray-700 flex flex-col items-center justify-center py-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-white text-center">
    if(loading)
        return(
    <div 
    >
        <p 
        >
            Loading weather data...
        </p>
      </div>
    );

    return(  
        <div 
        >
            <h1 
            > 
                🌤️ Commuter Weather Dashboard
            </h1>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <WeatherCard city={homeCity} />
                <WeatherCard city={schoolCity} />
            <div 
            >
                <div 
                >
                    <WeatherCard city={homeCity} />
                </div>
                <div 
                >
                    <WeatherCard city={schoolCity} />
                </div> 
            </div>
            <Recommendations homeWeather={homeWeather} schoolWeather={schoolWeather} />
            <div 
            >
                <Recommendations homeWeather={homeWeather} schoolWeather={schoolWeather} />
            </div>  
        </div>
    );
};

export default Home;