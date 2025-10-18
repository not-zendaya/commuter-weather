import React, {useEffect, useState} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {Sun , Moon, RefreshCw, Settings, Thermometer, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { useUnit } from "../context/UnitContext";

const Navbar = () =>{
    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { unit, toggleUnit } = useUnit();

    useEffect (() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") setDarkMode(true);
        document.documentElement.classList.toggle("dark", savedTheme === "dark");

    }, []);

    const toggleTheme = () =>{
        const newMode = !darkMode;
        setDarkMode(newMode);
        document.documentElement.classList.toggle("dark", newMode);
        localStorage.setItem("theme", newMode? "dark" : "light");
    };

    const handleRefresh = () => window.location.reload();

    return(
        <nav 
        className="relative flex items-center justify-between p-4 sm:px-6 md:px-8 py-3 shadow-md w-full z-50 backdrop-blur-md
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
                className="w-9 h-9 object-contain animate-fade-in object-cover rounded-full border-2 border-sky-600 shadow-md"
                />
                <h1
                className="text-lg sm:text-xl font-bold tracking-wide">
                    CommuterWeather
                </h1>
            </div>
            <div 
            className="hidden md:flex gap-6 text-base font-medium">
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
            className="hidden md:flex items-center gap-4">
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
            <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden items-center justify-center hover:text-teal-600 dark:hover:text-yellow-300 transition">
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            {menuOpen && (
                <div 
                className="absolute top-full left-0 w-full z-40 bg-gradient-to-br from-slate-100 via-blue-100 to-slate-200 
                dark:from-sky-950 dark:via-slate-900 dark:to-sky-950 
                text-gray-900 dark:text-white flex flex-col items-center gap-5 py-6 
                font-medium text-base shadow-lg md:hidden transition-all"
                >
                    <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className={`hover:text-teal-700 dark:hover:text-yellow-200 ${
                        location.pathname === "/" ? "underline" : ""
                    }`}
                    >
                        Home
                    </Link>
                    <Link 
                    to="/forecast"
                    onClick={() => setMenuOpen(false)}
                    className={`hover:text-teal-700 dark:hover:text-yellow-200 ${
                        location.pathname === "/forecast" ? "underline" : ""
                    }`}
                    >
                        Forecast ⛅
                    </Link>
                    <Link
                    to="/about"
                    onClick={() => setMenuOpen(false)}
                    className={`hover:text-teal-700 dark:hover:text-yellow-200 ${
                        location.pathname === "/about" ? "underline" : ""
                    }`}    
                    >
                        About 
                    </Link>
                    <div className="flex items-center gap-6 mt-4">
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
                            <span className="ml-1 text-sm">{unit === "metric" ? "°C" : "°F"}</span>
                        </button>
                        <button
                        onClick={handleRefresh}
                        title="Refresh"
                        className="hover:text-teal-500 dark:hover:text-yellow-300 transition"
                        >
                            <RefreshCw size={22} />
                        </button>
                        <button
                        onClick={() => {
                            setMenuOpen(false);
                            navigate("/setup");
                        }}
                        title="Settings"
                        className="hover:text-teal-500 dark:hover:text-yellow-300 transition"
                        >
                            <Settings size={22} />
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;