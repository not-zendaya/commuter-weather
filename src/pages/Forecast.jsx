import React, {useState, useEffect} from "react";
const Forecast = () =>{
    const [HomeForecast, setHomeForecast] = useState(null);
    const [SchoolForecast, setSchoolForecast] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const homeCity = "Embakasi";
    const schoolCity = "Nairobi";
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
                console.error("Invalid response:", data.message);
            }
        }catch (error){
            setError("Failed to fetch forecast. Please check your connection.");
            console.error("Error fetching forecast: ", error);
        }
     };

    useEffect(() =>{
        const storedHome =localStorage.getItem("homeCity");
        const storedSchool = localStorage.getItem("schoolCity");

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

    if (loading) return <p className="p-6 text-lg font-medium text-gray-700"> Loading Forecast.... </p>
    if (error)
    return (
      <div className="p-6 text-center bg-red-100 border border-red-300 rounded-lg text-red-700">
        <p className="font-semibold">⚠️ {error}</p>
      </div>
    );
     
const getHour = (dt_txt) => {
    const date = new Date(dt_txt);
    return date.toLocaleDateString("en-US", { hour:"numeric", hour12: true, });
};

    return(
        <div className="p-6 min-h-screen bg-gradient-to-b from-blue-50 to-blue-200">
            <h2 className="text-3xl font-bold text-center mb-6 text-teal-800">5-Day Forecast Comparison</h2>
                    <h3 className="text-xl font-semibold text-center text-blue-700 mb-4">{homeCity.split(",")[0]}</h3>
                    <div className="flex overflow-x-auto gap-4 scroll-smooth scrollbar-thin scrollbar-thumb-blue-400">
                        {HomeForecast?.map((f, index) => (
                            <div key={index} className="bg-blue-200 hover:bg-blue-300 transition transform hover:scale-105 p-5 rounded-2xl min-w-[150px] text-center shadow-lg">
                                <p className="font-bold text-lg text-gray-800 mb-1">{getHour(f.dt_txt)}</p>
                                <img
                                src={`https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`}
                                alt={f.weather[0].description}
                                className="mx-auto"
                                />
                                <p className="font-bold text-2xl text-blue-800">{Math.round(f.main.temp)}°C</p>
                                <p className="text-gray-700">{f.weather[0].main}</p>
                            </div>
                        ))}
                    <h3 className="text-2xl font-semibold text-center text-green-700 mb-4">{schoolCity.split(",")[0]}</h3>
                    <div className="flex overflow-x-auto gap-4 scroll-smooth scrollbar-thin scrollbar-thumb-green-400">
                        {SchoolForecast?.map((f, index) => (
                                <p className="font-bold text-lg text-gray-800 mb-1">{getHour(f.dt_txt)}</p>
                                <img 
                                src={`https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`}
                                alt={f.weather[0].description}
                                className="mx-auto"
                                />
                                <p className="text-2xl font-bold text-green-800">{Math.round(f.main.temp)}°C</p>
                                <p className="text-gray-700">{f.weather[0].main}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-center mt-12">
                <button
                onClick={loadForecast} 
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 mr-6 rounded-xl shadow-lg hover:scale-105 transition transform">
                    Refresh Forecast 
                </button>
            </div>
        </div>
    );
};

export default Forecast;