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
            <div 
            onClick={() => navigate("/")}
            >
                <img
                src={logo}
                alt="logo"
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
                    location.pathname === "/" ? "underline" : ""
                    }`}
                >Home 
                </Link>
                <Link 
                to="/forecast" 
                    location.pathname === "/forecast" ? "underline" : ""
                }`}
                > Forecast ⛅ 
                </Link>
                <Link 
                to="/about" 
                    location.pathname === "/about" ? "underline" : ""
                }`}
                > About 
                </Link>
            </div>
            <div 
                <button
                onClick={toggleTheme}
                title="Toggle Theme"
                >
                    {darkMode ? <Moon size={22} /> : <Sun size={22} />}
                </button>

                <button
                onClick={toggleUnit}
                title="Switch °C / °F"
                >
                    <Thermometer size={22} />
                    <span
                        {unit === "metric" ? "°C" : "°F" }
                    </span>
                </button>

                <button 
                onClick={handleRefresh}
                title="Refresh weather"
                >
                    <RefreshCw size={22} />
                </button>

                <button
                onClick={() => navigate("/setup")}
                title="Settings"
                >
                    <Settings size={22} />
                </button>
        </div>
    </nav>
    );
};

export default Navbar;