import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import location from "../assets/location.png";

const Setup = () =>{
    const [step, setStep] = useState(1);
    const [homeCity, setHomeCity] = useState("");
    const [schoolCity, setSchoolCity] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSave = () =>{
        if (!homeCity || !schoolCity){
            setError ("Please enter both Home and School cities.");
            return;
        }

        localStorage.setItem("homeCity", homeCity.trim());
        localStorage.setItem("schoolCity", schoolCity.trim());

        navigate("/");
    };

    return(
        <div 
        className="flex flex-col justify-center items-center min-h-screen w-full 
        bg-gradient-to-br from-sky-700 via-slate-300 to-sky-700 
        dark:bg-gradient-to-br dark:from-sky-950 dark:via-slate-900 dark:to-sky-950 
        text-gray-800/90 dark:text-white px-4 sm:px-8 py-10 text-center">  
            {step === 1 && (
                <div className="max-w-2xl w-full px-4">   
                <img
                src={logo}
                alt="logo"
                className="mx-auto mb-6 w-34 h-34 sm:w-40 sm:h-40 object-contain animate-fade-in rounded-3xl border-2 border-sky-500"
                />
                <h1 
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight md:whitespace-nowrap">Welcome to CommuterWeather</h1>
                <p 
                className="text-base sm:text-lg md:text-xl mb-8 mx-auto max-w-lg leading-relaxed">
                    Get personalized weather updates for your daily routes!
                    Let's Get Started 🚀
                </p>
                <button
                onClick={() => setStep(2)}
                className="bg-white text-slate-800 font-semibold text-lg px-6 py-3 mt-4 rounded-xl hover:bg-cyan-500 transition-transform hover:scale-105 cursor:pointer">
                    Set Locations
                </button>
                </div>
            )}

            {step === 2 && (
                <div 
                className="w-full max-w-md sm:max-w-lg rounded-2xl p-6 shadow-lg bg-slate-500/50 dark:bg-slate-700 backdrop-blur-sm flex flex-col justify-center items-center">
                    <h2 
                    className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold mb-8 font-serif underline">
                    Set Up Your Locations
                    </h2>
                    <div 
                    className="flex flex-col gap-6 w-full">
                    <label className="text-base sm:text-lg text-left font-medium text-gray-100"
                    >Enter your home city</label>
                    <input 
                    type="text" 
                    placeholder="e.g. Nairobi"
                    value={homeCity} 
                    onChange={(e) => setHomeCity(e.target.value)}
                    className="w-full p-3 rounded-md text-slate-200 border-2 border-gray-900 bg-slate-600 dark:bg-slate-800/70 focus:bg-slate-800 dark:focus:bg-slate-900 outline-none focus:ring-2 focus:ring-sky-600 dark:focus:ring-sky-500 transition"
                    />
                    <label className="text-base sm:text-lg text-left font-medium text-gray-100">Enter your school city </label>
                    <input
                    type="text"
                    placeholder="e.g. Embakasi"
                    value={schoolCity}
                    onChange={(e) => setSchoolCity(e.target.value)}
                    className="w-auto p-2 rounded-md text-slate-200 border-2 border-gray-900 bg-slate-600 dark:bg-slate-800/70 focus:bg-slate-800 dark:focus:bg-slate-900 outline-none focus:ring-2 focus:ring-sky-600 dark:focus:ring-sky-500 transition"
                    />
                    </div>
                    {error && (
                        <p 
                        className="text-red-400 text-sm mt-2">{error}
                        </p>
                    )}
                    <button
                    onClick={handleSave}
                    className="w-full py-3 rounded-lg bg-blue-500 text-white bg-sky-700 dark:bg-sky-600 hover:bg-sky-600 dark:hover:bg-sky-700 transition-transform hover:scale-105 medium mt-4">
                         Save Locations
                    </button>
                    <div className="flex justify-center mt-6">
                    <img
                    src={location}
                    alt="location-pin"
                    className="w-14 h-14 sm:w-16 sm:h-16 animate-bounce dark:opacity-90 dark:hover:opacity-100 transition"
                    />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Setup;
