import React from "react";
import {Link } from "react-router-dom"
import logo from "../assets/logo.png";

const About = () => {
    return(
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-blue-400 text-gray-600 p-6 text-center">
            <h1 className="text-3xl text-center text-blue-700 font-bold mb-4">About CommuterWeather</h1>
            <p className="max-w-xl text-lg mb-6">
                CommuterWeather helps users plan their daily travel by comparing the weather 
                <img
                src={logo}
                alt="logo"
                />
                between two important locations, typically your <strong>home</strong> and<strong> school</strong>. 
                With hourly forecasts and smart recommendations, you can prepare better for your day.
            </p>
            <p 
            className="text-sm italic text-gray-400 dark:text-gray-500">
                Built with ❤️ using React and OpenWeather API.
            </p>
            <div className="mt-6">
                <Link
                to="/"
                className="bg-sky-600 hover:bg-sky-500 dark:bg-sky-700 dark:hover:bg-sky-600 
                text-white font-medium px-6 py-2 rounded-xl shadow-md transition-transform hover:scale-105"
                >
                    Back to Home
                </Link>
            </div>   
        </div>
    );
};

export default About;