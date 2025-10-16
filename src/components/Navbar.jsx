import React, {useEffect, useState} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {Sun , Moon, RefreshCw, Settings, Thermometer} from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () =>{
    const [darkMode, setDarkMode] = useState(false);
    const[unit, setUnit] = useState("metric");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect (() => {
        const savedTheme = localStorage.getItem("theme");
        const savedUnit = localStorage.getItem("unit");

        if (savedTheme === "dark") setDarkMode(true);
        if (savedUnit) setUnit(savedUnit);

        document.documentElement.classList.toggle("dark", savedTheme === "dark");

    }, []);

    const toggleTheme = () =>{
        const newMode = !darkMode;
        setDarkMode(newMode);
        document.documentElement.classList.toggle("dark", newMode);
        localStorage.setItem("theme", newMode? "dark" : "light");
    };

    const toggleUnit = () => {
        const newUnit = unit === "metric" ? "imperial" : "metric";
        setUnit(newUnit);
        localStorage.setItem("unit", newUnit);
        window.location.reload();
    };

    const handleRefresh = () => window.location.reload();

    return(
        <nav 
        className="flex items-center justify-between p-4 md:px-8 shadow-md 
        bg-gradient-to-br from-slate-100 via-blue-100 to-slate-200 text-gray-900
        dark:from-sky-950 dark:via-slate-900 dark:to-sky-950 dark:text-white 
        transition-all">
            <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
            >
                <img
                src={logo}
                alt="logo"
                className="w-8 h-8 object-contain animate-fade-in object-cover rounded-full border-2 border-sky-600 shadow-lg"
                />
                <h1
                className="txt-xl font-bold tracking-wide">
                    CommuterWeather
                </h1>
            </div>
            <div 
            className="hidden md:flex gap-6 text-md font-medium">
                <Link 
                to="/" 
                className ={`hover:text-teal-700 dark:hover:text-yellow-200 $ {
                    location.pathname === "/" ? "underline" : ""
                    }`}
                >Home 
                </Link>
                <Link 
                to="/forecast" 
                className={`hover:text-teal-700 dark:hover:text-yellow-200 ${
                    location.pathname === "/forecast" ? "underline" : ""
                }`}
                > Forecast ⛅ 
                </Link>
                <Link 
                to="/about" 
                className={`hover:text-teal-700 dark:hover:text-yellow-200 ${
                    location.pathname === "/about" ? "underline" : ""
                }`}
                > About 
                </Link>
            </div>
            <div 
            className="flex items-center gap-4">
                <button
                onClick={toggleTheme}
                title="Toggle Theme"
                className="hover:text-teal-500 dark:hover:text-yellow-300 transition"
                >
                    {darkMode ? <Moon size={22} /> : <Sun size={22} />}
                </button>

                <button
                onClick={toggleUnit}
                title="Switch °C / °F"
                className="hover:text-teal-500 dark:hover:text-yellow-300 transition flex items-center"
                >
                    <Thermometer size={22} />
                    <span
                    className="ml-1 text-sm">
                        {unit === "metric" ? "°C" : "°F" }
                    </span>
                </button>

                <button 
                onClick={handleRefresh}
                title="Refresh weather"
                className="hover:text-teal-500 dark:hover:text-yellow-300 transition"
                >
                    <RefreshCw size={22} />
                </button>

                <button
                onClick={() => navigate("/setup")}
                title="Settings"
                className="hover:text-teal-500 dark:hover:text-yellow-300 transition"
                >
                    <Settings size={22} />
                </button>
        </div>
    </nav>
    );
};

export default Navbar;