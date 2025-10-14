import React from "react";

const About = () => {
    return(
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-blue-400 text-gray-600 p-6 text-center">
            <h1 className="text-3xl text-center text-blue-700 font-bold mb-4">About CommuterWeather</h1>
            <p className="max-w-xl text-lg mb-6">
                CommuterWeather helps users plan their daily travel by comparing the weather 
                between two important locations, typically your <strong>home</strong> and<strong> school</strong>. 
                With hourly forecasts and smart recommendations, you can prepare better for your day.
            </p>
            <p className="text-sm text-center italic text-gray-700">
                Built with ❤️ using React and OpenWeather API.
            </p>
        </div>
    );
};

export default About;