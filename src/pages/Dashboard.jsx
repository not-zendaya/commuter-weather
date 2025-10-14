import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

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
            {step === 1 && (
                <div>
                <img
                src={logo}
                alt="logo"
                />
                <h1 
                <p 
                    Get personalized weather updates for your daily routes!
                    Let's Get Started 🚀
                </p>
                <button
                onClick={() => setStep(2)}
                    Set Locations
                </button>
                </div>
            )}

        </div>
    );
};

export default Setup;
