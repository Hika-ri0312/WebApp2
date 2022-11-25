import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import { Home } from "./Home";

const Login = () => {
    return (
        <div>
            
                
            <Link to="/">Home</Link>
            <br />

            <Link to="/calendar">Calendar</Link>


        
        </div>
    );
};
export default Login
