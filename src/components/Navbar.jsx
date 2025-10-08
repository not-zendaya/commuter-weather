import React from "react";
import { Link } from "react-router-dom";

const Navbar = () =>{
    return(
            <Link to="/" className ="hover:underline">Home </Link>
            <Link to="/forecast" className="hover:underline"> Forecast ⛅ </Link>
            <Link to="/search" className="hover:underline"> 🔍Search🔎</Link>
        </div>
    );
};

export default Navbar;