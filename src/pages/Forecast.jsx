import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useUnit } from "../context/UnitContext";


const Forecast = () =>{
    const [HomeForecast, setHomeForecast] = useState(null);
    const [SchoolForecast, setSchoolForecast] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const { unit } = useUnit();

    const homeCity = localStorage.getItem("homeCity");
    const schoolCity = localStorage.getItem("schoolCity");
    const fetchForecast = async (city, setForecast, keyName) =>{
        try{
            const response = await fetch (`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`);
            const data = await response.json ();
            if (data.cod === "200"){
                const sliced =data.list.slice(0,5);
                setForecast(sliced);
                localStorage.setItem(keyName, JSON.stringify(sliced));
            }else {
                setError(`City "${city}" not found.`);
            }
        }catch (error){
            setError("Failed to fetch forecast. Please check your connection.");
        }
     };

    useEffect(() =>{
        const storedHome =localStorage.getItem("HomeForecast");
        const storedSchool = localStorage.getItem("SchoolForecast");

        if(storedHome && storedSchool){
            setHomeForecast(JSON.parse(storedHome));
            setSchoolForecast(JSON.parse(storedSchool));
            setLoading(false);
        }else{
            loadForecast();
        }
    }, [unit]);

    const loadForecast = async () =>{
        setLoading(true);
        await fetchForecast(homeCity, setHomeForecast, "HomeForecast");
        await fetchForecast(schoolCity, setSchoolForecast, "SchoolForecast");
        setLoading(false);
    };

    if (loading) 
        return(
        <div 
        className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-sky-700 via-slate-300/50 to-sky-700 dark:bg-gradient-to-br dark:from-sky-950 dark:via-slate-900 dark:to-sky-950 text-gray-900 dark:text-white">  
            <p 
            className="text-xl font-semibold animate-pulse"> Loading Forecast.... </p>
        </div>
    );
    
    if (error)
    return (
      <div 
      className="flex items-center justify-center h-screen bg-gradient-to-br from-sky-700 via-slate-300/50 to-sky-700 dark:bg-gradient-to-br dark:from-sky-950 dark:via-slate-900 dark:to-sky-950 text-gray-900 dark:text-white">
        <p 
        className="bg-red-500/20 border border-red-400 px-6 py-3 rounded-xl mt-1 text-base sm:text-lg">⚠️ {error}</p>
      </div>
    );

const temperatureUnit = unit === "metric" ? "°C" : "°F";
     
const getHour = (dt_txt) => {
    const date = new Date(dt_txt);
    return date.toLocaleDateString("en-US", { hour:"numeric", hour12: true, });
};

    return(
        <div 
        className="w-full h-screen p-6 sm:px-6 py-6 flex flex-col justify-between items-center 
        bg-gradient-to-br from-sky-700 via-slate-400/50 to-sky-700 
        dark:bg-gradient-to-br dark:from-sky-950 dark:via-slate-900 dark:to-sky-950 text-gray-900 dark:text-white">
            <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mt-4 mb-6 dark:text-sky-200 text-sky-800">
                5-Day Forecast Comparison</h2>
            <div
            className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-8 w-full mx-auto max-w-5xl px-4">  
                <div 
                className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto
                border border-slate-700/50 rounded-2xl p-5 sm:p-6 shadow-xl bg-slate-700/50 backdrop-blur-lg">
                    <h3 
                    className="text-lg sm:text-xl font-semibold text-center text-sky-300 mb-4">
                        {homeCity.split(",")[0]}</h3>
                    <div 
                    className="flex overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-sky-400/40 gap-4 pb-2">
                        {HomeForecast?.map((f, index) => (
                            <div key={index}    
                            className="bg-slate-700/60 border border-slate-600 rounded-2xl p-4 min-w-[140px] sm:min-w-[150px] 
                            transition transform hover:scale-105 text-center shadow-lg">
                                <p 
                                className="font-medium text-sky-200 mb-1 text-sm sm:text-base">{getHour(f.dt_txt)}</p>
                                <img
                                src={`https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`}
                                alt={f.weather[0].description}
                                className="mx-auto w-16 h-16 sm:w-20 sm:h-20"
                                />
                                <p 
                                className="font-bold text-xl sm:text-2xl text-white">{Math.round(f.main.temp)}{temperatureUnit}</p>
                                <p 
                                className="capitalize text-sky-300 text-xs sm:text-sm">{f.weather[0].main}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto
                border border-slate-700/50 rounded-2xl p-5 sm:p-6 shadow-xl bg-slate-700/50 backdrop-blur-lg ">
                    <h3 
                    className="text-lg sm:text-xl font-semibold text-center text-emerald-300 mb-4">
                        {schoolCity.split(",")[0]}</h3>
                    <div 
                    className="flex overflow-x-auto gap-4 scroll-smooth scrollbar-thin scrollbar-thumb-emerald-400/40 pb-2">
                        {SchoolForecast?.map((f, index) => (
                            <div key={index}  
                            className="bg-slate-700/50 border border-slate-600 rounded-2xl p-4  transition-transform duration-200 hover:scale-105  min-w-[140px] sm:min-w[150px] text-center shadow-lg">
                                <p 
                                className="font-medium text-emerald-200 mb-1 text-sm sm:text-base">
                                    {getHour(f.dt_txt)}</p>
                                <img 
                                src={`https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`}
                                alt={f.weather[0].description}
                                className="mx-auto w-16 sm:w-20 h-16 sm:h-20"
                                />
                                <p 
                                className="text-xl sm:text-2xl font-bold text-white">{Math.round(f.main.temp)}{temperatureUnit}</p>
                                <p 
                                className="capitalize text-emerald-300 text-xs sm:text-sm">{f.weather[0].main}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div 
            className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8">
                <button
                onClick={loadForecast}
                className=" bg-slate-700 hover:bg-slate-600 font-medium text-white px-5 sm:px-6 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform">
                    Refresh Forecast 
                </button>
                <Link to="/home"  
                className="bg-sky-600 hover:bg-sky-500 text-white font-medium px-5 sm:px-6 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform">
                    Back to Home</Link>
            </div>
        </div>
    );
};

export default Forecast;