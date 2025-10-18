import React from "react";
import {Link } from "react-router-dom"
import logo from "../assets/logo.png";

const About = () => {
    return(
        <div 
        className="min-h-screen w-full flex flex-col justify-center items-center 
        bg-gradient-to-br from-sky-800 via-slate-400/50 to-sky-900 
        dark:from-gray-900 dark:via-slate-800 dark:to-gray-900
        text-white dark:text-gray-100 px-6 py-10 text-center">
            <div className="flex flex-col items-center">
                <img
                src={logo}
                alt="logo"
                className="w-16 h-16 md:w-20 md:h-20 mb-4 object-contain animate-fade-in rounded-full border-2 border-sky-600 shadow-lg"
                />
                <h1 
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-teal-900 dark:text-sky-400">
                    About CommuterWeather
                </h1>
            </div>
           
            <p 
            className="max-w-2xl text-base sm:text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300 tracking-wide">
                <span className="font-semibold text-cyan-600 dark:text-sky-400 ">CommuterWeather </span> helps users plan their daily travel by comparing the weather 
                between two important locations, typically your <strong>home</strong> and<strong> school</strong>. 
                With hourly forecasts and smart recommendations, you can prepare better for your day.
            </p>
            <p 
            className="text-xs sm:text-sm italic text-gray-700 dark:text-gray-500">
                Built with ❤️ using React and OpenWeather API.
            </p>
            <div className="mt-8">
                <Link
                to="/home"
                className="bg-sky-600 hover:bg-sky-500 dark:bg-sky-700 dark:hover:bg-sky-600 
                text-white font-medium px-6 py-2 sm:px-8 sm:py-3 rounded-xl shadow-md transition-transform hover:scale-105"
                >
                    Back to Home
                </Link>
            </div>   
        </div>
    );
};

export default About;