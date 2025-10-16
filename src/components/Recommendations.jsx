import React from "react";

const getRecommendation =(weather1, weather2) =>{
    const conditions = [weather1, weather2].map((w) => w?.weather[0]?.main || "");
    const descriptions = [weather1, weather2].map((w) => w?.weather?.[0]?.description?.toLowerCase() || "");

    if (conditions.includes("Thunderstorm")) return "⛈️ Thunderstorms expected.Avoid biking or walking!";
    if(conditions.includes("Rain") || descriptions.some((d) => d.includes("drizzle"))) 
        return "☔ Take an umbrella!";
    if(conditions.includes("Clear")) return "🕶️ It is sunny, wear sunglasses!";
    if(conditions.includes("Clouds")) return "☁️ Might be cloudy. Plan accordingly.";
    if (descriptions.some((d) => d.includes("fog") || d.includes("mist") || d.includes("haze")))
        return "🌫️ Low visibility — drive slowly!";
    if(conditions.includes("Snow")) return "❄️ Wear a warm jacket and drive carefully!";

    return "👍Looks good. Have a great day!";
};

const Recommendations =({ homeWeather, schoolWeather}) =>{
    if(!homeWeather || !schoolWeather) return null;

    const message = getRecommendation(homeWeather, schoolWeather);

    return(
        <div className="mt-4 bg-yellow-100 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 px-4 py-3 rounded-xl shadow-sm">
            <p className="text-center font-medium">{message}</p>
        </div>
    );
};

export default Recommendations;
   
 