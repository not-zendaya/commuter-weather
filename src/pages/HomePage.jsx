import { useState, useEffect } from "react";
import WeatherCard from "../components/WeatherCard";
import Recommendations from "../components/Recommendations";

const Home = () =>{
    const [homeCity, setHomeCity] = useState("Upper Hill");
    const [schoolCity, setSchoolCity] = useState("Embakasi");
    const [homeWeather, setHomeWeather] = useState(null);
    const [schoolWeather, setSchoolWeather] = useState(null);
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

        fetchWeather(homeCity, setHomeWeather);
        fetchWeather(schoolCity, setSchoolWeather);
    }, [homeCity, schoolCity, apiKey]);

    return(
        <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-500 dark:from-gray-900 dark:to-gray-700 flex flex-col items-center justify-center py-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-white text-center">
                🌤️ Commuter Weather Dashboard
            </h1>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <WeatherCard city={homeCity} />
                <WeatherCard city={schoolCity} />
            </div>
            <Recommendations homeWeather={homeWeather} schoolWeather={schoolWeather} />
        </div>
    );
};

export default Home;