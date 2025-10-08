import React from "react";
import { Link } from "react-router-dom";

const Navbar = () =>{
    return(
        <div className="flex justify-around bg-blue-500 text-white p-3">
            <Link to="/" className ="hover:underline">Home </Link>
            <Link to="/forecast" className="hover:underline"> Forecast ⛅ </Link>
            <Link to="/search" className="hover:underline"> 🔍Search🔎</Link>
        </div>
    );
};

export default Navbar;