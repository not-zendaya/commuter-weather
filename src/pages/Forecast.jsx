import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";


const Forecast = () =>{
    const [HomeForecast, setHomeForecast] = useState(null);
    const [SchoolForecast, setSchoolForecast] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const homeCity = localStorage.getItem("homeCity");
    const schoolCity = localStorage.getItem("schoolCity");
    const fetchForecast = async (city, setForecast, keyName) =>{
        try{
            const response = await fetch (`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
            const data = await response.json ();
            if (data.cod === "200"){
                const sliced =data.list.slice(0,4);
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
    }, []);

    const loadForecast = async () =>{
        setLoading(true);
        await fetchForecast(homeCity, setHomeForecast, "HomeForecast");
        await fetchForecast(schoolCity, setSchoolForecast, "SchoolForecast");
        setLoading(false);
    };

    if (loading) 
        return(
        <div 
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-950 via-slate-900 to-sky-950 text-white">  
            <p 
            className="text-xl font-semibold animate-pulse"> Loading Forecast.... </p>
        </div>
    );
    
    if (error)
    return (
      <div 
      className="flex items-center justify-center h-screen bg-gradient-to-br from-sky-950 via-slate-900 to-sky-950 text-white">
        <p 
        className="bg-red-500/20 border border-red-400 px-6 py-3 rounded-xl">⚠️ {error}</p>
      </div>
    );
     
const getHour = (dt_txt) => {
    const date = new Date(dt_txt);
    return date.toLocaleDateString("en-US", { hour:"numeric", hour12: true, });
};

    return(
        <div 
        className="w-full p-6 flex flex-col justify-between items-center text-white bg-gradient-to-br from-sky-950 via-slate-900 to-sky-950">
            <h2 
            className="text-5xl font-bold text-center mt-4 text-sky-200">
                5-Day Forecast Comparison</h2>
            <div
            className="flex flex-col md:flex-row justify-center items-center gap-8 w-full">  
                <div 
                className="border border-slate-700/50 rounded-2xl p-6 shadow-xl bg-slate-700/50 backdrop-blur-lg">
                    <h3 
                    className="text-xl font-semibold text-center text-sky-300 mb-4">
                        {homeCity.split(",")[0]}</h3>
                    <div 
                    className="flex scroll-smooth scrollbar-none gap-4 pb-2 max-w-full">
                        {HomeForecast?.map((f, index) => (
                            <div key={index}    
                            className="bg-slate-700/60 border border-slate-600 rounded-2xl p-4 transition transform hover:scale-105 min-w-[140px] text-center shadow-lg">
                                <p 
                                className="font-medium text-sky-200 mb-1">{getHour(f.dt_txt)}</p>
                                <img
                                src={`https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`}
                                alt={f.weather[0].description}
                                className="mx-auto"
                                />
                                <p 
                                className="font-bold text-2xl text-white">{Math.round(f.main.temp)}</p>
                                <p 
                                className="capitalize text-sky-300 text-sm">{f.weather[0].main}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                className="border border-slate-700/50 rounded-2xl p-6 shadow-xl bg-slate-700/50 backdrop-blur-lg ">
                    <h3 
                    className="text-xl font-semibold text-center text-emerald-300 mb-4">
                        {schoolCity.split(",")[0]}</h3>
                    <div 
                    className="flex gap-4 scroll-smooth scrollbar-none pb-2 max-w-full">
                        {SchoolForecast?.map((f, index) => (
                            <div key={index}  
                            className="bg-slate-700/50 border border-slate-600 transition-transform duration-200 hover:scale-105 p-4 rounded-2xl min-w-[140px] text-center shadow-lg">
                                <p 
                                className="font-medium text-emerald-200 mb-1">
                                    {getHour(f.dt_txt)}</p>
                                <img 
                                src={`https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`}
                                alt={f.weather[0].description}
                                className="mx-auto"
                                />
                                <p 
                                className="text-2xl font-bold text-white">{Math.round(f.main.temp)}°C</p>
                                <p 
                                className="capitalize text-emerald-300 text-sm">{f.weather[0].main}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div 
            className="flex flex-wrap justify-center gap-6 ">
                <button
                onClick={loadForecast}
                className=" bg-slate-700 hover:bg-slate-600 font-medium text-white px-6 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform">
                    Refresh Forecast 
                </button>
                <Link to="/"  
                className="bg-sky-600 hover:bg-sky-500 text-white font-medium px-6 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform">
                    Back to Home</Link>
            </div>
        </div>
    );
};

export default Forecast;