import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";
import Recommendations from "../components/Recommendations";

const Home = () =>{
    const [homeCity, setHomeCity] = useState(localStorage.getItem("homeCity") || "");
    const [schoolCity, setSchoolCity] = useState(localStorage.getItem("schoolCity") || "");
    const [homeWeather, setHomeWeather] = useState(null);
    const [schoolWeather, setSchoolWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [homeError, setHomeError] = useState(null);
    const [schoolError, setSchoolError] = useState(null);

    const navigate = useNavigate();
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    useEffect(() =>{
        const fetchWeather = async (city, setWeather, setError) =>{
            try{
                const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
                const data = await response.json();
                if(response.ok){
                    setWeather(data);
                    setError(null);
                }else{
                    setWeather(null);
                    setError(data.message || "City not found");
                }
                
            } catch(err){
                console.error("Error fetching weather:" , err);
                setError("Network Error - please try again");
            }
        };

        const loadWeather = async () =>{
            setLoading(true);
            await fetchWeather(homeCity, setHomeWeather, setHomeError);
            await fetchWeather(schoolCity, setSchoolWeather, setSchoolError);
            setLoading(false);
        }
        loadWeather();    
    }, [homeCity, schoolCity, apiKey]);

    if(loading)
        return(
    <div 
    className="flex items-center h-screen w-full justify-center bg-gradient-to-br from-sky-700 via-slate-300/50 to-sky-700 dark:bg-gradient-to-br dark:from-sky-950 dark:via-slate-900 dark:to-sky-950 text-gray-900 dark:text-white"
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
        className="h-screen w-screen bg-gradient-to-br from-sky-700 via-slate-300/50 to-sky-700 dark:from-sky-900 dark:via-slate-800 dark:to-sky-950 flex flex-col items-center justify-between py-6 px-4 text-white overflow-hidden"
        >
            <h1 
            className="text-3xl md:text-4xl mb-8  font-extrabold "
            > 
                🌤️ <span className=" text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-950 to-cyan-950 dark:text-white ">
                    Commuter Weather Dashboard
                    </span>
            </h1>
            <div 
            className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full max-w-5xl"
            >
                {homeError ? (
                    <div 
                    className="flex-1 rounded-2xl shadow-xl p-6 text-center font-semibold flex flex-col items-center justify-center bg-gradient-to-br from-sky-600 via-sky-700 to-teal-600 dark:from-sky-800 dark:via-sky-900 dark:to-teal-800 border border-sky-500/40 text-white">
                        ❗ {homeError}
                        <div>
                            <button
                            onClick={() => navigate("/setup")}
                            className="mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 via-sky-500 to-teal-500 hover:from-cyan-600 hover:via-sky-600 hover:to-teal-600 text-white font-medium rounded-lg shadow-md transition-transform hover:scale-105"
                            >
                                Retry & Update City
                            </button>
                        </div>
                    </div>
                ) : (
                    <div 
                    className="flex-1 text-slate-900">
                    <WeatherCard city={homeCity} />
                    </div>
                )}

                {schoolError ? (
                    <div 
                    className="flex-1 rounded-2xl shadow-xl p-6 text-center font-semibold flex flex-col items-center justify-center bg-gradient-to-br from-sky-600 via-sky-700 to-teal-600 dark:from-sky-800 dark:via-sky-900 dark:to-teal-800 border border-sky-500/40 text-white">
                        ❗ {schoolError}
                        <div>
                            <button
                            onClick={() => navigate("/setup")}
                            className="mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 via-sky-500 to-teal-500 hover:from-cyan-600 hover:via-sky-600 hover:to-teal-600 text-white font-medium rounded-lg shadow-md transition-transform hover:scale-105"
                            >
                                Retry & Update City
                            </button>
                        </div>
                    </div>
                ) : (
                   <div 
                   className="flex-1 text-slate-900">
                    <WeatherCard city={schoolCity} />
                    </div> 
                )}    
            </div>
            <div 
            className="mt-4 w-full flex justify-center px-4 "
            >
                {!homeError && !schoolError && (
                    <Recommendations homeWeather={homeWeather} schoolWeather={schoolWeather} />
                )}  
            </div>  
        </div>
    );
};

export default Home;