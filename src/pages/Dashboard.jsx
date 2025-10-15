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
        className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-sky-950 via-slate-900 to-sky-950 text-white p-6 text-center">
            {step === 1 && (
                <div>
                <img
                src={logo}
                alt="logo"
                className="mx-auto mb-6 w-55 h-55 object-contain animate-fade-in rounded-3xl"
                />
                <h1 
                className="text-5xl font-bold mb-8">Welcome to CommuterWeather</h1>
                <p 
                className="text-[18px]/9 mb-8 mx-auto max-w-md">
                    Get personalized weather updates for your daily routes!
                    Let's Get Started 🚀
                </p>
                <button
                onClick={() => setStep(2)}
                className="bg-white text-slate-800 font-semibold text-lg px-6 py-3 mt-4 rounded-xl hover:bg-cyan-500 transition cursor:pointer">
                    Set Locations
                </button>
                </div>
            )}

            {step === 2 && (
                <div 
                className="max-w-xl rounded-2xl p-6 shadow-lg w-full max-w-md bg-slate-700 backdrop-blur-sm min-h-[65vh] flex flex-col justify center">
                    <h2 
                    className="text-3xl text-center font-semibold mb-8 sm:text-4xl mb-8 font-serif underline">
                    Set Up Your Locations
                    </h2>
                    <div 
                    className="flex flex-col gap-6 md:max-w-lg max-w-sm mb-8 ">
                    <label className="text-lg text-left font-medium text-gray-100"
                    >Enter your home city</label>
                    <input 
                    type="text" 
                    placeholder="e.g. Nairobi"
                    value={homeCity} 
                    onChange={(e) => setHomeCity(e.target.value)}
                    className="w-auto p-2 rounded-md text border-2 border-gray-900 bg-slate-800/70 focus:bg-slate-900 outline-none focus:ring-2 focus:ring-sky-500 transition"
                    />
                    <label className="text-lg text-left font-medium text-gray-100">Enter your school city </label>
                    <input
                    type="text"
                    placeholder="e.g. Embakasi"
                    value={schoolCity}
                    onChange={(e) => setSchoolCity(e.target.value)}
                    className="w-auto p-2 rounded-md text border-2 border-gray-900 bg-slate-800/70 focus:bg-slate-900 outline-none focus:ring-2 focus:ring-sky-500 transition"
                    />
                    </div>
                    <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white w-full py-3 rounded-lg bg-sky-600 hover:bg-sky-700 transition font-medium mt-4">
                         Save Locations
                    </button>
                    <div className=" flex justify-center">
                    <img
                    src={location}
                    alt="location-pin"
                    className="mt-6 w-16 h-16 md:w-16 md:h-16 animate-bounce opacity-90 hover:opacity-100 transition "
                    />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Setup;
